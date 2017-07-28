const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const JournalEntrySchema = mongoose.Schema({
    entryDate: Date,
    items: [{
        type: Types.ObjectId,
        ref: 'JournalItem'
    }],
    notes: String,
    practiceTime: Number

}, {
    timestamps: true
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);