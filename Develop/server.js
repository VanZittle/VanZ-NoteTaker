const express = require('express');
const path = require('path');
const notesData = require('./db/db.json'); //Import Json file
// const { error } = require('console');
const fs = require('fs');
const uuid = require('./helpers/uuid');
// const { title } = require('process');
// const { text } = require('process');
const PORT = 3001;
const app = express(); //Initialize app variable

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Middleware for users to see the public
app.use(express.static('public'));
// html routes
app.get('/', (req, res) => res.send('Take notes with Express'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
// API routes
app.get('/api/notes', (req, res) => {
    res.json(notesData)
})
// POST request to add a note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title , text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
    
        // const reviewString = JSON.stringify(newNote);
        // get existing notes
        fs.readFile('./db/db.json','utf8', (err, data) =>{
            if (err){
                console.error(err);
            }else{
                const parsedNotes = JSON.parse(data);
                
                parsedNotes.push(newNote);
                // adds new notes to db.json
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!')
                );
            }
    
        });
    
        const response = {
            status: 'success',
            body: newNote,
        };
    
        console.log(response);
        res.status(201).json(response);
    } else{
        res.status(500).json('Error in posting new note');
    }


    // let response; //Response object to send back to client
    // console.log(req.body)

    // if (req.body?.title) {
    //     response = {
    //         status: 'success',
    //         data: req.body,
    //     };
    //     res.json(`Note ${response.data.title} has been added!`);
    // }else{
    //     res.json(`Request body must have a title to create a new the note`);
    // }
});

app.listen(PORT, () => 
console.log(`Example app listening at http://localhost:${PORT}`));