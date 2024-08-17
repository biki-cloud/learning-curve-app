"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  fetchLearningContent,
  updateLearningContent,
  LearningContent,
} from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    id: string;
  };
}

export default function EditLearningContent({ params }: Props) {
  const { id } = params;
  const [learningContent, setLearningContent] =
    useState<LearningContent | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchLearningContent(parseInt(id));
      setLearningContent(data);
    };
    loadContent();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (learningContent) {
      setLearningContent({
        ...learningContent,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (learningContent) {
      await updateLearningContent(parseInt(id), learningContent);
      router.push("/learningContent/detail/" + id);
    }
  };

  if (!learningContent) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 space-y-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        学習内容を編集
      </h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={learningContent.title}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          内容
        </label>
        <textarea
          id="content"
          name="content"
          value={learningContent.content}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        ></textarea>
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          カテゴリ
        </label>
        <input
          id="category"
          type="text"
          name="category"
          value={learningContent.category}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="text-center">
        <Button type="submit">更新</Button>
      </div>
    </form>
  );
}
