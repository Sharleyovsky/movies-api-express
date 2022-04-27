const filterMoviesByGenres = (movies, genres) => {
  if (!movies) {
    throw new Error("movies is not an array!");
  }

  if (!genres) {
    throw new Error("genres is not an array!");
  }

  const filteredMovies = movies.filter((movie) =>
    genres.some((genre) => movie.genres.includes(genre))
  );

  return filteredMovies.sort((a, b) => {
    if (a.genres.length < b.genres.length) {
      return 1;
    }

    if (a.genres.length > b.genres.length) {
      return -1;
    }

    return 0;
  });
};

module.exports = filterMoviesByGenres;
