"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchLearningCurveContents,
  LearningContent,
  markCorrect,
  markIncorrect,
  fetchCategories,
} from "@/components/mylib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, ArrowRight, Edit } from "lucide-react";
import MarkdownPreview from "@/components/mylib/markdownPreview";

export default function ModernLearningCurvePage() {
  const [learningContents, setLearningContents] = useState<LearningContent[]>(
    []
  );
  const [currentContent, setCurrentContent] = useState<LearningContent | null>(
    null
  );
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadContents = async () => {
      if (userId !== null) {
        setIsLoading(true);
        const data = await fetchLearningCurveContents(
          userId,
          selectedCategories.join(",")
        );
        setLearningContents(data);
        if (data.length > 0) {
          setCurrentContent(data[0]);
        }
        setIsLoading(false);
      }
    };
    loadContents();
  }, [userId, selectedCategories]);

  const handleNext = async () => {
    if (currentContent) {
      const currentIndex = learningContents.indexOf(currentContent);
      if (currentIndex < learningContents.length - 1) {
        setCurrentContent(learningContents[currentIndex + 1]);
      } else {
        await fetchNewContents();
      }
    }
  };

  const fetchNewContents = async () => {
    if (userId !== null) {
      const data = await fetchLearningCurveContents(
        userId,
        selectedCategories.join(",")
      );
      setLearningContents(data);
      if (data.length > 0) {
        setCurrentContent(data[0]);
      } else {
        setCurrentContent(null);
      }
    }
  };

  const handleCorrect = async () => {
    if (currentContent) {
      await markCorrect(currentContent.id!);
      handleNext();
    }
  };

  const handleIncorrect = async () => {
    if (currentContent) {
      await markIncorrect(currentContent.id!);
      handleNext();
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowUp":
          handleCorrect();
          break;
        case "ArrowDown":
          handleIncorrect();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentContent, userId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-64" />
        <div className="flex justify-center space-x-4">
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
        </div>
      </div>
    );
  }

  if (learningContents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100"
      >
        <div className="mb-8">
          <Link href="/">
            <Image
              src="/congratulations.jpg"
              width={300}
              height={300}
              alt="Congratulations"
              className="rounded-full shadow-lg"
            />
          </Link>
        </div>
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          Congratulations!
        </h2>
        <p className="text-2xl font-semibold text-gray-700">
          今日の学習は全て終了しました！
        </p>
        <Button
          className="mt-8"
          onClick={() => router.push("/learningContent/list")}
        >
          ホームに戻る
        </Button>
      </motion.div>
    );
  }

  if (!currentContent) {
    return (
      <p className="text-center text-2xl font-semibold text-gray-700">
        読み込み中です...
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">学習内容</h1>
        <p className="text-lg text-gray-600">あなたの学びをサポートします</p>
      </header>
      <main>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>学習設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">カテゴリを選択:</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      selectedCategories.includes(category)
                        ? "outline"
                        : "default"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentContent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{currentContent.title}</CardTitle>
                <Badge>{currentContent.category}</Badge>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <MarkdownPreview markdownString={currentContent.content} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <Button
                  onClick={handleCorrect}
                  className="bg-primary bg-green-500 hover:bg-green-600 text-white"
                >
                  <ArrowUp className="mr-2 h-4 w-4" /> 覚えた！
                </Button>
                <Button
                  onClick={handleIncorrect}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <ArrowDown className="mr-2 h-4 w-4" /> 覚えてない！
                </Button>
                <Link href={`/learningContent/edit/${currentContent.id}`}>
                  <Button className="bg-white text-blue-500 hover:bg-blue-50 border border-blue-500">
                    <Edit className="mr-2 h-4 w-4" /> 編集
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
