const userController = require("../controllers/user.controller")
const {authenticate} = require('../config/jwt.config')

module.exports = (app) => {
    app.post("/api/user", userController.createNewUser);
    app.get("/api/user", userController.getAllUsers);
    app.get("/api/user/:id", authenticate, userController.getOneUser);
    app.put("/api/user/:id", authenticate, userController.updateUser);
    app.delete("/api/user/:id", userController.deleteExistingUser);
};
