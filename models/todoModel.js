const mongoose = require ("mongoose")
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: String
})
const todoModel = mongoose.models.todo_tbs || mongoose.model("todo_tbs", todoSchema)

module.exports = todoModel