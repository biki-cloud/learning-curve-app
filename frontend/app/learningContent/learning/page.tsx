"use client";
import { useState, useEffect } from "react";
import {
  fetchLearningCurveContents,
  LearningContent,
  updateLearningContent,
} from "@/components/mylib/api";
import { Button } from "@/components/ui/button";
import MarkdownPreview from "@/components/mylib/markdownPreview";

export default function LearningCurvePage() {
  const [learningContents, setLearningContents] = useState<LearningContent[]>(
    []
  );
  const [currentContent, setCurrentContent] = useState<LearningContent | null>(
    null
  );
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    const loadContents = async () => {
      if (userId !== null) {
        const data = await fetchLearningCurveContents(userId);
        setLearningContents(data);
        if (data.length > 0) {
          setCurrentContent(data[0]);
        }
      }
    };
    loadContents();
  }, [userId]);

  const handleNext = async () => {
    if (userId !== null && currentContent) {
      // レビュー回数やlastreviewDateを変更するためのPUTリクエスト
      const updatedContent = {
        ...currentContent,
        lastReviewedDate: new Date().toISOString(),
        reviewCount: currentContent.reviewCount + 1,
      };
      const updatedDate = await updateLearningContent(
        currentContent.id!,
        updatedContent
      );

      // 次のコンテンツを取得
      const data = await fetchLearningCurveContents(userId);
      setLearningContents(data);
      console.log(data);
      if (data.length > 0) {
        setCurrentContent(data[0]);
      }
    }
  };

  if (!currentContent) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 space-y-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">学習内容</h1>
      </header>
      <section className="text-center">
        <Button variant="default" onClick={handleNext}>
          次へ
        </Button>
      </section>

      <main>
        <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-2">タイトル</h2>
          <p className="text-xl text-gray-800 mb-4">{currentContent.title}</p>
          <h3 className="text-lg font-medium mb-2">カテゴリー</h3>
          <p className="text-base text-gray-600 mb-4">
            {currentContent.category}
          </p>
          <h3 className="text-lg font-medium mb-2">内容</h3>
          <MarkdownPreview markdownString={currentContent.content} />
        </section>
      </main>
    </div>
  );
}
