const dbJSON = require("../db/db.json");
const fs = require("fs");
const { uuid } = require("uuidv4");



module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.send(dbJSON);
    });

    app.post("/api/notes", function (req, res) {

        let noteId = uuid();
        let newNote = {
            id: noteId,
            title: req.body.title,
            text: req.body.text
        };

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            const existingNotes = JSON.parse(data);

            existingNotes.push(newNote);

            fs.writeFile("./db/db.json", JSON.stringify(existingNotes, null, 2), err => {
                if (err) throw err;
                res.send(dbJSON);
                console.log("Your note has been created!")
            });
        });
        // res.send(dbJSON);
    });

    app.delete("/api/notes/:id", (req, res) => {

        let noteId = req.params.id;

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            const existingNotes = JSON.parse(data);
            const newExistingNotes = existingNotes.filter(note => note.id != noteId);

            fs.writeFile("./db/db.json", JSON.stringify(newExistingNotes, null, 2), err => {
                if (err) throw err;
                res.send(dbJSON);
                console.log("Note has been deleted!")
            });
        });
    });
};