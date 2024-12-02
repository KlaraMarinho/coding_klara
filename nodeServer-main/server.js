const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: '3306',
    user: 'root',
    password: 'teste',
    database: 'senac'
});


db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connectado...');
});


app.get('/people', (req, res) => {
    let sql = 'SELECT * FROM peole';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


app.post('/people', (req, res) => {
    let people = req.body;
    let sql = 'INSERT INTO people SET ?';
    db.query(sql, people, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.put('/people/:id', (req, res) => {
    let sql = `UPDATE people SET name = '${req.body.nome}', valor = ${req.body.valor} WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.delete('/people/:id', (req, res) => {
    let sql = `DELETE FROM people WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});