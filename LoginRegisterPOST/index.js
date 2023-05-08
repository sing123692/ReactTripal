const express = require('express');
const app = express();
const cors = require("cors");

app.listen(8000, () => {
    console.log('Sever running');
})
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use('/css', express.static('css'));

app.use(cors());

// app.get('/re', (req, res) => {
//     // console.log("done");
//     res.sendFile(__dirname + '/register.html');
// }); //render register

app.get('/log', (req, res) => {
    res.sendFile(__dirname + '/login.html');
}); //render login

// app.get('/Success', (req, res) => {
//     console.log("successdone");
//     res.sendFile(__dirname + '/RegisterSuccess.html');
// });


var router1 = require('./js/register.js');
app.use('/', router1);

var router2 = require('./js/login.js');
app.use('/', router2);

