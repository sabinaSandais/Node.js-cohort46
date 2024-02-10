import request from "supertest";
import app from "../app.js";

describe("GET /", () => {
  it('responds with "Hello from backend to frontend!"', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello from backend to frontend!");
  });
});

describe("POST /weather", () => {
  it("responds with weather information when valid cityName is provided", async () => {
    const cityName = "London";
    const response = await request(app).post("/weather").send({ cityName });

    expect(response.status).toBe(200);
    expect(response.body.weatherText).toBeDefined();
  });

  it("responds with an error when no cityName is provided", async () => {
    const response = await request(app).post("/weather");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Please provide a valid cityName");
  });
});

// it('responds with an error when an invalid cityName is provided', async () => {
//   const cityName = 'InvalidCityName';
//   const response = await request(app)
//     .post('/weather')
//     .send({ cityName });

//   expect(response.status).toBe(200);
//   expect(response.body.weatherText).toBe('City is not found!');
// });;

// describe("POST /", () => {
//   it("Quick test", () => {
//     expect(1).toBe(1);
//   });
// });

// describe("GET /", () => {
//   it('responds with "Hello from backend to frontend!"', async () => {
//     const response = await request(app).get("/");
//     expect(response.status).toBe(200);
//     expect(response.text).toBe("Hello from backend to frontend!");
//   });
// });
