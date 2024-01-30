import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send("Please provide a valid cityName");
  } else {
    res.send(`You submitted:${cityName}`);
  }
 });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

