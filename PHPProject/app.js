require('dotenv').config();
require("./api/data/db");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const router = require("./api/router");

app.use("/api", function(req, res, next){
  res.header('Access-Control-Allow-Origin','http://localhost:4200');
  res.header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE');
  res.header('Access-Control-Allow-Headers',
          'Content-Type,X-Requested-With,cache-control,pragma,Origin,Accept'); 
  next();
})

app.use("/api",router);
const server = app.listen(process.env.PORT, function(){
  console.log(process.env.MSG_SERVER,server.address);
});
 