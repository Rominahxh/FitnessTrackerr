const WorkOutController = require('../controllers/workout.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/workouts',authenticate,  WorkOutController.getAllWorkOuts);
    app.post('/api/workout',authenticate, WorkOutController.createWorkOut);  
    app.get('/api/workout/:id',authenticate, WorkOutController.getOneWorkOut);
    app.put('/api/workout/:id',authenticate, WorkOutController.getOneWorkOutAndUpdate);
    app.delete('/api/workout/:id', WorkOutController.deleteWorkOut);
    //app.patch('/api/workout/:id', authenticate, WorkOutController.getOneWorkOutAndUpdate);
}
