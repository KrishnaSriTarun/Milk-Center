import axios from "axios";

export const getAllSupply = async (page = 1) => {
      return axios.get(`http://localhost:3000/api/v0.1/Supply?page=${page}`, { headers: { Authorization: `Bearer ${localStorage.getItem("sellerToken")}` } });
}

export const addNewSupply = async (data) => {
      return await axios.post("http://localhost:3000/api/v0.1/Supply/add", data, { headers: { Authorization: `Bearer ${localStorage.getItem("sellerToken")}` } });
}
export const addSepcialSupply = async (data) => {
      return await axios.post("http://localhost:3000/api/v0.1/Supply/addSpecial", data, { headers: { Authorization: `Bearer ${localStorage.getItem("sellerToken")}` } });
}

export const getSupplyByRange = async (data) => {
      return await axios.get("http://localhost:3000/api/v0.1/Supply/Range", {params: data,headers: {Authorization: `Bearer ${localStorage.getItem("sellerToken")}`}});
};


export const deleteSupply = async (id) => {
      return await axios.delete(`http://localhost:3000/api/v0.1/Supply/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("sellerToken")}` } });
}
export const markDone = async (sellerId, from, to) => {
      return await axios.put(`http://localhost:3000/api/v0.1/Supply/markCompleted`, { sellerId, from, to }, { headers: { Authorization: `Bearer ${localStorage.getItem("sellerToken")}` } });
};
