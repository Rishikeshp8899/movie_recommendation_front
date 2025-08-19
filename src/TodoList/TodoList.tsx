import {  useState } from "react";
import AddTask from "../addTask/AddTask";
import "./Todolist.css"; // CSS file for the styling
import Header from "../Header/Header";
import ApiCall from "../service/ApiCall";
import { CheckResp } from "../auth/CheckResp";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
interface Movie {
  id: string;
  movie: string;
  url: string;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
 const [loading, setLoading] = useState(false);

  const handleBookShow = async (movieId: string) => {
    try {
       console.log("Show booked successfully:");
      const response = await ApiCall(
        {
          apiname: "CREATE_BOOKING",
          userData: { movieId: movieId },
        }
      );
    if (!CheckResp({ response })) {
      console.error("Invalid token");
      return;
    }
    setMovies((prevMovies) => prevMovies.filter(movie => String(movie.id) !== String(movieId)));

    console.log("Show booked successfully:", movies);
    alert("Show booked successfully!");
    
  } catch (error) {
    console.error("Error booking show:", error);
    alert("Failed to book show. Please try again.");
  }
  };

  return (
    <>
      <Header  homepage="/home"/>
      <div className="container-fluid vh-100 bg-black text-white p-3">
        <div className="row h-100">
          {/* Left: Add Task */}
          <div className="col-12 col-md-5 mb-3">
            <AddTask onTaskAdded={(text) =>{
              console.log("Task added:", text);
              setMovies(text.prediction || []);
            }} 
            spinner={setLoading} 
  loading={loading}
            />
          </div>

          {/* Right: Movie Grid */}
          <div className="col-12 col-md-7">
            {
               loading ? ( <LoadingSpinner />) : (
              movies.length === 0 ? <p>No movies available</p> :
              <>
                <h2 className="peacock-text mb-4">Movie List</h2>
                <div className="movie-grid" >
                  {movies.map((movie) => (
                    <div key={movie.id} className="login-card movie-card">
                  <img src={movie.url} alt={movie.movie} className="img-fluid" />
                  <h5 className="peacock-text mt-2">{movie.movie}</h5>
                  <button className="btn peacock-btn mt-2 text" onClick={() => handleBookShow(`${movie.id}`)}>
                    Book the Show
                  </button>
                </div>
              ))}
            </div>
              </>
               )
            }
          </div>
        </div>
      </div>
    </>
    );
}


