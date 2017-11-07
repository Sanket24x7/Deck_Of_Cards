var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(express.static(__dirname+'/'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
// // use it before all route definitions
// app.use(cors({origin: 'http://localhost:8888'}));


app.get('/',function(req,res){
  res.send("Hello world from server.js");
});
app.post('/login', function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  if(username=="KungFu" && password=="Panda"){
    res.send("Good One");
  }else {
    res.send("Try Again");
  }
})
app.listen(3001);
console.log("Server running on port 3001");
