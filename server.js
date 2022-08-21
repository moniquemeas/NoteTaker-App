const fs = require('fs');
const express = require('express')
const notes = require('./db/db.json');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});




app.post('/api/notes', (req, res) => {
    req.body.id=notes.length.toString();

    // if the data in the body is not correct, send 400 error
    if(!validateNote(req.body)){
        res.status(400).send('Note is not in a correct format.')
    } else {
        // add note to json file and animals array in this function
  const note = createdNewNote(req.body, notes);
  res.json(note);
    }
});

function createdNewNote(body, notesArray){
    const note = body;

    notesArray.push(note);
    //write file to notes.json
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify({notes: notesArray}, null, 2)
    );


    return note;
};
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !=='string') {
        return false;
    }
    return true;
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (re, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));