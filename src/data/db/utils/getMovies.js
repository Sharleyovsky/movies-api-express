const readDbFile = require("../helpers/readDbFile");
const filterMoviesByDuration = require("../helpers/filterMoviesByDuration");

const getMovies = async (queries = null) => {
  try {
    let { movies } = await readDbFile();

    if (queries?.duration) {
      const duration = +queries.duration;
      movies = filterMoviesByDuration(movies, duration);
    }

    return movies;
  } catch (error) {
    return error;
  }
};

module.exports = getMovies;
