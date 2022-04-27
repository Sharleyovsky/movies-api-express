const request = require("supertest");
const { app, server } = require("../../index");

afterAll(() => {
  server.close();
});

describe("Test connection with server", () => {
  test("Should response with code 200", async () => {
    const response = await request(app).get("/healthCheck");
    expect(response.statusCode).toBe(200);
  });
});
