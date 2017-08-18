import _ from 'lodash';
import Joi from 'joi';

export default (schema) => {
    return (req, res, next) => {
        const body = _.extend({}, req.body);

        Joi.validate(body, schema, {abortEarly: false}, (err, schemaResult) => {
            if(err) {
                const errors = _.map(err.details, (item) => {
                    return {
                        error: item.message
                    }
                });

                return res.status(422).send(errors);
            }

            req.schema = schemaResult;
            return next();
        });
    };
}
