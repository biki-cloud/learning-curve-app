"use client";

import { Button } from "@/components/ui/button";
import { LearningContent, fetchLearningContent } from "@/components/mylib/api";
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

  const handleDelete = async () => {
    // 削除処理をここに追加
    // await deleteLearningContent(learningContent.id);
    // 例: router.push("/learningContent/list");
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          学習内容の詳細
        </h1>
        <section className="text-center mb-4">
          <Link href={`/learningContent/edit/${id}`} passHref>
            <Button
              variant="default"
              className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            >
              編集
            </Button>
          </Link>
          <Button
            onClick={handleDelete}
            className="ml-4 bg-red-500 text-white hover:bg-red-600 transition duration-300"
          >
            削除
          </Button>
        </section>
      </header>
      <main>
        <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg mb-8">
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
      </main>
    </div>
  );
}
