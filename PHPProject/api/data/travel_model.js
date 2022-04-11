const mongoose = require("mongoose");
const attractionSchema = mongoose.Schema({
	name:{
    type:String,
    required:true
  },
	city:{
    type:String,
    required:true
  },
	pic_link:String
});

const countrySchema = mongoose.Schema({
	name:{
    type:String,
    required:true
  },
	population:{
    type:Number,
    required:true
  },
	attractions: [attractionSchema]
});

mongoose.model(process.env.MODEL_NAME, countrySchema, process.env.COLL_NAME);