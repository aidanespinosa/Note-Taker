const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../utilities/util");

//Get route for retrieving all the notes
notes.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//Get route for specific note
notes.get("/notes/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((title) => title.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No title with that ID");
    });
});

//Delete route
notes.delete("/notes/:note_id", (req, res) => {
  const noteID = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((title) => title.note_id !== noteID);

      writeToFile("./db/db.json", result);

      res.json(`Item ${noteID} has been deleted 🗑️`);
    });
});

notes.post("/notes", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
