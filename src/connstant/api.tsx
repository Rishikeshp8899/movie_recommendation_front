// src/api.js
const BASE_URL = "http://localhost:5000/api";

const API = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,

  // Bookings (movies)
  CREATE_BOOKING: `${BASE_URL}/movie`,
  GET_BOOKING_BY_ID: (id: string) => `${BASE_URL}/movie/${id}`,
  DELETE_BOOKING: (id: string) => `${BASE_URL}/movie/${id}`,

  // User-specific bookings (based on token's userId)
  GET_BOOKINGS_BY_USER: `${BASE_URL}/movie/user/bookings`,

  // Recommendations
  GET_RECOMMENDATIONS: `${BASE_URL}/movie/recommendations/`,
};

export { API };
