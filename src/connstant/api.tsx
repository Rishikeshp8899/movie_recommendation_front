// src/api.js
const BASE_URL = "http://localhost:5000/api";

const API = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
    CREATE_TODO: `${BASE_URL}/todos`,
  GET_TODOS: `${BASE_URL}/todos`,
  GET_TODO_BY_ID: (id:string) => `${BASE_URL}/todos/${id}`,
  UPDATE_TODO: (id:string) => `${BASE_URL}/todos/${id}`,
  DELETE_TODO: (id:string) => `${BASE_URL}/todos/${id}`,
};

export {
API
}

