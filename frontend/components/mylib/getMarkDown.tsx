import fs from "fs";
import path from "path";

export default function getMarkDown() {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), "components/mylib/test.md"),
    "utf8"
  );

  return markdown;
}
