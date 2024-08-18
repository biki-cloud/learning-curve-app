"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "highlight.js/styles/docco.css";
import "easymde/dist/easymde.min.css";
import MarkdownPreview from "@/components/mylib/markdownPreview";

// SimpleMDEの読み込みを遅延させる.これがないとSSRでエラーが出る
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const MarkDownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <div>
      <SimpleMDE onChange={(value) => setMarkdown(value)} />
      <MarkdownPreview markdownString={markdown} />
    </div>
  );
};

export default MarkDownEditor;
