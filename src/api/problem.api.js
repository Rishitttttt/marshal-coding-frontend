import api from "./axios.js";

// Get problems by topic
export const getProblemsByTopic = async (topicId) => {
  const res = await api.get(`/topics/${topicId}/problems`);
  return res.data;
};

// Get single problem
export const getProblemById = async (problemId) => {
  const res = await api.get(`/problems/${problemId}`);
  return res.data;
};
export const markProblemSolved = async (problemId) => {
  const res = await api.post("/progress/solve", { problemId });
  return res.data;
};

export const unmarkProblemSolved = async (problemId) => {
  const res = await api.post("/progress/unsolve", { problemId });
  return res.data;
};

