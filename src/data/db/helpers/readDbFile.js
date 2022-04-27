const { readFile } = require("fs").promises;
const { dbPath } = require("../../../config/config");

const readDbFile = async () => {
  try {
    const data = await readFile(dbPath);

    return await JSON.parse(data);
  } catch (error) {
    return error;
  }
};

module.exports = readDbFile;
