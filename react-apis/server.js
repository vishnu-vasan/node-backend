var mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { uuid } = require('uuidv4');

const port = 7800;
app.use(bodyParser());
app.use(cors());
let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "vishnu"
});

app.post('/authenticate', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) res.status(500).send('DB connection error');
        console.log("==========.", req.body)
        connection.query(`SELECT * FROM USER WHERE EMAIL = "${req.body.email}" AND PASSWORD = "${req.body.password}"`, function (error, results, fields) {
            connection.release();
            if (error) res.status(500).send(error);
            if (results.length > 0) {
                res.send({ "EMAIL": req.body.email, "UUIDTOKEN": uuid() });
            }
            else {
                res.status(401).send({ message: `authorization error,INVALID PASSWORD FOR EMAIL- ${req.body.email}` });
            }
        });
    });
});

app.get('/users', (req, res) => {
    pool.getConnection(function (err, connection) {
        if (err) res.status(500).send("DB connection error");
        connection.query(`SELECT * FROM USER`, function (error, results, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            res.send(results);
        });
    });
});

app.post('/user', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) res.status(500).send("DB connection error");
        let val = [[req.body.name, req.body.email, req.body.password]];
        connection.query("INSERT INTO USER (name,email,password) VALUES ?", [val], function (error, results, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            res.send(results);
        });
    });
});

app.delete('/user/:id', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(`DELETE FROM USER WHERE id = ${req.params.id}`, function (error, results, fields) {
            connection.release();
            if (error) res.status(500).send(error);
            res.send(results);
        });
    });
});

app.put('/user/:id', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) res.status(500).send("DB connection error");
        connection.query(`UPDATE USER SET id = ${req.params.id},NAME = ${JSON.stringify(req.body.name)},EMAIL = ${JSON.stringify(req.body.email)},PASSWORD = ${JSON.stringify(req.body.password)} WHERE id = ${req.params.id}`, function (error, results, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            res.send(results);
        });
    });

});

app.get('/user/:id', (req, res) => {
    pool.getConnection(function (err, connection) {
        if (err) res.status(500).send("DB connection error");
        console.log(req.params.id);
        connection.query(`SELECT * FROM USER WHERE id = ${req.params.id}`, function (error, results, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            res.send(results[0]);
        });
    });
});

app.listen(port, () => console.log(`example app listening on port ${port}!`));
