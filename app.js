import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import autoReap from 'multer-autoreap';
import mongoose from 'mongoose';
import api from './server/controllers';
import Promise from 'bluebird';
import Prismic from 'prismic-javascript';

mongoose.Promise = Promise;

mongoose.set('debug', true);

var app = express();
// 3rd Party Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use((req, res, next) => {
    Prismic.api("https://bz-musiclab.prismic.io/api")
        .then((api) => {
            req.prismic = {api};
            next();
        }).catch( (err) => {
        next(err);
    });
});

mongoose.connect(process.env.DB_CONNECTION, {
    useMongoClient: true
}).then(function (db) {
});

app.use('/api', api());

module.exports = app;
