const express = require("express");
const { port } = require("./config/config");
const healthRouter = require("./routers/health");

const app = express();

app.use(express.json());
app.use(healthRouter);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
