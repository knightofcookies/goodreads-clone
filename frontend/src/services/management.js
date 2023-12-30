import axios from "axios";

const baseUrl = "/api/manage";

let token = null;
let config = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config = {
    headers: {
      Authorization: token,
    },
  };
};

const createBook = async (book) => {
  const response = await axios.post(baseUrl, book, config);
  return response.data;
};

const deleteBook = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config);
};

const getContributions = async () => {
  const response = await axios.get(`${baseUrl}/mycontributions`, config);
  return response.data;
};

export default { setToken, createBook, deleteBook, getContributions };
