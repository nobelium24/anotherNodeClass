const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (request, response)=>{
    response.send([
        {name:"Adewole", age:1111, food:"Beans and bread"},
        {name:"Uthman", age:1120, food:"Rice and beans"},
        {name:"Samuel", age:7, food:"Iyan and Egusi"},
        {name:"Aishat", age:133, food:"Fired rice and chicken"},
        {name:"Issac", age:25, food:"Beans and bread"},
        {name:"Comfort", age:14, food:"Ewa agoyin and yam"},
        {name:"Olu", age:40, food:"fufu and egusi"},
    ])
})

const todoArray = []
let id

app.get("/html", (req, res)=>{
    console.log(__dirname)
    res.sendFile(__dirname + "/index.html")
})

app.get("/todo", (req, res)=>{
    res.render("index", {todoArray: todoArray});
})

app.post("/todo", (req, res)=>{
    console.log(req.body)
    todoArray.push(req.body)
    console.log(todoArray)
    res.render("index", {todoArray: todoArray})
})

app.post("/delete", (req, res)=>{
    let index = req.body.index
    console.log(index)
    todoArray.splice(index, 1)
    res.redirect("/todo")
})

app.get("/edit/:id", (req, res)=>{
    // console.log(req.params.id)
    id = req.params.id
    let title
    let text
    for (let i = 0; i < todoArray.length; i++) {
        const element = todoArray[i];
        title = todoArray[id].title;
        text = todoArray[id].text
    }
    res.render("edit", {todoArray:todoArray, title, text})
})

app.post("/edittodo", (req, res)=>{
    console.log(req.body, id)
    let obj = req.body
    todoArray.splice(id, 1, obj)
    res.redirect("/todo")
})

const server = app.listen("3333", ()=>{
    console.log("The serer has started on port 3333"); 
})