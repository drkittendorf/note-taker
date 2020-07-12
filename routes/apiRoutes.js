let notesDb = require('../db/db.json');
const { uuid } = require('uuidv4');
const fs = require('fs');
// api/notes hits the notes.html via htmlRoutes
module.exports = function (app) {
  app.get('/api/notes', function (req, res) {
    res.json(notesDb);
  });

  app.post('/api/notes', function (req, res) {
    //assigns ids using uuidv4 packet
    req.body.id = uuid();
    //push new note to notes array and rewrite object
    notesDb.push(req.body);
    fs.writeFile("notesDb", JSON.stringify(notesDb), function (err) {
      if (err) throw err;
    });
    res.json(req.body);
  });

  app.delete('/api/notes/:id', function (req, res) {
    let findNoteById = (noteObject) => {
      if (noteObject.id != req.params.id) {
        return true
      } else {
        return false
      }
    }

    notesDb = notesDb.filter(findNoteById);
    //Delete and rewrite db.json file with new notes array
    fs.writeFile('./db/db.json', JSON.stringify(notesDb), function (err) {
      if (err) throw err;
    });

    res.send('DELETE request at /api/notes/:id')
  })
}