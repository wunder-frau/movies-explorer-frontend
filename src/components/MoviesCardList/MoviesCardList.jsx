import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({
  movies,
  isSaved,
  handleSaveMovie,
  savedMoviesId,
  deleteMovie,
}) => {
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const newMovies = movies.slice(0, moviesCount().count);
    setFiltredMovies(newMovies);
  }, [movies, windowSize]);

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setWindowSize(window.innerWidth);
    }, 500);
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  function moviesCount() {
    if (windowSize >= 1280) return { count: 12, more: 3 };
    if (windowSize >= 768) return { count: 8, more: 2 };
    if (windowSize >= 320) return { count: 5, more: 2 };
  }
  const onMoreButtonClick = () => {
    setFiltredMovies(
      movies.slice(0, (filtredMovies.length += moviesCount().more))
    );
  };

  return (
    <section className='movies'>
      <p className='movies__not-found'>Ничего не найдено</p>
      <ul className='movies__list'>
      {movies === "NotFound"
          ? ""
          : movies.reduce((filmsBatch, movie) => {
              if (filmsBatch.length < filtredMovies.length) {
                filmsBatch.push(
                  <MoviesCard
                    movie={movie}
                    isSaved={isSaved}
                    key={isSaved ? movie._id : movie.id}
                    handleSaveMovie={handleSaveMovie}
                    savedMoviesId={savedMoviesId}
                    deleteMovie={deleteMovie}
                  />
                );
              }
              return filmsBatch;
            }, [])}
      </ul>
      <button className='movies__button' type='button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;