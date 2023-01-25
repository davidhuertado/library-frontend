import axios from 'axios';
const baseUrl = '/api/login';
//For development
// axios.defaults.baseURL = `http://localhost:3003`;

const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(baseUrl, credentials);

  return response.data;
};

export default { login };
