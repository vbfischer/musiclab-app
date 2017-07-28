const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

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

module.exports = mongoose.model('JournalItem', JournalItemSchema);