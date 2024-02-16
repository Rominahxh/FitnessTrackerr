const mongoose = require('mongoose');

const Video = new mongoose.Schema({
    title: { 
        type: String,
        // required: [true, 'The title is required']
    },
    videoUrl: {
        type: String,  
        required: [true, 'The video URL is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Video', Video);
