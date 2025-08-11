// src/api.js
const BASE_URL = "https://todo-app-backend-9gn5.onrender.com/api";

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

