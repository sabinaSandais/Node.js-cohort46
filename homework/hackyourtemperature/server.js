import express from "express";

const app = express();

const port = 3000;
//Middleware 
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;

  res.send(`You submitted:${cityName}`);
});

app.listen(port, () => console.log(`Server started on port ${port}`));