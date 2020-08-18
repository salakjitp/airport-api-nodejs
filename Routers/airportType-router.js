var express = require("express");
var router = express.Router();
const type_controller = require("../Controllers/airportType-controller");

//GET
router.get('/', type_controller.getList);

module.exports = router;
