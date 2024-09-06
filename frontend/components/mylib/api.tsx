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
  draft: boolean;
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
  console.log("addLearningContent");
  console.log(data);
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
  userId: number,
  category?: string,
  strategyType: string = "random" // デフォルト戦略を追加
): Promise<LearningContent[]> => {
  console.log("fetchLearningCurveContents");
  console.log("userId", userId);
  console.log("category", category);
  console.log("strategyType", strategyType);
  const endpoint = category
    ? `/learning/user/${userId}/learning-curve?category=${category}&strategyType=${strategyType}`
    : `/learning/user/${userId}/learning-curve?strategyType=${strategyType}`;
  return apiFetch(endpoint, "GET");
};

export const fetchCategories = async (): Promise<string[]> => {
  return apiFetch(`/learning/categories`, "GET");
};

export const fetchStrategies = async (): Promise<string[]> => {
  return apiFetch(`/learning/strategies`, "GET");
};

export const markCorrect = async (id: number): Promise<LearningContent> => {
  return apiFetch(`/learning/${id}/correct`, "POST");
};

export const markIncorrect = async (id: number): Promise<LearningContent> => {
  return apiFetch(`/learning/${id}/incorrect`, "POST");
};

export const deleteLearningContent = async (id: number): Promise<void> => {
  return apiFetch(`/learning/${id}`, "DELETE");
};

export const searchLearningContents = async (
  term: string
): Promise<LearningContent[]> => {
  return apiFetch(`/learning/search?term=${term}`, "GET");
};

export const fetchDrafts = async (
  userId: number
): Promise<LearningContent[]> => {
  return apiFetch(`/learning/drafts/user/${userId}`, "GET");
};
