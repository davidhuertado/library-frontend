import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(baseUrl, credentials);

  return response;
};

export default { login };
