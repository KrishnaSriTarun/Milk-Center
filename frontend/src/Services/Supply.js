import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const getAuthHeader = () => ({headers: {Authorization: `Bearer ${localStorage.getItem("sellerToken")}`,},});

export const getAllSupply = async (page = 1) => {
      return axios.get(`${BASE_URL}/api/v0.1/Supply?page=${page}`, getAuthHeader());
};

export const addNewSupply = async (data) => {
      return axios.post(`${BASE_URL}/api/v0.1/Supply/add`, data, getAuthHeader());
};

export const addSepcialSupply = async (data) => {
      return axios.post(`${BASE_URL}/api/v0.1/Supply/addSpecial`, data, getAuthHeader());
};

export const getSupplyByRange = async (data) => {
      return axios.get(`${BASE_URL}/api/v0.1/Supply/Range`, {params: data,...getAuthHeader(),});
};
export const getSupplyByUser = async (data) => {
      return axios.get(`${BASE_URL}/api/v0.1/Supply/byUser`, {params: data,...getAuthHeader(),});
};

export const deleteSupply = async (id) => {
      return axios.delete(`${BASE_URL}/api/v0.1/Supply/${id}`, getAuthHeader());
};

export const markDone = async (sellerId, from, to) => {
      return axios.put(`${BASE_URL}/api/v0.1/Supply/markCompleted`,{ sellerId, from, to },getAuthHeader());
};
