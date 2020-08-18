var express = require("express");
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require("cors");

// คำสั่งเชื่อม MongoDB Atlas
var mongo_uri = require("./mongo-uri");
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

var app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var port = process.env.PORT || 5000

app.get('/', function (req, res) {
 res.send('<div> <h1>Hello Node.js</h1> <div>/api/airports</div> <div>/api/airportType</div> </div> ')
 //res.sendFile('index.html');
})
app.get('/index', function (req, res) {
  res.send('<h1>This is index page</h1>')
})
app.listen(port, () => {
  console.log("[success] task 1 : listening on port " + port);
});

// path สำหรับ MongoDB ของเรา
var airports = require("./Routers/airports-router");
app.use("/api/airports", airports);

var airportType = require("./Routers/airportType-router");
app.use("/api/airportType", airportType);

app.use((req, res, next) => {
  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});