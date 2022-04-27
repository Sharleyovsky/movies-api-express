const express = require("express");
const { port } = require("./config/config");
const healthRouter = require("./routers/health");
const moviesRouter = require("./routers/movies");

const app = express();

app.use(express.json());
app.use(healthRouter);
app.use(moviesRouter);

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = { app, server };
