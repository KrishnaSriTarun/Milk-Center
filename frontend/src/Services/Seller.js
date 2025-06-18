import axios from "axios";

export const sellerLogin = async (data) => {
      return axios.post('http://localhost:3000/api/v0.1/login',data);
}