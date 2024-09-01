"use client";
import { useState, useEffect } from "react";
import {
  fetchLearningContents,
  fetchCategories,
  LearningContent,
} from "../../../components/mylib/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ListLearningContent() {
  const [learningContents, setLearningContents] = useState<LearningContent[]>(
    []
  );
  const [userId, setUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

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
        const data = await fetchLearningContents(userId);
        setLearningContents(data);
      }
    };
    loadContents();
  }, [userId]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const filteredContents = learningContents.filter((content) => {
    const matchesCategory = selectedCategory
      ? content.category === selectedCategory
      : true;
    const matchesSearchTerm =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">学習内容リスト</h1>
        <input
          type="text"
          placeholder="フリーワード検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">全てのカテゴリ</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </header>
      <main>
        <section className="space-y-4 mb-8">
          {filteredContents.map((content) => (
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
