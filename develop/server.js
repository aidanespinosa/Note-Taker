const express = require("express");
const path = require("path");
const api = require("./api/notes.js");

const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static("public"));

//Get route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/html/index.html"))
);
//Get route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/html/notes.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
