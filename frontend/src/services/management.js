import axios from "axios";

const baseUrl = "/api/manage";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const config = {
  headers: {
    Authorization: token,
  },
};

const createBook = async (book) => {
  const response = await axios.post(baseUrl, book, config);
  return response.data;
}

const deleteBook = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config);
}

export default { setToken, createBook, deleteBook };
