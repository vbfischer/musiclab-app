import winston from 'winston';
import * as expressWinston from 'express-winston';

export const logger = new winston.Logger();

export function setupLogging(app) {
    logger.add(winston.transports.Console, {
        type: 'verbose',
        colorize: true,
        prettyPrint: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
    });

    setupExpressLogging(app);
}

function setupExpressLogging(app) {
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                colorize: true
            })
        ]
    }));
}
