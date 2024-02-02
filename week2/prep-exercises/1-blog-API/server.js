const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  fs.writeFileSync(`${title}.json`, JSON.stringify({ title, content }));
  res.status(201).json({ message: "Blog post created successfully" });
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
