"use client";

import React from "react";
import "./styles.css";
import { Editor } from "@/text-editor";
import { TypingAnimation } from "@/app/lexical-page/components/typing-animation";

export default function Home() {
  return (
    <div className="App">
      <TypingAnimation />

      <Editor />
    </div>
  );
}
