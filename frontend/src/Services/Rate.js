import axios from "axios";

export const getlatestRate = async () => {
      return axios.get('http://localhost:3000/api/v0.1/getRate',{headers:{Authorization:`Bearer ${localStorage.getItem("sellerToken")}`}});
}

export const updateRate = async (id, data) => {
      return await axios.put(`http://localhost:3000/api/v0.1/updateRate/${id}`, data,{headers:{Authorization:`Bearer ${localStorage.getItem("sellerToken")}`}});
};