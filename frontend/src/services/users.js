import axios from "axios";

const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createUser = async (user) => {
  await axios.post(baseUrl, user);
}

export default { createUser, getAll };
