import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { injectPhysicalStackHeadingIds } from "@/lib/physical-stack-contents";
import { injectWorldviewHeadingIds } from "@/lib/worldview-contents";

export async function getResearchContent(slug: string): Promise<string> {
  const filePath = path.join(process.cwd(), "content", "research", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const result = await remark().use(remarkGfm).use(remarkHtml).process(fileContents);
  let html = result.toString();
  if (slug === "dc-physical-stack") {
    html = injectPhysicalStackHeadingIds(html);
  }
  if (slug === "dc-worldview") {
    html = injectWorldviewHeadingIds(html);
  }
  return html;
}
