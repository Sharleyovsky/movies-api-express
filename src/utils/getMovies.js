const readDbFile = require("./readDbFile");
const lodash = require("lodash");
const filterMoviesByDuration = require("./filterMoviesByDuration");
const filterMoviesByGenres = require("./filterMoviesByGenres");
const getRandomMovie = require("./getRandomMovie");
const removeDuplicates = require("./removeDuplicates");

const getMovies = async (queries = null) => {
  try {
    let { movies } = await readDbFile();

    if (lodash.isEmpty(movies)) {
      return [];
    }

    movies = removeDuplicates(movies);

    if (lodash.isEqual(queries, {}) || !queries) {
      return getRandomMovie(movies);
    }

    if (queries?.duration) {
      movies = filterMoviesByDuration(movies, +queries.duration);
    }

    if (
      Object.keys(queries).includes("duration") &&
      Object.keys(queries).length === 1
    ) {
      return getRandomMovie(movies);
    }

    if (queries?.genres) {
      movies = filterMoviesByGenres(movies, queries.genres);
    }

    return movies;
  } catch (error) {
    console.log(error.toString());
  }
};

module.exports = getMovies;
