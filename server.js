const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const User = require('./models/user');


const app = express();
const port = 3000;

app.set("view engine", "ejs");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mohan');

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/signup', (req, res) => {
    res.render("signup");
})

// Post requests

// For Login
app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.uname });
        if (user) {
            var pwd = user.password;
            if(pwd === req.body.password) {
                res.render('home');
            } else {
                res.status(500).json({error: "Username / password incorrect"});
            }
        } else {
            res.status(500).json({error: "Username / password incorrect"});
        }
});

// For Sign Up
app.post('/signup', async (req, res) => {

    try {
        await User.create({
            username: req.body.uname,
            password: req.body.password
        });

        res.render('login');
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});