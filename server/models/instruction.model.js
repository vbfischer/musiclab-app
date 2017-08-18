import mongoose from 'mongoose';
import acl from 'mongoose-acl';

const InstructionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    resource: String
}, {
    timestamps: true
});

InstructionSchema.plugin(acl.object);

export default mongoose.model('Instruction', InstructionSchema);