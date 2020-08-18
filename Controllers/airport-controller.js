const Airports = require('../Models/airports-model');

exports.getList = function (req, res) {
    const id = (req.params && req.params.id) ? req.params.id : (req.query && req.query.id) ? req.query.id : null;

    if(id){
        Airports.findById(id, function (err, data) {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        })
    }
    else{
        Airports.find().exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    }
}

const data = require('../importAirports.json')
exports.importJSON = (req, res) => {
    Airports.insertMany(data, function(err, docs) {
        if (err) return res.status(400).send(err);
        res.status(200).send("Airport created.");
    });
}

exports.insertAirport = function (req, res) {
    var arr = req.body;
    Airports.insertMany(arr, function(err, docs) {
        if (err) return res.status(400).send(err);
        res.status(200).send("Airport created.");
    });
}

exports.updateAirport = function (req, res) {
    Airports.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, users) {
        res.send('Airport updated.');
    });
}

exports.deleteAirport = function (req, res) {
    Airports.findByIdAndRemove(req.params.id, function (err, users) {
        res.send('Airport deleted.')
    })
}