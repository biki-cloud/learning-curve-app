"use client";

import { Button } from "@/components/ui/button";
import { LearningContent, fetchLearningContent } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function EditLearningContent({ params }: Props) {
  const { id: id } = params;

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
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">{learningContent.title}</h1>
      </header>
      <main>
        <section>
          <p>{learningContent.content}</p>
          <p className="text-sm text-gray-500">{learningContent.category}</p>
        </section>
        <section className="text-center mt-8">
          <Link href={`/learningContent/edit/${id}`} passHref>
            <Button variant="default">編集</Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
