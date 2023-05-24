const todoModel = require("../models/todoModel")

const viewTodo = async (req, res) => {
    try {
        const result = await todoModel.find({})
        if (!result) {
            return res.status(500).send({ message: "Error fetching from database", status: false })
        }
        console.log(result)
        res.render("index", { todoArray: result });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", status: false })
    }
}

const createTodo = async (req, res) => {
    console.log(req.body)
    const { title, text } = req.body
    try {
        // const todo = new todoModel({
        //     title,
        //     text
        // })
        // const result = await todo.save()
        //or
        const result = await todoModel.create({ title, text })
        if (!result) {
            return res.status(500).send({ message: "Error saving to database", status: false })
        }
        // console.log(result)
        res.redirect("/todo/viewtodo")
        // return res.status(201).send({ message: "Todo created successfully", status: true })
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", status: false })
    }

}

const deleteTodo = async (req, res) => {
    try {
        let index = req.body.index
        console.log(index)
        const deleteItem = await todoModel.findByIdAndDelete({ _id: index })
        console.log(deleteItem)
        // todoArray.splice(index, 1)
        res.redirect("/todo/viewtodo")
    } catch (error) {
        console.log(error)
    }

}

const viewEditTodo = async (req, res) => {
    try {
        // console.log(req.params.id)
        id = req.params.id
        // for (let i = 0; i < todoArray.length; i++) {
        //     const element = todoArray[i];
        //     title = todoArray[id].title;
        //     text = todoArray[id].text
        // }
        // res.render("edit", { todoArray: todoArray, title, text })
        const todo = await todoModel.findOne({ _id: id })
        console.log(todo)
        const { title, text, _id } = todo
        res.render("edit", { title, text, _id })
    } catch (error) {
        console.log(error)
    }
}

const editTodo = async (req, res) => {
    try {
        console.log(req.body._id)
        let _id = req.body._id
        let newTitle = req.body.title
        let newText = req.body.text
        // let obj = req.body
        // todoArray.splice(id, 1, obj)
        // res.redirect("/todo")
        const updateTodo = await todoModel.findByIdAndUpdate({ _id }, { $set: { title: newTitle, text: newText } })
        console.log(updateTodo)
        res.redirect("/todo/viewtodo")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { viewTodo, deleteTodo, createTodo, viewEditTodo, editTodo }