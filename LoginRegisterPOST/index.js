const express = require('express');
const app = express();
const cors = require("cors");
const passportSetup = require("./js/passport.js");
const passport = require("passport");
const cookieSession = require('cookie-session');


app.listen(8000, () => {
    console.log('Sever running');
})
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use('/css', express.static('css'));

app.use(cors());

app.use(cookieSession(
    {
        name :"session",
        keys : ["lama"],
        maxAge: 10 * 1000 //24*60*60*100
    }
));

app.use(passport.initialize());
app.use(passport.session());


// app.get('/re', (req, res) => {
//     // console.log("done");
//     res.sendFile(__dirname + '/register.html');
// }); //render register

// app.get('/log', (req, res) => {
//     res.sendFile(__dirname + '/login.html');
// }); //render login

// app.get('/Success', (req, res) => {
//     console.log("successdone");
//     res.sendFile(__dirname + '/RegisterSuccess.html');
// });


var router1 = require('./js/register.js');
app.use('/', router1);

var router2 = require('./js/login.js');

app.use('/', router2);

const authRoute = require("./js/auth.js");
app.use("/auth",authRoute);

app.use((req, res, next)=>{
    if(req.session.user){
        next();
    }else{
        res.redirect('/login');
    }
    console.log(req.session.user);
});

app.get('/getSessionData',(req, res)=>{
    const sessionData = req.session.user;
    res.json(sessionData);
})
