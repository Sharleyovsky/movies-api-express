const getGenres = require("../utils/getGenres");
const isValid = require("../helpers/isValid");
const getAllMovies = require("../utils/getAllMovies");

const movie = async (req, res, next) => {
  try {
    const movie = req.body;
    const movieKeys = Object.keys(movie);
    const allowedMovieKeys = [
      "genres",
      "title",
      "year",
      "runtime",
      "director",
      "actors",
      "plot",
      "posterUrl",
    ];
    const requiredKeys = allowedMovieKeys.slice(0, 5);
    const allowedGenres = await getGenres();
    const movies = await getAllMovies();
    const CHARACTERS_LIMIT = 255;

    if (!isValid(allowedMovieKeys, movieKeys)) {
      throw new Error("Invalid keys!");
    }

    if (!isValid(movieKeys, requiredKeys)) {
      throw new Error("Missing required keys!");
    }

    if (!isValid(allowedGenres, movie.genres)) {
      throw new Error("Invalid genres!");
    }

    if (typeof movie.title !== "string") {
      throw new Error(
        `Property title should be a string but received: ${typeof movie.title}`
      );
    }

    if (movie.title.length > CHARACTERS_LIMIT) {
      throw new Error(
        `You have crossed characters limit! Limit: ${CHARACTERS_LIMIT} Property: title`
      );
    }

    if (typeof movie.year !== "number") {
      throw new Error(
        `Property year should be a number but received: ${typeof movie.year}`
      );
    }

    if (typeof movie.runtime !== "number") {
      throw new Error(
        `Property runtime should be a number but received: ${typeof movie.runtime}`
      );
    }

    if (typeof movie.director !== "string") {
      throw new Error(
        `Property director should be a string but received: ${typeof movie.director}`
      );
    }

    if (movie.director.length > CHARACTERS_LIMIT) {
      throw new Error(
        `You have crossed characters limit! Limit: ${CHARACTERS_LIMIT} Property: director`
      );
    }

    if (movie?.actors && typeof movie?.actors !== "string") {
      throw new Error(
        `Property actors should be a string but received: ${typeof movie.actors}`
      );
    }

    if (movie?.plot && typeof movie?.plot !== "string") {
      throw new Error(
        `Property plot should be a string but received: ${typeof movie.plot}`
      );
    }

    if (movie?.posterUrl && typeof movie?.posterUrl !== "string") {
      throw new Error(
        `Property posterUrl should be a string but received: ${typeof movie.posterUrl}`
      );
    }

    if (movies.find((movieDb) => movieDb?.title === movie.title)) {
      throw new Error(`Movie ${movie.title} already exists in the database`);
    }

    movie.id = movies.length + 1;
    res.movie = movie;
    next();
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
};

module.exports = movie;
