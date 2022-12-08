import axios from 'axios';
const baseUrl = '/api/books';
axios.defaults.baseURL = `http://localhost:3003`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const toggleRead = async (id: string, bookToModify: {}) => {
  const response = await axios.put(`${baseUrl}/${id}`, bookToModify);
  return response.data;
};

const deleteBook = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
};

export default { getAll, toggleRead, deleteBook };
