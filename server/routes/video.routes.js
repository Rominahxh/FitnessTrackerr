const VideoController = require('../controllers/video.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/video',authenticate,  VideoController.getAllVideos);
    app.post('/api/video',authenticate, VideoController.createVideo);  
    app.delete('/api/video/:id', authenticate, VideoController.deleteVideo);
}
