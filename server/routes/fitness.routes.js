/*const fitnessController = require("../controllers/fitness.controller")

module.exports = (app) => {
    app.post("/api/fitness", fitnessController.createNewFitness);
    app.get("/api/fitness", fitnessController.getAllFitness);
    app.get("/api/fitness/:id", fitnessController.getOneFitness);
    app.put("/api/fitness/:id", fitnessController.updateFitness);
    app.delete("/api/fitness/:id", fitnessController.deleteExistingFitness);
    app.post("/api/week", fitnessController.createNewWeek);
    app.post("/api/day", fitnessController.createNewDay);
};
