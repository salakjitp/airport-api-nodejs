const express = require("express"),
 path = require('path'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 cors = require("cors"),
 appConfig = require("./Configs/app");

// คำสั่งเชื่อม MongoDB Atlas
mongoose.Promise = global.Promise;
mongoose.connect(appConfig.mongodbUri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log(`[failed] task 2 ${error}`);
    process.exit();
  }
);

var app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname,'views') + '/index.html');
})
// app.get('/index', function (req, res) {
//   res.send('<h1>This is index page</h1>')
// })
app.listen(appConfig.port, () => {
  console.log(`[success] task 1 : listening on port  ${appConfig.port}`);
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