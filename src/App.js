import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "./constants";
import MovieCard from "./components/MovieCard/MovieCard.jsx";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const fetchPopularProducts = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
  };

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchPopularProducts(searchKey);
  };

  return (
    <div className="movie_page">
      <header>
        <div className={"header-content center"}>
          <h1>The most popular movies</h1>
          <form onSubmit={searchMovies}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit">Search!</button>
          </form>
        </div>
      </header>

      <div className="container center">{renderMovies()}</div>
    </div>
  );
}

export default App;
