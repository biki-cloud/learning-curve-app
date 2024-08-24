"use client";
import { useState, useEffect } from "react";
import {
  fetchLearningCurveContents,
  LearningContent,
  updateLearningContent,
  fetchCategories,
  fetchStrategies,
  markCorrect,
  markIncorrect,
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [strategies, setStrategies] = useState<string[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>(
    "RandomLearningCurveStrategy"
  );

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
    const loadStrategies = async () => {
      const data = await fetchStrategies();
      setStrategies(data);
    };
    loadStrategies();
  }, []);

  useEffect(() => {
    const loadContents = async () => {
      if (userId !== null) {
        const categoryQuery = selectedCategories.join(",");
        const data = await fetchLearningCurveContents(
          userId,
          categoryQuery,
          selectedStrategy
        );
        setLearningContents(data);
        if (data.length > 0) {
          setCurrentContent(data[0]);
        }
      }
    };
    loadContents();
  }, [userId, selectedCategories, selectedStrategy]);

  const handleNext = async () => {
    if (userId !== null && currentContent) {
      const updatedContent = {
        ...currentContent,
        lastReviewedDate: new Date().toISOString(),
        reviewCount: currentContent.reviewCount + 1,
      };
      await updateLearningContent(currentContent.id!, updatedContent);

      const categoryQuery = selectedCategories.join(",");
      const data = await fetchLearningCurveContents(
        userId,
        categoryQuery,
        selectedStrategy
      );
      setLearningContents(data);
      if (data.length > 0) {
        setCurrentContent(data[0]);
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

  const handleStrategyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedStrategy(event.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentContent, userId]);

  if (!currentContent) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">学習内容</h1>
        <p className="text-lg text-gray-600">あなたの学びをサポートします</p>
      </header>
      <section className="text-center mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={
              selectedCategories.includes(category) ? "default" : "ghost"
            }
            onClick={() => toggleCategory(category)}
            className={`mx-2 transition duration-300 ease-in-out transform ${
              selectedCategories.includes(category)
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {category}
          </Button>
        ))}
      </section>
      <section className="text-center mb-4">
        <label htmlFor="strategy" className="mr-2">
          学習戦略を選択:
        </label>
        <select
          id="strategy"
          value={selectedStrategy}
          onChange={handleStrategyChange}
          className="border border-gray-300 rounded p-2"
        >
          {strategies.map((strategy) => (
            <option key={strategy} value={strategy}>
              {strategy}
            </option>
          ))}
        </select>
      </section>
      <section className="text-center mb-4">
        <Button
          variant="default"
          onClick={handleCorrect}
          className="bg-green-500 text-white hover:bg-green-600 transition duration-300"
        >
          覚えた！
        </Button>
        <Button
          variant="default"
          onClick={handleIncorrect}
          className="bg-red-500 text-white hover:bg-red-600 transition duration-300"
        >
          覚えてない！
        </Button>
      </section>
      <main>
        <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-800 mb-4">
            {currentContent.category}
          </p>
          <div className="bg-blue-100 p-4 rounded">
            <MarkdownPreview markdownString={currentContent.content} />
          </div>
        </section>
      </main>
    </div>
  );
}
