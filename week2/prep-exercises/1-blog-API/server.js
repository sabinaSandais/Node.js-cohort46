const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});



app.post("/blogs", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  fs.writeFileSync(title, content);
  res.send("ok");
});

app.listen(3000);
