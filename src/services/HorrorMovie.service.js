// this service will use the axios object in our http-common.js file to send HTTP requests and export CRUD functionality

import http from '../http-common';

const getAll = () => {
  return http.get('/horrorMovies');
};

const get = (id) => {
  return http.get(`/horrorMovies/${id}`);
};

const create = (data) => {
  return http.post('/horrorMovies', data);
};

const update = (id, data) => {
  return http.put(`/horrorMovies/${id}`, data);
};

const remove = (id) => {
  return http.put(`/horrorMovies/${id}`);
};

const removeAll = () => {
  return http.delete('/horrorMovies');
};

const findByTitle = (title) => {
  return http.get(`/horrorMovies?title=${title}`);
};

// by exporting the below me can call axios methods corresponding to their associated HTTP request
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
