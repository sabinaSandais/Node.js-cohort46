import express from "express";
import fetch from "node-fetch";
import { keys } from "./sources/keys.js";
const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send("Please provide a valid cityName");
    return;
  }

  try {
    const response = await fetch(
      `${keys.BASE_URL}/weather?q=${cityName}&appid=${keys.API_KEY}`
    );

    if (!response.ok) {
      res.status(response.status).send({ weatherText: "City is not found!" });
      return;
    }

    const {
      main: { temp },
    } = await response.json();
    res.send({ weatherText: `Weather in ${cityName}: ${temp}K` });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
