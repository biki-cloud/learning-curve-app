import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const language = className?.replace(/language-/, "") || "javascript";

  return !inline ? (
    <SyntaxHighlighter
      style={solarizedlight} // 適切なスタイルを選択
      language={language}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeBlock;
