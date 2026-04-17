import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export async function getResearchContent(slug: string): Promise<string> {
  const filePath = path.join(process.cwd(), "content", "research", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const result = await remark().use(remarkGfm).use(remarkHtml).process(fileContents);
  return result.toString();
}
