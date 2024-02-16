const Video = require('../models/video.model');

const getAllVideos = (req, res) => {
    Video.find().sort({ createdAt: -1 })
        .then((allVideos) => {
            res.json({ videos: allVideos });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong', error: err });
        });
};


const createVideo = (req, res) => {
    Video.create(req.body)
        .then(newlyCreatedVideo => {
            res.json({ video: newlyCreatedVideo });
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                // If it's a validation error, send a more detailed error response
                return res.status(400).json({ message: 'Validation failed', errors: err.errors });
            }
            console.error(err);
            res.status(500).json({ message: 'Something went wrong', error: err });
        });
};

const deleteVideo = (req, res) => {
    Video.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong', error: err });
        });
};

module.exports = {
    getAllVideos,
    createVideo,
    deleteVideo,
};
