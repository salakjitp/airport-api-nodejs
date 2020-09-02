const Airports = require('../Models/airports-model');
const pagination = require('../Helpers/pagination/pagination');

exports.getList = async function (req, res){
    
    try{
        const page = parseInt((req.params && req.params.page) ? req.params.page : (req.query && req.query.page) ? req.query.page : 1);
        const size = parseInt((req.params && req.params.size) ? req.params.size : (req.query && req.query.size) ? req.query.size : 10);

        const id = (req.params && req.params.id) ? req.params.id : (req.query && req.query.id) ? req.query.id : null;
        const typeId = (req.params && req.params.typeId) ? req.params.typeId : (req.query && req.query.typeId) ? req.query.typeId : null;

        let [_results, _count] = [];

        if(id){
            [_results, _count] = await Promise.all([
                Airports.findById(id)
                //   .skip(pagination.calSkip(page, size))
                //   .limit(size)
                  .exec(),
                  Airports.countDocuments().exec()
                ]);
        }
        else if(typeId && typeId > 0){
            [_results, _count] = await Promise.all([
                Airports.find({typeId : typeId})
                //   .skip(pagination.calSkip(page, size))
                //   .limit(size)
                  .exec(),
                  Airports.countDocuments().exec()
                ]);
        } 
        else{
            [_results, _count] = await Promise.all([
                Airports.find()
                //   .skip(pagination.calSkip(page, size))
                //   .limit(size)
                  .exec(),
                  Airports.countDocuments().exec()
                ]);
        }

        const resValue = {
            currentPage: page,
            allPages: pagination.calPage(_count, size),
            currentCount: _results ? _results.length : 0,
            totalCount: _count,
            data: _results
        }

        res.status(200).send(resValue);
    }
    catch(err){
        res.status(400).send(err);
    }
};

// exports.getList = function (req, res) {
//     const id = (req.params && req.params.id) ? req.params.id : (req.query && req.query.id) ? req.query.id : null;
//     const typeId = (req.params && req.params.typeId) ? req.params.typeId : (req.query && req.query.typeId) ? req.query.typeId : null;

//     if(typeId && typeId > 0){
//         Airports.find({typeId : typeId}).exec((err, data) => {
//             if (err) return res.status(400).send(err);
//             res.status(200).send(data);
//         });
//     }
//     else if(id){
//         Airports.findById(id, function (err, data) {
//             if (err) return res.status(400).send(err);
//             res.status(200).send(data);
//         })
//     }
//     else{
//         Airports.find().exec((err, data) => {
//             if (err) return res.status(400).send(err);
//             res.status(200).send(data);
//         });
//     }
// }

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
