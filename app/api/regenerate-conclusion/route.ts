import { NextResponse } from "next/server";

export const maxDuration = 60;

function extractJsonObject(text: string | null | undefined): { items?: unknown[] } | null {
  if (!text || typeof text !== "string") return null;
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fence ? fence[1].trim() : trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1)) as { items?: unknown[] };
  } catch {
    return null;
  }
}

const SECTION_TITLES: Record<string, string> = {
  "current-asset": "Current asset / adjusted working capital",
  "fixed-asset": "Fixed asset / CAPEX and efficiency",
  "sales-profitability": "Sales and profitability",
  solvency: "Solvency and financial risk",
};

export async function POST(request: Request) {
  const regenEnabled =
    process.env.ENABLE_CONCLUSION_REGEN === "true" || process.env.ENABLE_CONCLUSION_REGEN === "1";
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!regenEnabled || !apiKey) {
    return NextResponse.json({ error: "Subscription only", code: "subscription_only" }, { status: 403 });
  }

  let body: { context?: string; sourceText?: string };
  try {
    body = (await request.json()) as { context?: string; sourceText?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { context, sourceText } = body;
  if (!context || typeof sourceText !== "string") {
    return NextResponse.json(
      { error: "Expected JSON: { context: string, sourceText: string }" },
      { status: 400 }
    );
  }

  const sectionTitle = SECTION_TITLES[context] || context;
  const clipped = sourceText.length > 14000 ? sourceText.slice(0, 14000) + "\n…" : sourceText;

  const system =
    "You are a senior credit analyst drafting committee draft conclusions. Use clear, professional English. Output JSON only — no markdown fences, no commentary.";

  const user = `Regenerate the "${sectionTitle}" conclusion of a credit draft. Match the style: bullet list where each item starts with a short label (like a subheading) followed by narrative.

Current conclusion (reference for facts, tone, and structure — improve clarity; do not invent specific numbers not implied by the text):
---
${clipped}
---

Return ONLY valid JSON with this exact shape:
{"items":[{"label":"Short label ending with colon: ","body":"One to three sentences of analysis."}]}
Use between 4 and 7 items unless the source clearly needs fewer.`;

  let pplxRes: Response;
  try {
    pplxRes = await fetch("https://api.perplexity.ai/v1/sonar", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.PERPLEXITY_MODEL || "sonar-pro",
        temperature: 0.35,
        max_tokens: 4096,
        disable_search: true,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: "Failed to reach Perplexity API", detail: msg }, { status: 502 });
  }

  const rawText = await pplxRes.text();
  if (!pplxRes.ok) {
    return NextResponse.json(
      {
        error: "Perplexity API returned an error",
        status: pplxRes.status,
        detail: rawText.slice(0, 800),
      },
      { status: 502 }
    );
  }

  let data: { choices?: { message?: { content?: unknown } }[] };
  try {
    data = JSON.parse(rawText) as typeof data;
  } catch {
    return NextResponse.json({ error: "Invalid JSON from Perplexity" }, { status: 502 });
  }

  const content = data.choices?.[0]?.message?.content;
  const text = typeof content === "string" ? content : content != null ? String(content) : "";
  const parsed = extractJsonObject(text);

  if (!parsed || !Array.isArray(parsed.items)) {
    return NextResponse.json(
      { error: "Model did not return usable JSON", preview: text.slice(0, 600) },
      { status: 502 }
    );
  }

  const items = parsed.items.filter((x: unknown) => {
    const o = x as { label?: string; body?: string };
    return o && (o.label || o.body);
  });
  if (!items.length) {
    return NextResponse.json({ error: "Model returned empty items" }, { status: 502 });
  }

  return NextResponse.json({ items });
}
