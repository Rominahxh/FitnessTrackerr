const VideoController = require('../controllers/video.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/v1/videos',authenticate,  VideoController.getAllVideos);
    app.post('/api/v1/videos',authenticate, VideoController.createVideo);  
    app.delete('/api/v1/videos/:id', authenticate, VideoController.deleteVideo);
}
