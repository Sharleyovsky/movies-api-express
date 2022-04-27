const express = require("express");
const getMovies = require("../utils/getMovies");
const movie = require("../middlewares/movie");
const addMovie = require("../utils/addMovie");

const moviesRouter = new express.Router();
const prefix = "/movies";

moviesRouter.get(prefix, async (req, res) => {
  try {
    const movies = await getMovies(req.query);
    res.send(movies);
  } catch (error) {
    res.status(400).send(error);
  }
});

moviesRouter.post(`${prefix}/add`, movie, async (req, res) => {
  try {
    const movie = res.movie;
    await addMovie(movie);

    res.status(201).send({
      message: `Movie ${res.movie.title} was added to the database!`,
      movie,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = moviesRouter;
