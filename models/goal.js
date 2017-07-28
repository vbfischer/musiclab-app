const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;


const GoalSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: Types.ObjectId,
            ref: 'Category'
        },
        tags: [{type: String}],
        description: {
            type: String,
            required: true
        },
        reference: {
            type: Types.ObjectId,
            ref: 'Document'
        },
        parentGoal: {
            type: Types.ObjectId,
            ref: 'Goal'
        },
        subGoals: [{
            type: Types.ObjectId,
            ref: 'Goal'
        }],
        goalBPM: Types.Number,
        minsPerSession: Types.Number
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Goal', GoalSchema);