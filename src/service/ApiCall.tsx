import axios from "axios";
import {API }from "../connstant/api";

type TodoPayload = { id?: string; [key: string]: unknown }; // for todo APIs
type LoginPayload = { username: string; password: string }; // for login API
type RegisterPayload = { username: string; email: string; password: string }; // for register API

type ApiPayloads =
  | LoginPayload
  | RegisterPayload
  | TodoPayload;

interface Props<T extends ApiPayloads = ApiPayloads> {
  apiname: keyof typeof API;
  userData?: T;
}

const ApiCall = <T extends ApiPayloads = ApiPayloads>({ apiname, userData }: Props<T>) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  switch (apiname) {
    case "LOGIN":
      return axios.post(API.LOGIN, userData as LoginPayload, { headers });
    case "REGISTER":
      return axios.post(API.REGISTER, userData as RegisterPayload, { headers });
    case "GET_TODOS":
      return axios.get(API.GET_TODOS, { headers });
    case "CREATE_TODO":
      return axios.post(API.CREATE_TODO, userData as TodoPayload, { headers });
   case "GET_TODO_BY_ID": {
  const id = (userData as TodoPayload)?.id;
  if (id === undefined) throw new Error("GET_TODO_BY_ID requires an 'id'");
  return axios.get(API.GET_TODO_BY_ID(id), { headers });
}
case "UPDATE_TODO": {
  const id = (userData as TodoPayload)?.id;
  if (id === undefined) throw new Error("UPDATE_TODO requires an 'id'");
  return axios.put(API.UPDATE_TODO(id), userData, { headers });
}
case "DELETE_TODO": {
  const id = (userData as TodoPayload)?.id;
  if (id === undefined) throw new Error("DELETE_TODO requires an 'id'");
  return axios.delete(API.DELETE_TODO(id), { headers });
}
    default:
      throw new Error(`Unknown API name`);
  }
};

export default ApiCall;
