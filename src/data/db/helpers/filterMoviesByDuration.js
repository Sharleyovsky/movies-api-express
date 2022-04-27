const filterMoviesByDuration = (movies, duration) => {
  if (!movies) {
    throw new Error("movies is not an array!");
  }

  if (typeof duration !== "number") {
    throw new Error("duration is not a number!");
  }

  return movies.filter(
    ({ runtime }) => +runtime >= duration - 10 && +runtime <= duration + 10
  );
};

module.exports = filterMoviesByDuration;
