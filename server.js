const express = require('express');
const fs = require('fs');
const bodyParser= require('body-parser')
const app = express();

// use MongoClient to connect to database;
const MongoClient = require('mongodb').MongoClient

// reference to databse;
var db;

// var logFile = fs.createWriteStream('./myLogFile.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode
// app.use(express.logger({stream: logFile}));

// connect to mLab database
const databaseString = "mongodb://admin:admin@ds037827.mlab.com:37827/water";
MongoClient.connect(databaseString, (err, database) => {
  if (err) return console.log(err)

  db = database

  // using express to listen for requests
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

// POST requests go in here
// extract data from form and add data to 'body' property in req object
app.use(bodyParser.urlencoded({extended: true}))

// Route parameters for "/" request
// using express to handle a get request ; using ES6 =>
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log("got a request!");
})

// dummy post request to test for adding two strings
app.post('/quotes', (req, res) => {

  var a = parseFloat(req.body.param1);
  var b = parseFloat(req.body.param2);
  res.send("<p>" +  (a+b) + "</p>");
})


app.post('/getFountains', (req, res) => {

  var a = parseFloat(req.body.param1);
  var b = parseFloat(req.body.param2);

  db.collection('WaterFountains').find({loc: {$near:[a, b]}}).limit(10).toArray((err, result) => {
    if (err) return console.log(err)

  res.send(JSON.stringify(result));
  })
})

app.get('/getall', (req, res) => {
  console.log("got a request for all JSON");

  db.collection('WaterFountains').find().toArray((err, result) => {
    if (err) return console.log(err)

    // send as JSON string
    res.send(JSON.stringify(result));
  })
})
