var mongoose = require("mongoose");

var typeSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    id: { type: Number},
    name: {type: String}
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "AIRPORTTYPES"
  }
);

var AIRPORTTYPES = mongoose.model("AIRPORTTYPES", typeSchema);
module.exports = AIRPORTTYPES;