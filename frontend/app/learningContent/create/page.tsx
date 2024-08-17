"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { redirect, useRouter } from "next/navigation";
import {
  fetchLearningContents,
  addLearningContent,
  LearningContent,
} from "../../../lib/api";
import { Button } from "@/components/ui/button";

export default function CreateLearningContent() {
  const [newContent, setNewContent] = useState<LearningContent>({
    title: "",
    content: "",
    category: "",
  });

  const router = useRouter(); // useRouterフックを取得

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
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
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="content"
              placeholder="内容"
              value={newContent.content}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            ></textarea>
            <input
              type="text"
              name="category"
              placeholder="カテゴリ"
              value={newContent.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Button type="submit">追加</Button>
          </form>
        </section>
      </main>
    </div>
  );
}
