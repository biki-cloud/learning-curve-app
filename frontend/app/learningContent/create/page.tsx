"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import {
  addLearningContent,
  LearningContent,
  fetchCategories,
  uploadImage,
} from "../../../components/mylib/api";
import { Button } from "@/components/ui/button";
import MarkdownPreview from "@/components/mylib/markdownPreview";

// SimpleMDEの読み込みを遅延させる
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function CreateLearningContent() {
  const [newContent, setNewContent] = useState<LearningContent>({
    title: "",
    content: "",
    category: "",
    user: { id: 0, username: "", password: "", email: "" }, // 初期値を設定
    lastReviewedDate: "", // 追加
    reviewCount: 0, // 追加
    draft: false, // 初期値を設定
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setNewContent((prevContent) => ({
        ...prevContent,
        user: JSON.parse(userData),
      }));
    }
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent({ ...newContent, title: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setIsNewCategory(value === "new");
  };

  const handleContentChange = (value: string) => {
    setNewContent({ ...newContent, content: value });
  };

  const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent({ ...newContent, draft: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // selectedCategoriesからカテゴリを取得
    const categoryToUse =
      selectedCategories.length > 0
        ? selectedCategories.join(",")
        : newCategory;

    // カテゴリが空の場合はアラートを表示して処理を中断
    if (!categoryToUse) {
      alert("カテゴリを選択してください。");
      return;
    }

    const addedContent = await addLearningContent({
      ...newContent,
      category: categoryToUse,
    });

    setNewContent({
      title: "",
      content: "",
      category: "",
      user: newContent.user,
      lastReviewedDate: "", // 追加
      reviewCount: 0, // 追加
      draft: false, // 初期値を設定
    });

    router.push("/learningContent/detail/" + addedContent.id);
  };

  const handleDrop = async (data: any, e: { dataTransfer: { files: any } }) => {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const uploadedImageUrl = await uploadImage(file);
        const backendHost = "http://localhost:8080";
        simpleMde.codemirror.replaceSelection(
          "![](" + backendHost + uploadedImageUrl + ")"
        );
      }
    }
  };

  const handlePaste = async (
    _data: any,
    e: { clipboardData: { files: any } }
  ) => {
    const files = e.clipboardData.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const uploadedImageUrl = await uploadImage(file);
        simpleMde.codemirror.replaceSelection("![](" + uploadedImageUrl + ")");
      }
    }
  };

  let simpleMde: { codemirror: { replaceSelection: (arg0: string) => void } };

  const getInstance = (instance: {
    codemirror: { replaceSelection: (arg0: string) => void };
  }) => {
    simpleMde = instance;
  };

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
      setShowCategoryInput(false);
    } else {
      alert("カテゴリ名を入力してください。");
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">学習内容作成</h1>
      </header>
      <main>
        <section>
          <h2 className="text-2xl font-semibold mb-4">新しい学習内容を追加</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
          >
            <input
              type="text"
              name="title"
              placeholder="タイトル"
              value={newContent.title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex">
              <div className="w-1/2">
                <SimpleMDE
                  getMdeInstance={getInstance}
                  value={newContent.content}
                  onChange={(value) =>
                    setNewContent({ ...newContent, content: value })
                  }
                  events={{ drop: handleDrop, paste: handlePaste }}
                />
              </div>
              <div className="w-1/2 pl-4">
                <MarkdownPreview markdownString={newContent.content} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleToggleCategory(category)}
                  className={`border p-2 rounded ${
                    selectedCategories.includes(category)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {category}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowCategoryInput(true)}
                className="border p-2 rounded bg-green-500 text-white"
              >
                カテゴリ追加
              </button>
            </div>
            {showCategoryInput && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="新しいカテゴリ名"
                  className="border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="border p-2 rounded bg-blue-500 text-white"
                >
                  決定
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryInput(false)}
                  className="border p-2 rounded bg-red-500 text-white"
                >
                  キャンセル
                </button>
              </div>
            )}
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={newContent.draft}
                  onChange={handleDraftChange}
                />
                ドラフトとして保存
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            >
              追加
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
