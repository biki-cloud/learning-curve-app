"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../../components/mylib/api";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await signup(user);
    localStorage.setItem("user", JSON.stringify(newUser));
    router.push("/learningContent/list");
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-4">サインアップ</h1>
      <main>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="ユーザー名"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            サインアップ
          </button>
        </form>
      </main>
    </div>
  );
}
