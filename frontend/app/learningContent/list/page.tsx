"use client";
import { useState, useEffect } from "react";
import {
  fetchLearningContents,
  fetchCategories,
  fetchDrafts,
  LearningContent,
  deleteLearningContent,
} from "../../../components/mylib/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ListLearningContent() {
  const [learningContents, setLearningContents] = useState<LearningContent[]>(
    []
  );
  const [userId, setUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);

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
        const data = showDrafts
          ? await fetchDrafts(userId)
          : await fetchLearningContents(userId);
        setLearningContents(data);
      }
    };
    loadContents();
  }, [userId, showDrafts]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const filteredContents = learningContents.filter((content) => {
    const matchesCategory =
      selectedCategories.length > 0
        ? selectedCategories.some((category) =>
            content.category.includes(category)
          )
        : true;
    const matchesSearchTerm =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const toggleShowDrafts = () => {
    setShowDrafts((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    await deleteLearningContent(id);
    setLearningContents((prev) => prev.filter((content) => content.id !== id));
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          学習内容リスト
        </h1>
        <button
          onClick={toggleShowDrafts}
          className={`mb-4 px-4 py-2 rounded-lg transition duration-300 
            ${
              showDrafts
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
        >
          {showDrafts ? "ドラフトを非表示" : "ドラフトを表示"}
        </button>
        <input
          type="text"
          placeholder="フリーワード検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`border p-2 rounded ${
                selectedCategories.includes(category)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>
      <main>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredContents.map((content) => (
            <Card
              key={content.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {content.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{content.category}</p>
                <div className="flex space-x-2 mt-2">
                  <Link href={`/learningContent/detail/${content.id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      詳細
                    </button>
                  </Link>
                  <Link href={`/learningContent/edit/${content.id}`}>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                      編集
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    削除
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
