const express = require('express');
const path = require('path');
const notesData = require('./db/db'); //Import Json file
const { error } = require('console');
const app = express(); //Initialize app variable
const PORT = 3001;

// Middleware for users to see the public folder
app.use(express.static('public'));
// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// html routes
app.get('/', (req, res) => res.send('Take notes with Express'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
// API routes 
app.get('/api/notes', (req, res) => {
    res.json(notesData)
})
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    let response; //Response object to send back to client
    console.log(req.body)

    if (req.body?.title) {
        response = {
            status: 'success',
            data: req.body,
        };
        res.json(`Note ${response.data.title} has been added!`);
    }else{
        res.json(`Request body must have a title to create a new the note`);
    }
})



app.listen(PORT, () => 
console.log(`Example app listening at http://localhost:${PORT}`));