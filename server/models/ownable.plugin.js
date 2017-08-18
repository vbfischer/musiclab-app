import {Schema} from 'mongoose';

const plugin = (schema, options) => {
    schema.add({
        owner_id: {
            type: Schema.Types.ObjectId,
            require: true
        }
    });
};

export default plugin;