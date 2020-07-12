let notes = require("../db/db.json");
const { uuid } = require('uuidv4');
const fs = require('fs');

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    //assigns ids
    req.body.id = uuid();
    //push new note to notes array and rewrite array
    notes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
      if (err) throw err;
    });
    res.json(req.body);
  });

  app.delete('/api/notes/:id', function (req, res) {
    let findId = (noteObject) => {
      if (noteObject.id != req.params.id) {
        return true
      } else {
        return false
      }
    }

    notes = notes.filter(findId);
    //Delete and rewrite db.json file with new notes array
    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
      if (err) throw err;
    });

    res.send('Got a DELETE request at /api/notes/:id')
  })
}