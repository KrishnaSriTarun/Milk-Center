import axios from "axios";

export const getAllSupply = async (page = 1) => {
      return axios.get(`http://localhost:3000/api/v0.1/Supply?page=${page}`);
}

export const addNewSupply = async (data) => {
      console.log(data)
      return await axios.post("http://localhost:3000/api/v0.1/Supply/add", data);
}
export const addSepcialSupply = async (data) => {
      console.log(data)
      return await axios.post("http://localhost:3000/api/v0.1/Supply/addSpecial", data);
}

export const getSupplyByRange = async (data) => {
      return await axios.get("http://localhost:3000/api/v0.1/Supply/Range", { params: data });
}

export const deleteSupply = async (id) => {
      return await axios.delete(`http://localhost:3000/api/v0.1/Supply/${id}`);
}
export const markDone = async (sellerId, from, to) => {
      return await axios.put(`http://localhost:3000/api/v0.1/Supply/markCompleted`, { sellerId, from, to });
};
