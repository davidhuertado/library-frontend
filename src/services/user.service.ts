import axios from 'axios';
const baseUrl = '/api/users';
// For development
// axios.defaults.baseURL = `http://localhost:3003`;

const create = async (userData: { username: string; password: string }) => {
  const response = await axios.post(baseUrl, userData);

  return response.data;
};

export default { create };
