import axios from 'axios';
const baseUrl = '/api/books';
axios.defaults.baseURL = `http://localhost:3003`;

const getAll = async () => {
  const { data: books } = await axios.get(baseUrl);
  return books;
};

export default { getAll };
