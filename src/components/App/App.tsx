import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import styles from "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast("No movies found for your request.");
      } else {
        setMovies(data);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = (clickedMovie: Movie) => {
    setMovie(clickedMovie);
  };

  const handleModalClose = () => {
    setMovie(null);
  };

  return (
    <div className={styles.App}>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleMovieClick} movies={movies} />
      )}
      {movie && <MovieModal onClose={handleModalClose} movie={movie} />}
    </div>
  );
}

export default App;
