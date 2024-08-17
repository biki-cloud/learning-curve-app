// pages/learningContent/[id]/edit.tsx

"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  fetchLearningContent,
  updateLearningContent,
  LearningContent,
} from "@/lib/api"; // updateLearningContentを追加
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
    <form onSubmit={handleSubmit} className="shadcn-form">
      <input
        type="text"
        name="title"
        placeholder="タイトル"
        value={learningContent.title}
        onChange={handleChange}
        className="shadcn-input"
      />
      <textarea
        name="content"
        placeholder="内容"
        value={learningContent.content}
        onChange={handleChange}
        className="shadcn-textarea"
      ></textarea>
      <input
        type="text"
        name="category"
        placeholder="カテゴリ"
        value={learningContent.category}
        onChange={handleChange}
        className="shadcn-input"
      />
      <Button type="submit">更新</Button>
    </form>
  );
}
