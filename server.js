const fs = require('fs');
const express = require('express')
let {notes} = require('./db/db.json');
console.log("Notes right below")
console.log(notes)
const path = require('path');
const nodemon = require('nodemon');
const app = express();
const PORT = process.env.PORT || 3001;


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

//get api route
app.get('/api/notes', (req, res) => {
    
    res.json(notes);
});
//Post api route
app.post('/api/notes', (req, res) => {
    req.body.id=notes.length.toString();

    // if the data in the body is not correct, send 400 error
    
        // add note to json file and animals array in this function
  let note = createdNewNote(req.body, notes);
  res.json(note);
})
function createdNewNote(body, notesArray){
    const note = body;

    notesArray.push(note);
    //write file to notes.json
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
};

//delete api route
app.delete("/api/notes/:id", (req, res) => {

    const idTodelete = notes.some(note => note.id === req.params.id);
    if(idTodelete){
        notes = notes.filter(note => note.id !== req.params.id);
        res.status(200).json(notes);
    }else {
        res.status(400).json()
    }
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));