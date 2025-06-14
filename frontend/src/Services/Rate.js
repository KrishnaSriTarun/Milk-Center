import axios from "axios";

export const getlatestRate = async (page = 1) => {
      return axios.get('http://localhost:3000/api/v0.1/getRate');
}

export const updateRate = async (id, data) => {
      return await axios.put(`http://localhost:3000/api/v0.1/updateRate/${id}`, data);
};