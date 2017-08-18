import mongoose from 'mongoose';
import ownable from './ownable.plugin';
import acl from 'mongoose-acl';
import logger from 'winston';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

CategorySchema.plugin(acl.object);

module.exports = mongoose.model('Category', CategorySchema);