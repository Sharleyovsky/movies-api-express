const { readFile } = require("fs").promises;
const { dbPath } = require("../config/config");
const lodash = require("lodash");

const readDbFile = async () => {
  try {
    const data = await readFile(dbPath);
    const movies = await JSON.parse(data);

    return lodash.uniq(movies);
  } catch (error) {
    return error;
  }
};

module.exports = readDbFile;
