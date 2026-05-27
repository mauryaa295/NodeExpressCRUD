const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const  { v4 : uuidv4 } = require("uuid") ;
// uuidv4(); // ⇨ 'ab16e731-6cee-424d-81a0-5929e9bdb0cc'

app.use(express.urlencoded({extended : true}));

const path = require("path");
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let posts = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content : "i love coding"
    },
    {
        id : uuidv4(),
        username : "anand",
        content : "hardwork is important to achieve success"
    },
    {
        id : uuidv4(),
        username : "mauryaa",
        content : "I got selected for my 1st internship"
    }
]

app.get("/posts",(req,res)=>{ //HomePage
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{ //Post New
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{ //Add New
    let id =uuidv4();
    let {username,content} =req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{ //
    let {id} = req.params;
    const post = posts.find((p)=> p.id === id);
    res.render("show.ejs",{post});
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    const post = posts.find((p)=> p.id === id);
    res.render("edit.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    const post = posts.find((p)=> p.id === id);
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> p.id !== id);
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})