const fs = require("fs");
const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

const uniqueId = require('uniqid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('/api/notes', (req, res) => {
    fs.readFile('/db/db.json', 'utf-8', function (err, data) {
        if (err) {
            console.log('error');
        } else {
            const userData = JSON.parse(data);
            res.json(userData);
        }
    });
})

app.post('/api/notes', (req, res) => {
    const notesTitle = req.body.title;
    const notesText = req.body.text;
    fs.readFile('/db/db.json', 'utf-8', function (err, data) {
        if (err) {
            console.log('error');
        } else {
            const notesObject = JSON.parse(data);
            const notesAp = {
                title,
                text,
                id: uniqueId()
            }
            notesObject.push(notesAp);
            fs.writeFile('/db/db.json', JSON.stringify(notesObject), err => err ?
                console.log('error') :
                console.log('file has been saved')
            )
        }
    });

})

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`Express server listening on port http://localhost:${PORT}!`)
);