import { useEffect, useState } from "react";
import { url, base_url, API_key } from "./constants";
import MovieCard from "./components/MovieCard/MovieCard.jsx";
import "./App.css";

let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];

const App = () => {
  const [movies, setMovies] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState();

  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, [url_set]);

  const getData = (movieType) => {
    if (movieType == "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    }
    if (movieType == "Theatre") {
      url =
        base_url +
        "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
        API_key;
    }
    if (movieType == "Kids") {
      url =
        base_url +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        API_key;
    }
    if (movieType == "Drama") {
      url =
        base_url +
        "/discover/movie?with_genres=18&primary_release_year=2014" +
        API_key;
    }
    if (movieType == "Comedie") {
      url =
        base_url +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
        API_key;
    }
    setUrl(url);
  };
  const searchMovie = (evt) => {
    if (evt.key == "Enter") {
      url =
        base_url +
        "/search/movie?api_key=e778a222f0d3090ab9b3bb2dc8e75472&query=" +
        search;
      setUrl(url);
      setSearch(" ");
    }
  };

  return (
    <>
      <header className="header">
        <nav>
          <ul>
            {arr.map((value) => {
              return (
                <li>
                  <a
                    href="#"
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter movie name"
              className="input-text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyPress={searchMovie}
            />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
      </header>

      <div className="container center">
        {movies.length == 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })
        )}
      </div>
    </>
  );
};

export default App;
