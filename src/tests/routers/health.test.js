const request = require("supertest");
const server = require("../../index");

describe("Test connection with server", () => {
  test("Should response with code 200", async () => {
    const response = await request(server).get("/healthCheck");
    expect(response.statusCode).toBe(200);
  });
});
