const { writeFile } = require("fs").promises;
const { dbPath } = require("../config/config");
const readDbFile = require("../helpers/readDbFile");

const removeMovie = async (title) => {
  try {
    const db = await readDbFile();
    const movie = db.movies.find((movie) => movie.title === title);

    if (!movie) {
      throw new Error("Movie doesn't exist in the database!");
    }

    movie.splice(db.movies.indexOf(movie), 1);
    await writeFile(dbPath, JSON.stringify(db));
  } catch (error) {
    console.log(error);
  }
};

module.exports = removeMovie;
