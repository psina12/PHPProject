const express = require("express");
const router = express.Router();

const attractionController = require("../controller/attraction.controller");
const countryController = require("../controller/country.controller");

router.route("/country")
    .get(countryController.getAll)
    .post(countryController.addOne);

router.route("/country/:countryId")
     .get(countryController.getOne)
     .delete(countryController.deleteOne)
     .put(countryController.fullUpdateOne)
     .patch(countryController.partialUpdateOne);
     
router.route("/country/:countryId/attractions")
    .get(attractionController.getAll)
    .post(attractionController.addOne);     

router.route("/country/:countryId/attractions/:attractionId")
      .get(attractionController.getOne)
      .delete(attractionController.deleteOne)
      .put(attractionController.fullUpdateOne)  
      .patch(attractionController.partialUpdateOne);  

module.exports = router;

