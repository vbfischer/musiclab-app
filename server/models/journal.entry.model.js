const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
import acl from 'mongoose-acl';

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

JournalEntrySchema.plugin(acl.object);


module.exports = mongoose.model('JournalEntry', JournalEntrySchema);