const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { log, error } = require('console');
const { User } = require('./auth/models');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = 'secret123';

// initialize app
const app = express();

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/auth')
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});

// middlewares
app.use(express.static('./public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true }));
app.use(cors({
    credentials: true,
}))

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})

// Routes
app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, 'public/login.html');
    res.sendFile(filePath);
})

app.get('/user', (req, res) => {
    const payload = jwt.verify(req.cookies.token, secret);
    User.findById(payload.id)
        .then(userInfo => {
            res.json(userInfo);
        })
})

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
})

app.post('/register', (req, res) => {
    const { mail, pwd } = req.body;
    const hashedPassword = bcrypt.hashSync(pwd, 10);
    const user = new User({ email: mail, password: hashedPassword });
    user.save().then(userInfo => {
        console.log(userInfo);
        jwt.sign({ id: userInfo._id, email: userInfo.email }, secret, (err, token) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.cookie('token', token).json({ id: userInfo._id, email: userInfo.email });
            }
        })
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.json({ "E-mail": email, "password": password });
})

app.post('/tasks', (req, res) => {
    // database storing
    // ---
    const resToBeSend = (req.body);
    console.log(resToBeSend);
    res.send(req.body);
})