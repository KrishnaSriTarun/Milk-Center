import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const sellerLogin = async (data) => {
  return axios.post(`${BASE_URL}/api/v0.1/login`, data);
};

export const sellerRegister = async (data) => {
  return axios.post(`${BASE_URL}/api/v0.1/register`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sellerToken")}`,
    },
  });
};

export const sellerData = async () => {
  return axios.get(`${BASE_URL}/api/v0.1/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sellerToken")}`,
    },
  });
};
