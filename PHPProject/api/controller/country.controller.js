const mongoose = require("mongoose");
const Country = mongoose.model(process.env.MODEL_NAME);

const _responseAllCountry = function(err, result, res, response){
  if(err){
       response.status =500;
       response.message =err;
    }
   else{
      response.status=200;
      response.message = result;
   }
 res.status(response.status).json(response.message);
}

const getAll = function (req, res) {
  let response = _getDefaultResponse();
  let offset = 0;
  let count = 5;
  let maxCount = 10;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  if (isNaN(offset) || isNaN(count)) {
    response.status = 400;
    response.message = process.env.MSG_RES_OFFSET;
  }
  if (count > 10) {
    count = maxCount;
  }
  let countryName =null;
  if(req.query.country){
    countryName = req.query.country;
  }

  let query = null;
  if(countryName!=null){
    query = {name:countryName}
  }
  console.log(response.status, response.message);
  if (response.status == 200) {
    Country.find(query)
      .skip(offset)
      .limit(count) 
      .exec((err, result) =>
        _responseAllCountry(err, result, res, response)
      );
  } else {
    res.status(response.status).json(response.message);
  }
};


const _responseAddOneCountry = function (res, err, result, response) {
  if (err) {
    response.status = 500;
    response.message = err;
  } else {
    response.status = 200;
    response.message = result;
  }
  res.status(response.status).json(response.message);
};


const addOne = function (req, res) {
  let response = _getDefaultResponse();
  const newCountry = {
    name: req.body.name,
    population: req.body.population,
    atractions: [],
  };
  Country.create(newCountry, (err, result) =>
    _responseAddOneCountry(res, err, result, response)
  );
};


 const _responseGetOneCountry = function(res,err,result, response){
    if (err){
        response.status=500;
        response.message=err;
    }
    else if(!result){ 
        response.status=404;
        response.message=process.env.MSG_RES_404_COUNTRY;
    }
    else{
      response.status =200;
      response.message = result;
   }
 res.status(response.status).json(response.message);
}


 const getOne = function(req,res){
  let response = _getDefaultResponse();
  const countryId = req.params.countryId;
   if(mongoose.isValidObjectId(countryId)){
        Country.findById(countryId).exec((err,result)=>_responseGetOneCountry(res,err,result, response));
   }
    else{
    res.status(400).json({error_message:process.env.MSG_RES_INVALID_ID_COUNTRY});
 }
}

const _responseDeleteOne = function (res, err, result, response) {
  if (err) {
    res.status = 500;
    response.message = err;
  } else if (!result) {
    response.status = 404;
    response.message = process.env.MSG_RES_404_COUNTRY;
  } else {
    response.status = 200;
    response.message = "Country \""+result.name+"\" deleted Succesfully";
  }
  res.status(response.status).json(response.message);
};

const deleteOne = function (req, res) {
  let response = _getDefaultResponse();
  const countryId = req.params.countryId;
  if (mongoose.isValidObjectId(countryId)) {
    Country.findByIdAndDelete(countryId).exec((err, result) =>
      _responseDeleteOne(res, err, result, response)
    );
  } 
  else {
    res.status(400).json({ error_message: process.env.MSG_RES_INVALID_ID_COUNTRY});
  }
};


const _responseUpdateOne = function(err, result, res, response){
  if(err){
      response.status = 500;
      response.message = err;
  } else if(!result){
      response.status = 404;
      response.message = process.env.MSG_RES_404_COUNTRY;
  } else{
      response.status = 200;
      response.message = result;
  } 
  res.status(response.status).json(response.message);
}
const _responseUpdateOneGet = function (err, result, req, res, response) {
  if (err) {
    response.status = 500;
    response.message = err;
  } else if (!result) {
    response.status = 404;
    response.message = process.env.MSG_RES_404_COUNTRY;
  } 
  if (response.status == 200) {
    if(req.body.name) result.name = req.body.name;
    if(req.body.population) result.population=req.body.population;
    result.save((err, result) =>
      _responseUpdateOne(err, result, res, response)
    );
  } else {
    res.status(response.status).json(response.message);
  }
};
const updateOne = function(req, res){
  let response = _getDefaultResponse();
  const countryId = req.params.countryId;
  if (mongoose.isValidObjectId(countryId)) {
    Country.findById(countryId)
      .exec((err, result) =>
        _responseUpdateOneGet(err, result, req, res, response)
      );
  } else {
    res.status(400).json(process.env.MSG_RES_INVALID_ID_COUNTRY);
  }
}


const _fullUpdateCountry = function(result,req){
  result.name=req.body.name;
  result.population=req.body.population;
  result.atractions = [req.body.atractions];

  return result;
}

  const _partialUpdateCountry = function(result,req){
    result.name=req.body.name || result.name;
    result.population=req.body.population || result.population;
    result.atractions = [req.body.atractions] || result.atractions;

  return result;  
}

const fullUpdateOne = function(req,res){
  updateOne(req,res,_fullUpdateCountry);
}
const partialUpdateOne = function(req,res){
  updateOne(req,res,_partialUpdateCountry);
}

function _getDefaultResponse(){ 
  const response = {
    status: 200,
    message: process.env.MSG_RES_DEFAULT,
  };
  return response;
}

module.exports = {
    getAll,addOne,getOne,deleteOne,fullUpdateOne,partialUpdateOne
}



