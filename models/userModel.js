const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true },
    wallet: { type: Number, required: true, default: 1000 },
    isAdmin: { type: Boolean, default: false },
    reviews: {
        type: [{
            email: { type: String, required: true },
            review: { type: String, required: true }
        }], required: true
    }
})

let userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)

module.exports = userModel