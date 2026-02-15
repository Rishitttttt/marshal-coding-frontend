import api from "./axios.js";

export const getSheets = async () => {
  const res = await api.get("/sheets");
  return res.data;
};
export const getResumeProblem = async () => {
  const res = await api.get("/resume");
  return res.data;
};

