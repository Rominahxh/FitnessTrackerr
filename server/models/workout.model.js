const mongoose = require('mongoose');

const WorkOut = new mongoose.Schema({
    title: { 
        type: String,
        minLength: [3, 'The question should be more then 3 characters'],
        required: [true, 'The title is required']
    },
    description: { 
        type: String,
    },
    imageUrl: {
        type: String,  
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('WorkOut', WorkOut);
