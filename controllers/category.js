const Category = require('../models/category');

exports.list = function(req, res) {

    Category.find({}).exec().then(function (result) {
        console.log(result);

        var rJson = result.map(function (r) {
            return {
                name: r.name
            }
        });
        res.json(rJson);
    });
};

exports.create = function (req, res) {
    var category = new Category({
        name: req.body.name
    });

    category.save().then(function () {
        return res.json({
            category: category.toJSON()
        });
    });
};