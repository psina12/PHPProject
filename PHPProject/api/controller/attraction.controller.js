const mongoose = require("mongoose");
const Country = mongoose.model(process.env.MODEL_NAME);

const _responseAllLocation = function (err, result, res, response) {
  if (err) {
    response.status = 400;
    response.message = err;
  } else {
    response.status = 200;
    response.message = result;
  }
  res.status(response.status).json(response.message);
};
const getAll = function(req, res) {
  let response = _getDefaultResponse();
  const countryId = req.params.countryId;
  if (mongoose.isValidObjectId(countryId)) {
    Country.findById(countryId)
      .select("attractions")
      .exec((err, result) => _responseAllLocation(err, result, res, response));
  } else {
    response.status = 400;
    response.message = process.env.MSG_RES_INVALID_ID_COUNTRY;
  }
  if (response.status != 200) {
    res.status(response.status).json(response.message);
  }
};
const _responseAddOne = function(err, result, res, response){
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!result){
        response.status = 404;
        response.message = "attraction not found"
    } else{
        response.status = 200;
        response.message = result;
    } res.status(response.status).json(response.message);
}
const _responseAddOneGet = function(err, result, req, res, response) {
  if(err){
      response.status = 500;
      response.message = err;
  } else if(!result){
      response.status = 404;
      response.message = process.env.MSG_RES_404_COUNTRY;
  } 
  if(response.status==200){
      let newAttraction = {
          name:req.body.name,
          city:req.body.city,
          pic_link:req.body.pic_link
      }
      result.attractions.push(newAttraction);
      result.save((err, result)=>_responseAddOne(err, result, res, response));
  } else{
    res.status(response.status).json(response.message);
  }
};
const addOne = function(req, res){
 let response = _getDefaultResponse();
    const countryId = req.params.countryId;
    if (mongoose.isValidObjectId(countryId)) {
        Country.findById(countryId).select("attractions").exec((err, result)=>_responseAddOneGet(err, result, req, res, response));
    } else {
      response.status = 400;
      response.message = process.env.MSG_RES_INVALID_ID_COUNTRY;
    }
    if (response.status != 200) {
      res.status(response.status).json(response.message);
    }
}

const _responseGetOne = function(err, result, res, req, response){
    const attractionId = req.params.attractionId;
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!result){
        response.status = 404;
        response.message = process.env.MSG_RES_404_COUNTRY;
    } else if(!result.attractions.id(attractionId)){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ATT;
    } else{
        response.status = 200;
       response.message = result.attractions.id(attractionId);
  }
  res.status(response.status).json(response.message);
}
const getOne = function(req, res){
  let response = _getDefaultResponse();
  const countryId = req.params.countryId;
  const attractionId = req.params.attractionId;
  if (!mongoose.isValidObjectId(countryId)) {
    response.status = 400;
    response.message = process.env.MSG_RES_INVALID_ID_COUNTRY;
  } else if(!mongoose.isValidObjectId(attractionId)){
      response.status = 400;
      response.message = process.env.MSG_RES_INVALID_ID_ATT;
  }
  if (response.status == 200) {
      Country.findById(countryId).select(process.env.ATTRACTIONS).exec((err, result)=>_responseGetOne(err, result, res, req, response));
  } else{
    res.status(response.status).json(response.message);
  }
}

const _responseDeleteOne = function (err, result, res, response) {
  if (err) {
    response.status = 500;
    response.message = err;
  } else {
    response.status = 200;
    response.message = result;
  }
  res.status(response.status).json(response.message);
};

const _responseDeleteOneGet = function (err, result, res, req, response) {
  const attractionId = req.params.attractionId;
  if (err) {
    response.status = 500;
    response.message = err;
  } else if (!result) {
    response.status = 404;
    response.message = process.env.MSG_RES_404_COUNTRY;
  } else if (!result.attractions.id(attractionId)) {
    response.status = 404;
    response.message = process.env.MSG_RES_404_ATT;
  }

  if (response.status == 200) {
    result.attractions.id(attractionId).remove();
    result.save((err, result) =>
      _responseDeleteOne(err, result, res, response)
    );
  } else {
    res.status(response.status).json(response.message);
  }
};

const deleteOne = function(req, res){
  let response = _getDefaultResponse();
  const countryId = req.params.countryId;
  const attractionId = req.params.attractionId;
  if (!mongoose.isValidObjectId(countryId)) {
    response.status = 400;
    response.message = process.env.MSG_RES_INVALID_ID_COUNTRY;
  } else if (!mongoose.isValidObjectId(attractionId)) {
    response.status = 400;
    response.message = process.env.MSG_RES_INVALID_ID_ATT;
  }
  if (response.status == 200) {
    Country.findById(countryId)
      .select(process.env.ATTRACTIONS)
      .exec((err, result) =>
        _responseDeleteOneGet(err, result, res, req, response)
      );
  } else {
    res.status(response.status).json(response.message);
  }
}


const _responseUpdateOne = function(err, result, res, response){
  if(err){
      response.status = 500;
      response.message = err;
  } else if(!result){
      response.status = 404;
      response.message = process.env.MSG_RES_404_ATT;
  } else{
      response.status = 200;
      response.message = result;
  } res.status(response.status).json(response.message);
}
const _responseUpdateOneGet = function (err, result, req, res, response) {
  const attractionId= req.params.attractionId;
  if (err) {
    response.status = 500;
    response.message = err;
  } else if (!result) {
    response.status = 404;
    response.message = process.env.MSG_RES_404_COUNTRY;
  } else if (!result.attractions.id(attractionId)) {
    response.status = 404;
    response.message = process.env.MSG_RES_404_ATT;
  }

  if (response.status == 200) {
    const attId = result.attractions.id(attractionId);
    attId.name = req.body.name;
    attId.city=req.body.city;
    attId.pic_link=req.body.pic_link;
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
  const attractionId = req.params.attractionId;
  if (!mongoose.isValidObjectId(countryId)) {
    response.status = 400;
    response.message = process.env.MSG_RES_INVALID_ID_COUNTRY;
  } else if (!mongoose.isValidObjectId(attractionId)) {
    response.status = 400;
    response.message = process.env.MSG_RES_INVALID_ID_ATT;
  }
  if (response.status == 200) {
    Country.findById(countryId)
      .select(process.env.ATTRACTIONS)
      .exec((err, result) =>
        _responseUpdateOneGet(err, result, req, res, response)
      );
  } else {
    res.status(response.status).json(response.message);
  }
}

const _partialUpdateAttraction= function(country,req){
  const id = country.attractions.id(req.params.attractionId);
  id.name = req.body.name || id.name;
  id.city = req.body.name || id.city;
  id.pic_link=req.body.name || id.pic_link;
  return country;
} 
const _fullUpdateAttraction= function(country,req){
  console.log("fullupdate", country,req.params.attractionId);
  const id = country.attractions.id(req.params.attractionId);
  id.name = req.body.name;
  id.city = req.body.name;
  id.pic_link=req.body.name;
  return country;
} 

const fullUpdateOne = function(req,res){
  updateOne(req,res,_fullUpdateAttraction);
}
const partialUpdateOne = function(req,res){
  updateOne(req,res,_partialUpdateAttraction);
}

function _getDefaultResponse(){
  let response={
     status:200,
     message:process.env.MSG_RES_DEFAULT
  }
  return response;
}

module.exports = {
    getAll, addOne, getOne, deleteOne, fullUpdateOne,partialUpdateOne
}