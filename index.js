const express = require("express"),
 path = require('path'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 cors = require("cors"),
 appConfig = require("./Configs/app"),
 morgan = require('morgan'),
 fs = require('fs');

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
var logDirectory = path.join(__dirname, 'logs');

// check log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//Set static file
app.use('/logs', express.static('logs'));

app.use(cors());
// // log only 4xx and 5xx responses to console
// app.use(morgan('dev', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))

//logger : all requests write to access.log
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms', {
  stream: fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' })
}))

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname,'views') + '/index.html');
})
app.listen(appConfig.port, () => {
  console.log(`[success] task 1 : listening on port  ${appConfig.port}`);
});

// path สำหรับ MongoDB ของเรา
var airports = require("./Routers/airports-router");
app.use("/api/airports", airports);

var airportType = require("./Routers/airportType-router");
app.use("/api/airportType", airportType);

// Error handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");

  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});