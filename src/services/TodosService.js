import axios from 'axios';
const instance = axios.create({
  baseURL: " https://5fa97367c9b4e90016e6a7ec.mockapi.io/api",
});

 export const getAll = () => {
  return instance.get("/todos");
};

export const get = id => {
  return instance.get(`/todos/${id}`);
};

export const create = data => {
  return instance.post("/todos", data);
};

export const update = (id, data) => {
  return instance.put(`/todos/${id}`, data);
};

export const remove = id => {
  return instance.delete(`/todos/${id}`);
};

export const removeAll = () => {
  return instance.delete(`/todos`);
};

export const findByTitle = title => {
  return instance.get(`/todos?title=${title}`);
};

export default instance;