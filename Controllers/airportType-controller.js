const AIRPORTTYPES = require('../Models/airportType-model');

exports.getList = function (req, res) {
    const id = (req.params && req.params.id) ? req.params.id : (req.query && req.query.id) ? req.query.id : null;

    if(id){
        AIRPORTTYPES.findById(id, function (err, data) {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        })
    }
    else{
        AIRPORTTYPES.find().exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    }
}
