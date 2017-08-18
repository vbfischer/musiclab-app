const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
import ownable from './ownable.plugin';
import acl from 'mongoose-acl';

const JournalItemSchema = new mongoose.Schema({
    goal: {
        type: Types.ObjectId,
        ref: 'Goal'
    },
    bpmMin: Number,
    bpmMax: Number,
    minutes: Number,
    notes: String,
    parentEntry: {
        type: Types.ObjectId,
        ref: 'JournalEntry'
    }
}, {
    timestamps: true
});

JournalItemSchema.plugin(acl.object);

module.exports = mongoose.model('JournalItem', JournalItemSchema);