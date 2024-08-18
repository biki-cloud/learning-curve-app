"use client";
import React, { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import highlight from "highlightjs";
import "highlightjs/styles/docco.css";
import DOMPurify from "dompurify";

const MarkDownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const convertMarkdown = async () => {
      const result = await marked(markdown);
      setHtml(DOMPurify.sanitize(result));
    };
    convertMarkdown();
  }, [markdown]);

  return (
    <div>
      <SimpleMDE onChange={(e) => setMarkdown(e)} />
      <div id="body">
        <span
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </div>
    </div>
  );
};
export default MarkDownEditor;
