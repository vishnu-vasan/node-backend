var mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser());
const fs = require("fs");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vishnu"
});


app.get('/get-users-from-json-file/:id', (req, res) => {
    con.connect(function (err){
        if(err) console.log(err);
        console.log(req.params);
    con.query(`SELECT * FROM USER`,function (err,result){
        if(err) console.log(err);
        console.log(result);
        res.send();
    });
});
});
app.post('/user/:id', function (req, res) {
    con.connect(function(err){
        if(err) console.log(err);
        let val=[[req.body.id,req.body.name,req.body.email,req.body.password]];
        con.query("INSERT INTO USER VALUES ?",[val],function (err,result){
            if(err) console.log(err);
            console.log(result);
            res.send();
        });
    });
});

app.delete('/user/:id', function (req, res) {
    con.connect(function (err) {
        if (err) throw err;
        con.query(`DELETE FROM USER WHERE id = ${req.params.id}`, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send();
        });
    });
});
app.put('/user/:id', function (req, res) {
    con.connect(function (err) {
        if (err) throw err;
        con.query(`UPDATE USER SET ID = ${req.params.id},NAME = ${JSON.stringify(req.body.name)},EMAIL = ${JSON.stringify(req.body.email)},PASSWORD = ${JSON.stringify(req.body.password)} WHERE id = ${req.params.id}`, function (err, result) {
           if(err) console.log(err);
            console.log(result);
            res.send();
        });
    });

});
app.get('/get-users-from-json-file/:id', (req, res) => {
    con.connect(function (err){
        if(err) console.log(err);
        console.log(req.params.id);
    con.query(`SELECT * FROM USER WHERE id = ${req.params.id}`,function (err,result){
        if(err) console.log(err);
        console.log(result)
        res.send();
    });
});
});

app.listen(port, () => console.log(`example app listening on port ${port}!`));
