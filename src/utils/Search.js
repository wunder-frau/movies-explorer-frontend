function Search(movies, keyWord, isShort) {
  return movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(keyWord.toLowerCase()) && (!isShort || isShort && movie.duration < 40)
  );
}

export default Search;
