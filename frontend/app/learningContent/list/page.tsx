"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Search, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  fetchLearningContents,
  fetchCategories,
  fetchDrafts,
  LearningContent,
  deleteLearningContent,
} from "../../../components/mylib/api";

export default function ModernLearningContentList() {
  const [learningContents, setLearningContents] = useState<LearningContent[]>(
    []
  );
  const [userId, setUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const handleDelete = async (id: number) => {
    await deleteLearningContent(id);
    setLearningContents((prev) => prev.filter((content) => content.id !== id));
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">学習内容リスト</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Switch
              checked={showDrafts}
              onCheckedChange={setShowDrafts}
              id="draft-mode"
            />
            <label
              htmlFor="draft-mode"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {showDrafts ? "ドラフトを表示" : "ドラフトを非表示"}
            </label>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="フリーワード検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link href="/learningContent/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> 新規作成
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={
              selectedCategories.includes(category) ? "outline" : "default"
            }
            className={`cursor-pointer transition-all duration-300 ease-in-out ${
              selectedCategories.includes(category)
                ? "bg-blue-500 text-white !gb-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <Card key={content.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{content.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Badge variant="secondary">{content.category}</Badge>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {content.content}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/learningContent/detail/${content.id}`}>
                <Button variant="outline" size="sm">
                  詳細
                </Button>
              </Link>
              <div className="space-x-2">
                <Link href={`/learningContent/edit/${content.id}`}>
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(content.id!)}
                >
                  削除
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
