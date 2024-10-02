"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import {
  addLearningContent,
  LearningContent,
  fetchCategories,
  uploadImage,
} from "@/components/mylib/api";
import { Button } from "@/components/ui/button";
import MarkdownPreview from "@/components/mylib/markdownPreview";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>読み込み中...</p>,
});

export default function CreateLearningContent() {
  const [newContent, setNewContent] = useState<LearningContent>({
    title: "",
    content: "",
    category: "",
    user: { id: 0, username: "", password: "", email: "" },
    lastReviewedDate: "",
    reviewCount: 0,
    draft: false,
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
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

    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryToUse =
      selectedCategories.length > 0
        ? selectedCategories.join(",")
        : newCategory;

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
      lastReviewedDate: "",
      reviewCount: 0,
      draft: false,
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
          `![](${backendHost}${uploadedImageUrl})`
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
        simpleMde.codemirror.replaceSelection(`![](${uploadedImageUrl})`);
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
      setSelectedCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
      setShowCategoryInput(false);
    } else {
      alert("カテゴリ名を入力してください。");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">学習内容作成</h1>
          <p className="text-gray-600 mt-2">
            新しい知識を記録し、整理しましょう
          </p>
        </header>
        <main className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                type="text"
                placeholder="学習内容のタイトルを入力"
                value={newContent.title}
                onChange={(e) =>
                  setNewContent({ ...newContent, title: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>内容</Label>
                <SimpleMDE
                  getMdeInstance={getInstance}
                  value={newContent.content}
                  onChange={(value) =>
                    setNewContent({ ...newContent, content: value })
                  }
                  events={{ drop: handleDrop, paste: handlePaste }}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>プレビュー</Label>
                <div className="mt-1 border rounded-md p-4 h-[calc(100%-2rem)] overflow-auto">
                  <MarkdownPreview markdownString={newContent.content} />
                </div>
              </div>
            </div>
            <div>
              <Label>カテゴリ</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      selectedCategories.includes(category)
                        ? "outline"
                        : "default"
                    }
                    className="cursor-pointer"
                    onClick={() => handleToggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCategoryInput(true)}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  新しいカテゴリ
                </Button>
              </div>
              {showCategoryInput && (
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="新しいカテゴリ名"
                    className="flex-grow"
                  />
                  <Button type="button" onClick={handleAddCategory}>
                    追加
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCategoryInput(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="draft"
                checked={newContent.draft}
                onCheckedChange={(checked) =>
                  setNewContent({ ...newContent, draft: checked as boolean })
                }
              />
              <Label htmlFor="draft">ドラフトとして保存</Label>
            </div>
            <Button type="submit" className="w-full" variant="outline">
              学習内容を追加
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
