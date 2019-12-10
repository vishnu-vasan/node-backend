const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser());
const fs = require("fs");

app.get('/get-users-from-json-file/:userid', (req, res) => {
    console.log(req.params);
    fs.readFile('./test.json', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
        res.send(data);
    });
});


app.post('/user/', function (req, res) {
    fs.readFile('./test.json', 'utf-8', function (err, datas) {
        console.log("++++++++", datas);
        datas = JSON.parse(datas);
        datas.push(req.body)
        fs.writeFile('./test.json', JSON.stringify(datas), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            res.send(datas);
        });
    });
    
});

app.delete('/user/:userid', function (req, res) {
    fs.readFile('./test.json', 'utf-8', function (err, dataa) {
        console.log("++++++++", dataa);
        dataa = JSON.parse(dataa);
        for (let i = 0; i < dataa.length; i++) {
            if (dataa[i].userid == req.params.userid) {
                dataa.splice(i,1);
            }
        }
        fs.writeFile('./test.json', JSON.stringify(dataa), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("The file was saved! and item was deleted");
            res.send(dataa);
        });
    });
    
});
app.put('/user/:userid', function (req, res) {
    fs.readFile('./test.json', 'utf-8', function (err, datum) {
        console.log("++++++++", datum);
        datum = JSON.parse(datum);
        for (let i = 0; i < datum.length; i++) {
            if (datum[i].userid == req.params.userid) {
                datum[i].name=req.body.name;
                datum[i].age=req.body.age;
            }
        }
        fs.writeFile('./test.json', JSON.stringify(datum), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("The file was saved! and item was modified");
            res.send(datum);
        });
    });
    
});
app.get('/user/:userid', function (req, res) {
    fs.readFile('./test.json', 'utf-8', function (err, dat) {
        console.log("++++++++", dat);
        dat = JSON.parse(dat);
        for (let i = 0; i < dat.length; i++) {
            if (dat[i].userid == req.params.userid) {
                console.log(dat[i]);
            }
        }
        fs.writeFile('./test.json', JSON.stringify(dat), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("The detail was printed");
            res.send();
        });
    });
    
});

app.listen(port, () => console.log(`example app listening on port ${port}!`));
