import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import type { ClassAttributes, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeBlock = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps) => {
  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { children: code } = childProps;

  return (
    <SyntaxHighlighter>{String(code).replace(/\n$/, "")}</SyntaxHighlighter>
  );
};

export default codeBlock;
