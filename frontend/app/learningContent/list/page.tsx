"use client";
import { useState, useEffect } from "react";
import { fetchLearningContents, LearningContent } from "../../../lib/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ListLearningContent() {
  const [learningContents, setLearningContents] = useState<LearningContent[]>(
    []
  );

  useEffect(() => {
    const loadContents = async () => {
      const data = await fetchLearningContents();
      setLearningContents(data);
    };
    loadContents();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">学習内容リスト</h1>
      </header>
      <main>
        <section className="space-y-4 mb-8">
          {learningContents.map((content) => (
            <Link
              href={`/learningContent/detail/${content.id}`}
              key={content.id}
              passHref
            >
              <Card className="max-w-sm mx-auto cursor-pointer hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                </CardHeader>
                {/* <CardContent>
                  <p>{content.content}</p>
                  <p className="text-sm text-gray-500">{content.category}</p>
                </CardContent> */}
              </Card>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
