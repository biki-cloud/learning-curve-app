import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import styles from "./markdown.module.css"; // グローバルCSSファイルをインポート
import getMarkDown from "./getMarkDown";

import codeBlock from "./codeBlock";

// 最後はpropsからmarkdownを受け取るようにする
const MarkDown = () => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          pre: codeBlock,
        }}
      >
        {getMarkDown()}
      </ReactMarkdown>
    </div>
  );
};

export default MarkDown;
