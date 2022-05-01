const readDbFile = require("./readDbFile");

const getGenres = async () => {
  const { genres } = await readDbFile();

  return genres;
};

module.exports = getGenres;
