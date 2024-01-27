const registerLogInController = require('../controllers/registerLogIn.controller');
const {authenticate} = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/register', registerLogInController.register);
    app.post('/api/login', registerLogInController.login)
    app.post('/api/logout', authenticate, registerLogInController.logout)

}
