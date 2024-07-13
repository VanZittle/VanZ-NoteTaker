const express = require('express');
const path = require('path');
const db = require('./db/db.json'); //Import Json file
const app = express(); //Initialize app variable
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Take notes with Express'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api', (req, res) => {
    res.json(db)
})

app.listen(PORT, () => 
console.log(`Example app listening at http://localhost:${PORT}`));