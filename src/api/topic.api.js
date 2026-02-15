import api from "./axios.js";

export const getTopicsBySheet = async (sheetId) => {
  const res = await api.get(`/sheets/${sheetId}/topics`);
  return res.data;
};
