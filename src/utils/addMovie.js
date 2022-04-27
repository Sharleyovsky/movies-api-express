const { writeFile } = require("fs").promises;
const { dbPath } = require("../config/config");
const readDbFile = require("../helpers/readDbFile");

const addMovie = async (movie) => {
  try {
    const db = await readDbFile();

    db.movies.push(movie);
    await writeFile(dbPath, JSON.stringify(db));
  } catch (error) {
    console.log(error.toString());
  }
};

module.exports = addMovie;
