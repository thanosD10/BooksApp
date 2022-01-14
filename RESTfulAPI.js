
const express = require('express');
const app = express();
const parser = require('body-parser');

const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('books.sqlite');

app.use(cors());
app.use(parser.json());

app.get('/books/:keyword', (req, res) => {
    const q = `SELECT * FROM books WHERE title LIKE '%${req.params.keyword}%'`;
    db.all(q, (err, rows) => {
        if (err) {
            console.err('Error querying db.');
            res.send('Error querying db.');
        } else {
            res.send(JSON.stringify(rows));
        }
    });
});

app.post('/books/', (req, res) => {
    console.log(req.body);
    const book = req.body;
    const q = `INSERT INTO books ("id","author","title","genre","price") VALUES ('${book.id}','${book.author}','${book.title}','${book.genre}','${book.price}')`;
    db.run(q, (err) => {
        if (err) {
            res.send('Error executing query.');
        } else {
            res.send('Book Added!');
        }
    });
});

app.listen(3000);
