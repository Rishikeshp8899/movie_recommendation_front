import axios from "axios";
import { API } from "../connstant/api";

// Payloads for different APIs
type BookingPayload = { id?: string; movieId?: string; userId?: string };
type LoginPayload = { username: string; password: string };
type RegisterPayload = { username: string; email: string; password: string };
type RecommendationsPayload = {  query?: string };
type deletePayload = { id: string; };

type ApiPayloads = LoginPayload | RegisterPayload | BookingPayload | RecommendationsPayload | deletePayload;

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
      return axios.post(API.LOGIN, userData as LoginPayload);

    case "REGISTER":
      return axios.post(API.REGISTER, userData as RegisterPayload);

    case "CREATE_BOOKING":
      return axios.post(API.CREATE_BOOKING, userData as BookingPayload, { headers });

    case "GET_BOOKING_BY_ID": {
      const id = (userData as BookingPayload)?.id;
      if (!id) throw new Error("GET_BOOKING_BY_ID requires an 'id'");
      return axios.get(API.GET_BOOKING_BY_ID(id), { headers });
    }

    case "DELETE_BOOKING": {
      const id = (userData as deletePayload)?.id;
      if (!id) throw new Error("DELETE_BOOKING requires an 'id'");
      return axios.delete(API.DELETE_BOOKING(id), { headers });
    }

    case "GET_BOOKINGS_BY_USER": {
      return axios.get(API.GET_BOOKINGS_BY_USER, { headers });
    }

    case "GET_RECOMMENDATIONS": {
      return axios.post(API.GET_RECOMMENDATIONS,userData as RecommendationsPayload, { headers });
    }

    default:
      throw new Error(`Unknown API name: ${apiname}`);
  }
};

export default ApiCall;
