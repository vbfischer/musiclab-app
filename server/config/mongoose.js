import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;
mongoose.set('debug', process.env.MONGOOSE_DEBUG);

export default async function() {

    const db = await mongoose.connect(process.env.DB_CONNECTION, {
        useMongoClient: true
    });

    return db;
}