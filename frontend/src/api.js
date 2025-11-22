import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const registerUser = async (data) => {
  return await axios.post(`${BASE_URL}/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${BASE_URL}/auth/login`, data);
};

export const getMe = async (token) => {
  return await axios.get(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
