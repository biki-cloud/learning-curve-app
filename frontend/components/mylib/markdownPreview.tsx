import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "katex/dist/katex.min.css";

// markdownのスタイルを設定
import styles from "./markdown.module.css";
// highlight.jsのスタイルシートを読み込むことで、コードブロックのカラースキーマが変わる
// https://github.com/highlightjs/highlight.js/tree/main/src/styles
import "highlight.js/styles/github.css"; // good
// import "highlight.js/styles/monokai.css"; // good

interface Props {
  markdownString: string;
}

const MarkdownPreview = ({ markdownString }: Props) => {
  const marked = new Marked(
    {
      gfm: true,
      breaks: true,
    },
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code: string, lang: string) {
        const language: string = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  return (
    <div className={styles.markdown}>
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(markdownString) as string,
        }}
      ></div>
    </div>
  );
};

export default MarkdownPreview;
