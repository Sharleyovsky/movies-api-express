const readDbFile = require("../helpers/readDbFile");
const filterMoviesByDuration = require("../helpers/filterMoviesByDuration");
const filterMoviesByGenres = require("../helpers/filterMoviesByGenres");

const getMovies = async (queries = null) => {
  try {
    let { movies } = await readDbFile();

    if (queries?.duration) {
      const duration = +queries.duration;
      movies = filterMoviesByDuration(movies, duration);
    }

    if (queries?.genres) {
      const genres = queries.genres;
      movies = filterMoviesByGenres(movies, genres);
    }

    return movies;
  } catch (error) {
    return error;
  }
};

module.exports = getMovies;
