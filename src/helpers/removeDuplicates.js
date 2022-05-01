const removeDuplicates = (movies) => {
  movies = movies.filter(
    (movie, index, self) =>
      index ===
      self.findIndex((el) => el.id === movie.id || el.title === movie.title)
  );

  movies.forEach((movie) => {
    movie.id = movies.indexOf(movie) + 1;
  });

  return movies;
};

module.exports = removeDuplicates;
