import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/dados",
});

export const getChartData = async () => {
  const response = await api.get("/chart-data");
  return response.data;
};

export const getChartDataLast12Hours = async () => {
  const response = await api.get("/chart/12h");
  return response.data;
};

export const getChartDataLast3Days = async () => {
  const response = await api.get("/chart/3d");
  return response.data;
};

export const getAllDados = async () => {
  const response = await api.get("/all");
  return response.data;
};

export const getLatestReading = async () => {
  const response = await api.get("/latest");
  return response.data;
};
