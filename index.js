const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoute");
require("dotenv").config()

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todo", todoRoutes)

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





const todoArray = []
let id

app.get("/html", (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + "/index.html")
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