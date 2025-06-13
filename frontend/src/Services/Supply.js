import axios from "axios";

export const getAllSupply=async (page=1)=>{
      return axios.get(`http://localhost:3000/api/v0.1/Supply?page=${page}`);
}

export const addNewSupply=async (data)=>{
      console.log(data)
      return await axios.post("http://localhost:3000/api/v0.1/Supply/add",data);
}

export const getSupplyByRange=async (data)=>{
      return await axios.get("http://localhost:3000/api/v0.1/Supply/Range",{params:data});
}

export const deleteSupply=async (id)=>{
      return await axios.get(`http://localhost:3000/api/v0.1/Supply/${id}`);
}
