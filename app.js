import dotenv from './server/config/config-init';
import ExpressConfig from './server/config/express';

var debug = require('debug')('guitar-log-app:server');
import mongoose from './server/config/mongoose';
import {logger} from './server/config/logger';
import chalk from 'chalk';

mongoose()
    .then((db) => {
        const express = new ExpressConfig();
        var port = process.env.PORT || '3000';
        express.app.listen(port, () => {
            logger.info(chalk`
                {magenta ------------}
                {yellow {bgBlue Server Started}}
                {yellow Http: http://localhost:${port}}
                {blue Health: http://localhost:${port}/ping}
                {magenta ------------}
              `);
        })
    });
