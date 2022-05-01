const readDbFile = require("../helpers/readDbFile");
const lodash = require("lodash");
const filterMoviesByDuration = require("../helpers/filterMoviesByDuration");
const filterMoviesByGenres = require("../helpers/filterMoviesByGenres");
const getRandomMovie = require("../helpers/getRandomMovie");
const removeDuplicates = require("../helpers/removeDuplicates");

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
