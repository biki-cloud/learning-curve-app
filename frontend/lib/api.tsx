// lib/api.ts

export interface LearningContent {
  id?: number;
  title: string;
  content: string;
  category: string;
}

// Fetchリクエストの共通部分を処理する関数
const apiFetch = async (
  endpoint: string,
  method: "GET" | "POST",
  body?: LearningContent
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

export const fetchLearningContents = async (): Promise<LearningContent[]> => {
  return apiFetch("/learning", "GET");
};

export const addLearningContent = async (
  data: LearningContent
): Promise<LearningContent> => {
  return apiFetch("/learning", "POST", data);
};
