import axios from "axios";

const baseUrl = "/api/books";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const config = {
  headers: {
    Authorization: token,
  },
};

const getAll = async () => {
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const addToShelf = async (id) => {
  await axios.post(`${baseUrl}/${id}`, {}, config);
}

const removeFromShelf = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config);
}

export default { setToken, addToShelf, getAll, removeFromShelf };
