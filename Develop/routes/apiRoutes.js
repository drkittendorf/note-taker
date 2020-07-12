let notes = require("../db/db.json");
const { uuid } = require('uuidv4');
const fs = require('fs');

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    //assign each new note a unique id
    req.body.id = uuid();
    //push new note to notes array and write new array over old one in db.json file
    notes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
      if (err) throw err;
    });
    res.json(req.body);
  });

  app.delete('/api/notes/:id', function (req, res) {
    //functions to identify and remove note with id requested to delete
    //identify requested note to delete
    let findId = (noteObject) => {
      if (noteObject.id != req.params.id) {
        return true
      } else {
        return false
      }
    }
    //filter requested note out of notes array
    notes = notes.filter(findId);
    //Rewrite db.json file with new notes array (after deletion)
    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
      if (err) throw err;
    });

    res.send('Got a DELETE request at /api/notes/:id')
  })
}