import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true,
        unique: [true, "Email must be unique!"],
        minLengtj: [5, "Email must have at least 5 characters!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        trim: true,
        select: false,
        minLength: [6, "Password must have at least 5 characters!"]
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        select: false,
    },
    verificationCodeValidation: {
        type: Number,
        select: false,
    },
    forgotPasswordCode: {
        type: String,
        select: false,
    },
    forgotPasswordCodeValidation: {
        type: Number,
        select: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);