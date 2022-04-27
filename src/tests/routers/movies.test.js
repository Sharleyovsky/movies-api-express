const request = require("supertest");
const { app, server } = require("../../index");
const getAllMovies = require("../../utils/getAllMovies");
const removeMovie = require("../../utils/removeMovie");

const testMovies = [
  {
    title: "A Separation",
    year: 2011,
    runtime: 123,
    genres: ["Drama", "Mystery"],
    director: "Asghar Farhadi",
    actors: "Peyman Moaadi, Leila Hatami, Sareh Bayat, Shahab Hosseini",
    plot: "A married couple are faced with a difficult decision - to improve the life of their child by moving to another country or to stay in Iran and look after a deteriorating parent who has Alzheimer's disease.",
    posterUrl:
      "http://ia.media-imdb.com/images/M/MV5BMTYzMzU4NDUwOF5BMl5BanBnXkFtZTcwMTM5MjA5Ng@@._V1_SX300.jpg",
  },
  {
    title: "The Big Short",
    year: 2015,
    runtime: 130,
    genres: ["Biography", "Comedy", "Drama"],
    director: "Adam McKay",
    actors: "Ryan Gosling, Rudy Eisenzopf, Casey Groves, Charlie Talbert",
    plot: "Four denizens in the world of high-finance predict the credit and housing bubble collapse of the mid-2000s, and decide to take on the big banks for their greed and lack of foresight.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
  },
  {
    title: "Beetlejuice",
    year: 1988,
    runtime: 92,
    genres: ["Comedy", "Fantasy"],
    director: "Tim Burton",
    actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
    plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg",
  },
];

afterAll(() => {
  server.close();
});

describe("Test movies router endpoints", () => {
  test("Should add movie to the database", async () => {
    const response = await request(app).post("/movies/add").send(testMovies[0]);
    const movie = response.body.movie;

    await expect(response.statusCode).toBe(201);
    await expect(movie).toEqual({
      ...testMovies[0],
      id: (await getAllMovies()).length,
    });
    await removeMovie(movie.title);
  });
});
