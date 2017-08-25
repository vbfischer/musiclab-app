import express from 'express';
import {setupLogging} from './logger';
import bodyParser from 'body-parser';
import health from 'express-ping';
import Prismic from 'prismic-javascript';
import api from '../controllers';

class ExpressConfig {
    constructor() {
        this.app = express();

        setupLogging(this.app);

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use((req, res, next) => {
            Prismic.api("https://bz-musiclab.prismic.io/api")
                .then((api) => {
                    req.prismic = {api};
                    next();
                }).catch((err) => {
                next(err);
            });
        });
        this.app.use(health.ping());
        this.app.use('/api', api());
    }
}

export default ExpressConfig;