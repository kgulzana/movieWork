import React from "react";
import "../../App.css";

const MovieCard = ({ movie }) => {
  let IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div className="movie center">
        <img src={IMAGE_PATH + movie.poster_path} className="poster" alt="" />
        <div className="movie-details">
          <div className="box">
            <h4 className="title">{movie.title}</h4>
            <p className="rating">{movie.vote_average}</p>
          </div>
          <div className="overview">
            <h1>overview</h1>
            {movie.overview}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
