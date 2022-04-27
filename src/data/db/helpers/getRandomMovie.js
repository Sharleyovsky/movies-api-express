const getRandomNumber = require("../helpers/getRandomNumber");

const getRandomMovie = (movies) => {
  const randomNumber = getRandomNumber(0, movies.length - 1);

  return movies[randomNumber];
};

module.exports = getRandomMovie;
