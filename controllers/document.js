const path = require('path');

const Category = require('../models/category');
const Document = require('../models/document');

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

exports.create = function (req, res) {
    Category.findOne({
        name: 'Exercises'
    }).exec().then(function (cat) {
    const file = req.file;

        const currentFile = path.join(process.env.APP_ROOT, file.path);
        const newfilename = path.join(process.env.APP_ROOT, process.env.DOCUMENT_ROOT, file.originalname);

        var deletePromise = getDeletePromise(newfilename);

        Promise.bind({
            currentFile: currentFile,
            newFile: newfilename,
            title: req.body.title,
            description: req.body.description,
            category: cat
        })
            .then(fileExists)
            .then(deletePromise, deletePromise)
            .then(readFile)
            .then(writeFile)
            .then(function() {
                var document = new Document({
                    title: this.title,
                    description: this.description,
                    path: this.newFile,
                    category: this.category
                });

                document.save()
                    .then(function(doc) {
                        res.json(
                            doc
                        );
                    });
            });

        });

    function readFile() {
        return fs.readFileAsync(this.currentFile, 'utf8')
    }

    function writeFile(contents) {
        return fs.writeFileAsync(this.newFile, contents);
    }

    function fileExists() {
        return fs.statAsync(this.newFile);
    }

    function getDeletePromise(filename) {
        const fn = filename;

        return function(stat) {
            if(stat.isFile) {
                return fs.unlinkAsync(fn);
            } else {
                return true;
            }
        }
    }
};