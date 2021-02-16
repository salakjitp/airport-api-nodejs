var express = require("express");
var router = express.Router();
const  airport_controller = require("../Controllers/airport-controller");

//GET
router.get('/', airport_controller.getList);
// router.post("/import",airport_controller.importJSON);
router.get('/new', airport_controller.getNewList);
// //POST
// router.post("/", airport_controller.insertAirport);

// //PUT
// router.put('/:id', airport_controller.updateAirport);

// //DEL
// router.delete('/:id', airport_controller.deleteAirport);

module.exports = router;