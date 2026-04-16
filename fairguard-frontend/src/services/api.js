import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_BASE_URL}/upload-dataset`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeBias = async (config) => {
  const response = await apiClient.post('/analyze-bias', config);
  return response.data;
};

export const trainModel = async (config) => {
  const response = await apiClient.post('/train-model', config);
  return response.data;
};

export const evaluateModel = async (config) => {
  const response = await apiClient.post('/evaluate-model', config);
  return response.data;
};

export const predict = async (data) => {
  const response = await apiClient.post('/predict', data);
  return response.data;
};

export default apiClient;
