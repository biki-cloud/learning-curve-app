"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  fetchLearningContent,
  updateLearningContent,
  LearningContent,
  deleteLearningContent,
  uploadImage,
  fetchCategories,
} from "@/components/mylib/api";
import "easymde/dist/easymde.min.css";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import MarkdownPreview from "@/components/mylib/markdownPreview";

// SimpleMDEを遅延読み込み
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface Props {
  params: {
    id: string;
  };
}

export default function EditLearningContent({ params }: Props) {
  const { id } = params;
  const [learningContent, setLearningContent] =
    useState<LearningContent | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchLearningContent(parseInt(id));
      setLearningContent(data);
      setSelectedCategories(data.category.split(",")); // カテゴリを配列に変換
    };
    loadContent();
  }, [id]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleChange = (name: keyof LearningContent, value: any) => {
    if (learningContent) {
      setLearningContent({
        ...learningContent,
        [name]: value,
      });
    }
  };

  const handleCategoryToggle = (category: string) => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (learningContent) {
      const updatedContent = await updateLearningContent(
        parseInt(id),
        { ...learningContent, category: selectedCategories.join(",") } // 選択したカテゴリを更新
      );
      setLearningContent(updatedContent);
      router.push("/learningContent/detail/" + id);
    }
  };

  const handleDelete = async () => {
    if (learningContent) {
      await deleteLearningContent(parseInt(id));
      router.push("/learningContent/list");
    }
  };

  const handleDrop = async (data: any, e: { dataTransfer: { files: any } }) => {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const uploadedImageUrl = await uploadImage(file);
        const backendHost = "http://localhost:8080";
        const getUploadedImageUrl = backendHost + uploadedImageUrl;
        if (learningContent) {
          handleChange(
            "content",
            `![](${getUploadedImageUrl})` + learningContent.content
          );
        }
      }
    }
  };

  if (!learningContent) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 space-y-8 bg-white shadow-lg rounded-lg">
      <header className="text-center mb-4">
        <h2 className="text-2xl font-semibold">学習内容を編集</h2>
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
          >
            更新
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600 transition duration-300"
          >
            削除
          </Button>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            タイトル
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={learningContent.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">カテゴリ</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                type="button"
                onClick={() => handleCategoryToggle(category)}
                className={`border p-2 rounded ${
                  selectedCategories.includes(category)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {category}
              </Button>
            ))}
            <Button
              type="button"
              onClick={() => setShowCategoryInput(true)}
              className="border p-2 rounded bg-green-500 text-white"
            >
              カテゴリ追加
            </Button>
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
              <Button
                type="button"
                onClick={handleAddCategory}
                className="border p-2 rounded bg-blue-500 text-white"
              >
                決定
              </Button>
              <Button
                type="button"
                onClick={() => setShowCategoryInput(false)}
                className="border p-2 rounded bg-red-500 text-white"
              >
                キャンセル
              </Button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            内容
          </label>
          <div className="flex">
            <div className="w-1/2">
              <SimpleMDE
                value={learningContent.content}
                onChange={(value) => handleChange("content", value)}
                events={{ drop: handleDrop }}
              />
            </div>
            <div className="w-1/2 pl-4">
              <MarkdownPreview markdownString={learningContent.content} />
            </div>
          </div>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={learningContent.draft}
              onChange={(e) => handleChange("draft", e.target.checked)}
              className="mr-2"
            />
            ドラフトとして保存
          </label>
        </div>
      </form>
    </div>
  );
}
