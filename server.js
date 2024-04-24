const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


const app = express();
const port = 3000;

app.set("view engine", "ejs");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/finder');

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});