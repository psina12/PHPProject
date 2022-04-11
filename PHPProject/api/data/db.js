const mongoose = require("mongoose");
require("./travel_model");
mongoose.connect(process.env.DB_URL,{useNewURLParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", ()=>_handleConnection("Mongoose connected"));
mongoose.connection.on("disconnected",(err)=>_handleConnection("Mongoose disconnected"));
mongoose.connection.on("error",(err)=>_handleConnection("Mongoose connection error", err));

process.on("SIGINT", ()=>handleProcess("Disconnecting"));
process.on("SIGTERM", ()=>handleProcess("Terminating"));
process.on("SIGUSR2", ()=>handleProcess("Restarting"));

function _handleConnection(msg, err){
  console.log(msg, err);
}

function handleProcess(msg){
  mongoose.connection.close(()=>_hanndleConnClose(msg));
}

function _hanndleConnClose(msg){
  console.log(msg);
  process.exit(0);
}
