"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { addLearningContent, LearningContent } from "../../../lib/api";
import { Button } from "@/components/ui/button";
import MarkdownPreview from "@/components/mylib/markdownPreview";

// SimpleMDEの読み込みを遅延させる
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function CreateLearningContent() {
  const [newContent, setNewContent] = useState<LearningContent>({
    title: "",
    content: "",
    category: "",
  });

  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent({ ...newContent, title: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent({ ...newContent, category: e.target.value });
  };

  const handleContentChange = (value: string) => {
    setNewContent({ ...newContent, content: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const addedContent = await addLearningContent(newContent);
    setNewContent({ title: "", content: "", category: "" });
    router.push("/learningContent/detail/" + addedContent.id);
  };

  return (
    <div className="p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">学習内容作成</h1>
      </header>
      <main>
        <section>
          <h2 className="text-2xl font-semibold mb-4">新しい学習内容を追加</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="タイトル"
              value={newContent.title}
              onChange={handleTitleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <SimpleMDE onChange={handleContentChange} />
            <MarkdownPreview markdownString={newContent.content} />
            <input
              type="text"
              name="category"
              placeholder="カテゴリ"
              value={newContent.category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Button type="submit">追加</Button>
          </form>
        </section>
      </main>
    </div>
  );
}
