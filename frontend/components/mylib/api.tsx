// lib/api.ts

export interface LearningContent {
  id?: number;
  title: string;
  content: string;
  category: string;
  user: User; // Added user field
  // フロント側で設定
  lastReviewedDate: string;
  // フロント側で設定
  reviewCount: number;
  // バック側で制御
  level: number;
}

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
}

export interface SigninData {
  username: string;
  password: string;
}

// Fetchリクエストの共通部分を処理する関数
const apiFetch = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: LearningContent | User | SigninData
) => {
  const response = await fetch(`http://localhost:8080/api${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchLearningContents = async (
  userId: number
): Promise<LearningContent[]> => {
  return apiFetch(`/learning/user/${userId}`, "GET");
};

export const fetchLearningContent = async (
  id: number
): Promise<LearningContent> => {
  return apiFetch(`/learning/${id}`, "GET");
};

export const addLearningContent = async (
  data: LearningContent
): Promise<LearningContent> => {
  return apiFetch("/learning", "POST", data);
};

export const updateLearningContent = async (
  id: number,
  data: LearningContent
): Promise<LearningContent> => {
  return apiFetch(`/learning/${id}`, "PUT", data);
};

export const signup = async (data: User): Promise<User> => {
  return apiFetch("/users", "POST", data);
};

export const signin = async (data: SigninData): Promise<User> => {
  return apiFetch("/users/signin", "POST", data);
};

export const fetchLearningCurveContents = async (
  userId: number
): Promise<LearningContent[]> => {
  return apiFetch(`/learning/user/${userId}/learning-curve`, "GET");
};
