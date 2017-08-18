import mongoose from 'mongoose';
import ownable from './ownable.plugin';
import acl from 'mongoose-acl';

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
});

GroupSchema.plugin(ownable);
GroupSchema.plugin(acl.hybrid, {
    key: function() {
        return 'group:' + this._id;
    },
    path: '_members'
});

export default mongoose.model('Group', GroupSchema);
