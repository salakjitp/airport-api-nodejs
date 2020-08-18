var mongoose = require("mongoose");

var airportSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    id: { type: Number},
    nameTH: {type: String},
    nameEN: {type: String},
    typeId: {type: Number},
    city: String,
    icao: String
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "AIRPORTS"
  }
);

var Airports = mongoose.model("airports", airportSchema);
module.exports = Airports;