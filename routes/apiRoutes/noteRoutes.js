const router = require('express').Router();
let {notes} = require('../../db/db.json');
const path = require('path');
const fs = require('fs');

//get api route
router.get('/notes', (req, res) => {
    
    res.json(notes);
});
//Post api route
router.post('/notes', (req, res) => {
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
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'),
    JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
};

//delete api route
router.delete("/notes/:id", (req, res) => {

    const idTodelete = notes.some(note => note.id === req.params.id);
    if(idTodelete){
        notes = notes.filter(note => note.id !== req.params.id);
        res.status(200).json(notes);
    }else {
        res.status(400).json()
    }
});

module.exports = router;