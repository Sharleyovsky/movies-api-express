const readDbFile = require("./readDbFile");

const getAllMovies = async () => {
  const { movies } = await readDbFile();

  return movies;
};

module.exports = getAllMovies;
