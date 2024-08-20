"use client";

import { Button } from "@/components/ui/button";
import { LearningContent, fetchLearningContent } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import MarkdownPreview from "@/components/mylib/markdownPreview"; // MarkdownPreviewをインポート

interface Props {
  params: {
    id: string;
  };
}

export default function DetailLearningContent({ params }: Props) {
  const { id } = params;

  const [learningContent, setLearningContent] =
    useState<LearningContent | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchLearningContent(parseInt(id));
      setLearningContent(data);
    };
    loadContent();
  }, [id]);

  if (!learningContent) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 space-y-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">学習内容の詳細</h1>
      </header>
      <main>
        <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-2">タイトル</h2>
          <p className="text-xl text-gray-800 mb-4">{learningContent.title}</p>
          <h3 className="text-lg font-medium mb-2">カテゴリー</h3>
          <p className="text-base text-gray-600 mb-4">
            {learningContent.category}
          </p>
          <h3 className="text-lg font-medium mb-2">内容</h3>
          {/* MarkdownPreviewを使ってcontentを表示 */}
          <MarkdownPreview markdownString={learningContent.content} />
        </section>
        <section className="text-center">
          <Link href={`/learningContent/edit/${id}`} passHref>
            <Button variant="default">編集</Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
