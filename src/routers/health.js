const express = require("express");

const healthRouter = express.Router();

healthRouter.get("/healthCheck", async (req, res) => {
  try {
    res.status(200).send({ message: "Server is running!" });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong while checking server status!",
      error,
    });
  }
});

module.exports = healthRouter;
