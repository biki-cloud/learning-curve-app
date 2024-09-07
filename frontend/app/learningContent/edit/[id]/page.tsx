"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  fetchLearningContent,
  updateLearningContent,
  LearningContent,
  deleteLearningContent,
} from "@/components/mylib/api";
import "easymde/dist/easymde.min.css";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import MarkdownPreview from "@/components/mylib/markdownPreview";

// SimpleMDEを遅延読み込み
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

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

  const handleChange = (name: keyof LearningContent, value: string) => {
    if (learningContent) {
      setLearningContent({
        ...learningContent,
        [name]: value,
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

  const handleDelete = async () => {
    if (learningContent) {
      await deleteLearningContent(parseInt(id));
      router.push("/learningContent/list");
    }
  };

  if (!learningContent) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 space-y-6 bg-white shadow-lg rounded-lg"
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
          onChange={(e) => handleChange("title", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          内容
        </label>
        <div className="flex">
          <div className="w-1/2">
            <SimpleMDE
              value={learningContent.content}
              onChange={(value) => handleChange("content", value)}
            />
          </div>
          <div className="w-1/2 pl-4">
            <MarkdownPreview markdownString={learningContent.content} />
          </div>
        </div>
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
          onChange={(e) => handleChange("category", e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="text-center">
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
        >
          更新
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          className="mt-4 w-full bg-red-500 text-white hover:bg-red-600 transition duration-300"
        >
          削除
        </Button>
      </div>
    </form>
  );
}
