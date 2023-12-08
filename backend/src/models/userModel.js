const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now(),
        },
        verified: {
            type: Boolean,
            enum: [true, false],
            default: false,
        },
    }
);

module.exports = mongoose.model("user", UserSchema);