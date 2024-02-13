import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).send("Please provide a valid cityName");
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${keys.API_KEY}`
    );
    const data = await response.json();

    if (data.cod === 200) {
      const temperature = data.list[0].main.temp;
      res.send({ weatherText: `Weather in ${cityName}: ${temperature}K` });
    } else {
      res.send({ weatherText: "City is not found!" });
      return;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default app;
