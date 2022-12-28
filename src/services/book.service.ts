import axios from 'axios';
const baseUrl = '/api/books';
//For development
// axios.defaults.baseURL = `http://localhost:3003`;

let token: null | string = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (bookData: {
  title: string;
  author: string;
  year: string;
  read: boolean;
  user: string;
}) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, bookData, config);

  return response.data;
};

const toggleRead = async (id: string, bookToModify: {}) => {
  const response = await axios.put(`${baseUrl}/${id}`, bookToModify);
  return response.data;
};

const deleteBook = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);

  return;
};

export default { getAll, toggleRead, deleteBook, create, setToken };
