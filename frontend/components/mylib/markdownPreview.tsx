import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import styles from "./markdown.module.css"; // グローバルCSSファイルをインポート
import getMarkDown from "./getMarkDown";

import codeBlock from "./codeBlock";

interface Props {
  markdownString: string;
}

// 最後はpropsからmarkdownを受け取るようにする
const MarkdownPreview = ({ markdownString: markdownString }: Props) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        // TODO: codeblockをカスタマイズする
        // components={{
        //   pre: codeBlock,
        // }}
      >
        {markdownString}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
