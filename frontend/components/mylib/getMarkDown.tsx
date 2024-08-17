import fs from "fs";
import path from "path";
const markdown = fs.readFileSync(
  path.join(process.cwd(), "components/mylib/test.md"),
  "utf8"
);

export default function getMarkDown() {
  return markdown;
}
