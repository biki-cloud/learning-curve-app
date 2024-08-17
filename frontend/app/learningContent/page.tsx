"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  fetchLearningContents,
  addLearningContent,
  LearningContent,
} from "../../lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  const [learningContents, setLearningContents] = useState<LearningContent[]>(
    []
  );
  const [newContent, setNewContent] = useState<LearningContent>({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    const loadContents = async () => {
      const data = await fetchLearningContents();
      setLearningContents(data);
    };
    loadContents();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const addedContent = await addLearningContent(newContent);
    setLearningContents([...learningContents, addedContent]);
    setNewContent({ title: "", content: "", category: "" });
  };

  return (
    <div className="p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">学習内容リスト</h1>
      </header>
      <main>
        <section className="space-y-4 mb-8">
          {learningContents.map((content) => (
            <Card key={content.id} className="max-w-sm mx-auto">
              <CardHeader>
                <CardTitle>{content.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{content.content}</p>
                <p className="text-sm text-gray-500">{content.category}</p>
              </CardContent>
            </Card>
          ))}
        </section>

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
