const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
    response.send([
        { name: "Adewole", age: 1111, food: "Beans and bread" },
        { name: "Uthman", age: 1120, food: "Rice and beans" },
        { name: "Samuel", age: 7, food: "Iyan and Egusi" },
        { name: "Aishat", age: 133, food: "Fired rice and chicken" },
        { name: "Issac", age: 25, food: "Beans and bread" },
        { name: "Comfort", age: 14, food: "Ewa agoyin and yam" },
        { name: "Olu", age: 40, food: "fufu and egusi" },
    ])
})

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

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: String
})
const todoModel = mongoose.models.todo_tbs || mongoose.model("todo_tbs", todoSchema)

const todoArray = []
let id

app.get("/html", (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + "/index.html")
})

app.get("/todo", async (req, res) => {
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
})

app.post("/todo", async (req, res) => {
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
        res.redirect("/todo")
        // return res.status(201).send({ message: "Todo created successfully", status: true })
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", status: false })
    }

})

app.post("/delete", async (req, res) => {
    try {
        let index = req.body.index
        console.log(index)
        const deleteItem = await todoModel.findByIdAndDelete({ _id: index })
        console.log(deleteItem)
        // todoArray.splice(index, 1)
        res.redirect("/todo")
    } catch (error) {
        console.log(error)
    }

})

app.get("/edit/:id", async (req, res) => {
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
})

app.post("/edittodo", async (req, res) => {
    try {
        console.log(req.body._id)
        let _id = req.body._id
        let newTitle = req.body.title
        let newText = req.body.text
        // let obj = req.body
        // todoArray.splice(id, 1, obj)
        // res.redirect("/todo")
        const updateTodo = await todoModel.findByIdAndUpdate(
            { _id }, { $set: { title: newTitle, text: newText } })
        console.log(updateTodo)
        res.redirect("/todo")
    } catch (error) {
        console.log(error)
    }
})

const uri = process.env.MONGODB_URI
const connect = () => {
    try {
        mongoose.set("strictQuery", false)
        mongoose.connect(uri)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}
connect()
const server = app.listen("3333", () => {
    console.log("The serer has started on port 3333");
})