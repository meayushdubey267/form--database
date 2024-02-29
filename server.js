const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({extended:true}));
const staticpath = path.join(__dirname, "/style.css");

app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
// app.use('/js', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));

app.use(express.urlencoded({ extended: false }));
// // urlencoded se express ko bata rhe ki form ka data do hmko .

app.use(express.static(staticpath));

mongoose.connect("mongodb://localhost:27017/mernstack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mernschema = {
  name: String,
  contact: String,
  email: String,
  address: String,
  message: String,

  // video data
  // video_status : String, // playing or finished
  totalTime: String,
  percentage: String,
};

const Note = mongoose.model("Note", mernschema);

app.get("/", function (req, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/about", function (req, response) {
  response.sendFile(__dirname + "/About.html");
});

// function updateObject(event) {
//     event.preventDefault();
//     let name = document.getElementById('input1').value;
//     let contact = document.getElementById('input2').value;
//     let email = document.getElementById('input3').value;
//     let address = document.getElementById('input4').value;
//     let message = document.getElementById('input5').value;
//     let formData = getFormData();
//     formData.name = name;
//     formData.contact = contact;
//     formData.email = email;
//     formData.address = address;
//     formData.message = message;
//     storeFormData(formData);
//     window.location.href = "About.html";
//     // console.log(formData);
// }

const receivedData=[], totalPercentage=0;

app.use(bodyParser.json());

app.post("/data", (req, res) => {
  console.log("response ", res);
  receivedData[0] = req.body.data;
  totalTime: receivedData;
  console.log("ert", receivedData);
  // console.log("data received in server.js ", receivedData);
  res.send("Success");
});

console.log("@@@@", receivedData[0]);
const x = Math.random().toFixed(4);
const y = (x / 46) * 100;
app.post("/", function (req, res) {
  let newNote = new Note({
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    address: req.body.address,
    message: req.body.message,
    totalTime: receivedData || x,
    percentage: totalPercentage || y,
  });

  // console.log(newNote );
  newNote.save();
  res.redirect("/about");
});

app.listen(3000, function () {
  console.log("server is running at port 3000");
});
