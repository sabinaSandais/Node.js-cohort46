import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("GET /", () => {
  it('responds with "Hello from backend to frontend!"', async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello from backend to frontend!");
  });
});

describe("POST /weather", () => {
  it("responds with weather information when valid cityName is provided", async () => {
    const cityName = "London";
    const response = await request.post("/weather").send({ cityName });

    expect(response.status).toBe(200);
    expect(response.body.weatherText).toBeDefined();
  });

  it("should return a 400 status code if cityName is missing", async () => {
    const response = await request.post("/weather");

    expect(response.status).toBe(400);
  });

  it("should return an error message if cityName is gibberish", async () => {
    const cityName = "abcdefgh";

    const response = await request.post("/weather").send({ cityName });

    expect(response.status).toBe(200); // Assuming the API responds with 200 for gibberish cityNames
    expect(response.body.weatherText).toEqual("City is not found!");
  });
});
