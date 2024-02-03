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

app.put("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const content = req.body.content;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const isBlogExist = fs.existsSync(title);

  if (isBlogExist) {
    fs.writeFileSync(title, content);
    res.send("ok");
  } else {
    res.status(404);
    res.send("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const isBlogExist = fs.existsSync(title);
  if (isBlogExist) {
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.status(404);
    res.send("File does not exist");
  }
});

app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const isBlogExist = fs.existsSync(title);
  if (isBlogExist) {
    const blogContent = fs.readFileSync(title, "utf-8");
    const response = { title, content: blogContent };
    res.status(200);
    res.send(response);
  } else {
    res.status(404);
    res.send("file does not exist");
  }
});

app.listen(3000);
