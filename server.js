const express = require('express');
const path = require("path");
const app= express();
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
const bodyParser = require('body-parser');















// app.use(bodyParser.urlencoded({extended:true}));
const staticpath = path.join(__dirname, "/style.css");

app.use('/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
// app.use('/js', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));


app.use(express.urlencoded({ extended: false }))
// // urlencoded se express ko bata rhe ki form ka data do hmko .

app.use(express.static(staticpath));




mongoose.connect("mongodb://localhost:27017/mernstack" , {
    useNewUrlParser : true,
    useUnifiedTopology : true,

})

const mernschema={
    name : String,
    contact : String ,
    email : String,
    address : String,
    message : String
}


const Note = mongoose.model("Note",mernschema);

app.get("/" , function(req,response){
    response.sendFile(__dirname +"/index.html");
})
app.get("/about" , function(req,response){
    response.sendFile(__dirname +"/About.html");
})

app.post("/", function(req,res){
    let newNote = new Note({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        message:req.body.message
    });
    newNote.save();
    res.redirect("/about");
})





app.listen(3000,function(){
    console.log('server is running at port 3000');
})



