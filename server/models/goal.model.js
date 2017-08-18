const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
import ownable from './ownable.plugin';
import acl from 'mongoose-acl';

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
        user: {
            type: Types.ObjectId,
            ref: 'User'
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

GoalSchema.plugin(acl.object);

module.exports = mongoose.model('Goal', GoalSchema);