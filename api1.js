const express=require('express');
const app=express();
const port=3000;
const fs=require('fs')

let 

app.get('/get-users-from-json-file',(req,res)=>{
    fs.readFile('datas.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        res.end();
    });
});

app.listen(port,()=>console.log(`example app listening on port ${port}!`));



