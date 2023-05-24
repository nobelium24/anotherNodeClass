const express = require("express")
const { viewTodo, createTodo, deleteTodo, viewEditTodo, editTodo } = require("../controllers/todoController")
const todoRoutes = express.Router()

todoRoutes.get("/viewtodo", viewTodo)
todoRoutes.post("/createtodo", createTodo)
todoRoutes.post("/deletetodo", deleteTodo)
todoRoutes.get("/edit/:id", viewEditTodo)
todoRoutes.post("/edittodo", editTodo)

module.exports = todoRoutes