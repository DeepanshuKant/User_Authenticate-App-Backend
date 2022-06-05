const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: { type: String },
        password: { type: String, require: true },
        email: { type: String, require: true, unique: true }
    }
)

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;