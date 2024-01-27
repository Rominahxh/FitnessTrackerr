const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
firstName: {
    type: String,
    required: [true, "First Name is required"],
    minLength: [3, "First Name must be at least 3 characters"],
},
lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minLength: [3, "Last Name must be at least 3 characters"],
},
gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Gender is required"],
},
age: {
    type: Number,
    required: [true, "Age is required"],
    min: [16, "Age must be at least 16"],
},
height: {
    type: Number,
    required: [true, "Height is required"],
    min: [1, "Height must be at least 1"],
},
weight: {
    type: Number,
    required: [true, "Weight is required"],
    min: [1, "Weight must be at least 1"],
},
bmi: {
    type: Number,
},
email: {
    type: String,
    required: [true, "Email is required"],
    validate: [
    {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email!"
    },
    {
        validator: async val => {
        let foundUser = await mongoose.models.User.findOne({ email: val });
        return !foundUser;
        },
        message: "This email already exists, try another one!"
    }
    ]
},
password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
},
program:{ type: mongoose.Schema.ObjectId,ref:'Fitness'}
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
.get(function () {
    return this._confirmPassword;
})
.set(function (value) {
    this._confirmPassword = value;
});

UserSchema.pre('validate', function (next) {
if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
}
next();
});

// Pre-save hook to hash the password before saving to the database
UserSchema.pre('save', async function (next) {
try {
    // Check if the password has been modified before hashing
    if (!this.isModified('password')) {
    return next();
    }

    // Hash the password
    const hash = await bcrypt.hash(this.password, 10);

    // Set the hashed password
    this.password = hash;
    next();
} catch (error) {
    next(error);
}
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
