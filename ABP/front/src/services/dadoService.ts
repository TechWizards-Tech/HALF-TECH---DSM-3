import axios from "axios";

export const getChartData = async () => {
  const response = await axios.get("http://localhost:5000/api/dados/chart-data");
  return response.data;
};

export const getAllDados = async () => {
  const response = await axios.get("http://localhost:5000/api/dados/all");
  return response.data;
};
