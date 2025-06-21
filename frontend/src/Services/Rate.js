import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getlatestRate = async () => {
      return axios.get(`${BASE_URL}/api/v0.1/getRate`, {headers: {Authorization: `Bearer ${localStorage.getItem("sellerToken")}`,},});
};

export const updateRate = async (id, data) => {
      return axios.put(`${BASE_URL}/api/v0.1/updateRate/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("sellerToken")}`,},});
};