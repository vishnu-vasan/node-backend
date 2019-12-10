let users = [{name: 'a', age: 3}, {name: 'b', age: 4},{name:'c',age:5}];
const express=require('express');
const app=express();
const port=3000;
const bodyParser = require('body-parser');
app.use(bodyParser());
app.post('/test', function(req, res){
    console.dir(req.body);
    users.push({'name':'abc','age':18});
    res.send(users);
}); 
app.listen(port,()=>console.log(`example app listening on port ${port}!`));
