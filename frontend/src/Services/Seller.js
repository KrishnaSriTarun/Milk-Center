import axios from "axios";

export const sellerLogin = async (data) => {
      return axios.post('http://localhost:3000/api/v0.1/login',data);
}

export const sellerRegister = async (data) => {
      return axios.post('http://localhost:3000/api/v0.1/register',data,{headers:{Authorization:`Bearer ${localStorage.getItem("sellerToken")}`}});
}

export const sellerData = async () => {
      return axios.get('http://localhost:3000/api/v0.1/user',{headers:{Authorization:`Bearer ${localStorage.getItem("sellerToken")}`}});
}