const request = require("supertest");
const { app, server } = require("../../index");
const getAllMovies = require("../../utils/getAllMovies");
const removeMovie = require("../../utils/removeMovie");
const testMovies = require("../dummyData/testMovies");

const prefix = "/movies";

afterAll(async () => {
  await server.close();
  await removeMovie(testMovies[0].title);
});

describe("Test movies router endpoints", () => {
  test("Should respond with code 200 and random movie", async () => {
    const response = await request(app).get(prefix);
    await expect(response.statusCode).toBe(200);
    await expect(response.body).toHaveLength(1);
  });

  test("Should respond with code 200 and random movie with right duration", async () => {
    const duration = 90;
    const response = await request(app).get(`${prefix}?duration=${duration}`);
    await expect(response.statusCode).toBe(200);
    await expect(response.body).toHaveLength(1);
    await expect(+response.body[0].runtime).toBeGreaterThanOrEqual(80);
    await expect(+response.body[0].runtime).toBeLessThanOrEqual(100);
  });

  test("Should respond with code 200 and right genres", async () => {
    const response = await request(app).get(
      `${prefix}?genres[]=Drama&genres[]=Comedy`
    );
    await expect(response.statusCode).toBe(200);

    const genres = ["Drama", "Comedy"];
    for (const movie of response.body) {
      await expect(genres.some((genre) => movie.genres.includes(genre))).toBe(
        true
      );
    }
  });

  test("Should respond with code 201 and add movie to the database", async () => {
    const response = await request(app)
      .post(`${prefix}/add`)
      .send(testMovies[0]);
    const movie = response.body.movie;

    await expect(response.statusCode).toBe(201);
    await expect(movie).toEqual({
      ...testMovies[0],
      id: (await getAllMovies()).length,
    });
  });

  test("Should respond with code 400 and duplicate error message", async () => {
    const response = await request(app)
      .post(`${prefix}/add`)
      .send(testMovies[0]);
    await expect(response.statusCode).toBe(400);
    await expect(response.body.message).toBe(
      `Error: Movie ${testMovies[0].title} already exists in the database`
    );
  });

  test("Should respond with code 400 and string error message", async () => {
    const response = await request(app)
      .post(`${prefix}/add`)
      .send(testMovies[3]);
    await expect(response.statusCode).toBe(400);
    await expect(response.body.message).toBe(
      `Error: Property year should be a number but received: ${typeof testMovies[3]
        .year}`
    );
  });

  test("Should respond with code 400 and limit error message", async () => {
    const response = await request(app)
      .post(`${prefix}/add`)
      .send(testMovies[1]);
    await expect(response.statusCode).toBe(400);
    await expect(response.body.message).toBe(
      `Error: You have crossed characters limit! Limit: 255 Property: title`
    );
  });

  test("Should respond with code 400 and number error message", async () => {
    const response = await request(app)
      .post(`${prefix}/add`)
      .send(testMovies[4]);
    await expect(response.statusCode).toBe(400);
    await expect(response.body.message).toBe(
      `Error: Property title should be a string but received: ${typeof testMovies[4]
        .title}`
    );
  });

  test("Should respond with code 400 and genres error message", async () => {
    const response = await request(app)
      .post(`${prefix}/add`)
      .send(testMovies[5]);
    await expect(response.statusCode).toBe(400);
    await expect(response.body.message).toBe(`Error: Invalid genres!`);
  });

  test("Should respond with code 400 and required keys error message", async () => {
    const response = await request(app)
      .post(`${prefix}/add`)
      .send(testMovies[6]);
    await expect(response.statusCode).toBe(400);
    await expect(response.body.message).toBe(`Error: Missing required keys!`);
  });

  test("Should respond with code 400 and invalid keys error message", async () => {
    const response = await request(app)
      .post(`${prefix}/add`)
      .send(testMovies[7]);
    await expect(response.statusCode).toBe(400);
    await expect(response.body.message).toBe(`Error: Invalid keys!`);
  });
});
