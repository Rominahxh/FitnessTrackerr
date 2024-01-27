const WorkOut = require('../models/workout.model');

const getAllWorkOuts = (req, res) => {
    WorkOut.find().sort({createdAt:-1})
        .then((allWorkOuts) => {
            
            res.json({ workOuts: allWorkOuts })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });
}

const getOneWorkOut = (req, res) => {
    WorkOut.findOne({ _id: req.params.id })
        .then(oneWorkOut => {
            res.json({ workOut: oneWorkOut })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });}

const createWorkOut = (req, res) => {
    WorkOut.create(req.body)
        .then(newlyCreatedWorkOut => {
            res.json({ workOut: newlyCreatedWorkOut });
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
            // If it's a validation error, send a more detailed error response
            return res.status(400).json({ message: 'Validation failed', error: err.errors });
        }
            console.log(err);
            res.status(500).json({ message: 'Something went wrong', error: err });
        });
};
        

const getOneWorkOutAndUpdate = (req, res) => {
    WorkOut.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true}
    )
        .then(updatedWorkOut => {
            res.json({ workOut: updatedWorkOut })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });}
        

const deleteWorkOut = (req, res) => {
    WorkOut.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports = { 
    getAllWorkOuts, 
    getOneWorkOut, 
    createWorkOut, 
    getOneWorkOutAndUpdate,
    deleteWorkOut,
};
