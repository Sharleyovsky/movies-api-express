const express = require("express");
const getMovies = require("../utils/getMovies");

const moviesRouter = new express.Router();
const prefix = "/movies";

moviesRouter.get(prefix, async (req, res) => {
  try {
    const movies = await getMovies(req.body);
    res.send(movies);
  } catch (error) {
    console.log(error);
  }
});

module.exports = moviesRouter;
