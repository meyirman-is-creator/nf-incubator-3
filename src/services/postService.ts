import axios from 'axios';

const API_URL = 'https://dummyjson.com/posts';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, logging out...');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    }
    return Promise.reject(error);
  }
);

export const getPosts = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data.posts;
};

export const getPostById = async (id: string) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (post: { title: string; body: string }) => {
  const response = await axiosInstance.post(`${API_URL}/add`, post); // Изменили URL для создания поста
  return response.data;
};

export const updatePost = async (id: string, post: { title?: string; body?: string }) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};
