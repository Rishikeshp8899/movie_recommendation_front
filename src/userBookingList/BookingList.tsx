// MovieList.jsx
import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../Header/Header";
import "./BookingList.css";
import ApiCall from "../service/ApiCall";
import { CheckResp } from "../auth/CheckResp";


interface Movie {
  id: string;
  movie: string;
  url: string;
}

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
      const fetchData = async () => {
        try {
          const response = await ApiCall({
            apiname: "GET_BOOKINGS_BY_USER",
          });
          console.log("Response from API:", response);
          if (!CheckResp({ response })) {
            // Handle invalid token case
            console.error("Invalid token");
            return;
          }
          setMovies(response.data.response|| []);
        } catch (error) {
          setMovies([]);
      console.error("Error fetching movie bookings:", error);
    }
};
useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
   const response = ApiCall({
      apiname: "DELETE_BOOKING",
      userData: { id },
    });
if (!CheckResp({ response })) {
  console.error("Invalid token");
  return;
}
setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  return (
    <>
      <Header  booking="/bookings" />
      {
        movies.length > 0 ? (
          <div className="movie-list-container">
            <h2 className="peacock-text">My Movie List</h2>
            <div className="movie-grid">
            {movies.map((movie) => (
          <div key={movie.id} className="login-card movie-card">
            <img src={movie.url} alt={movie.movie} className="movie-img" />
            <span className="movie-title">{movie.movie}</span>
            <button
              className="peacock-btn delete-btn"
              onClick={() => handleDelete(movie.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="no-movies">
      <p>No movies found.</p>
    </div>
  )
  }
    </>
  
  );
};

export default MovieList;
