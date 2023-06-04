const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { log } = require('console');

// initialize app
const app = express();

// middlewares
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})

// Routes
app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, 'public/login.html');
    res.sendFile(filePath);
})

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
})

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    // res.json({ "Username": username, "password": password, "E-mail": email });
    console.log(email + '-' + username + ' - ' + password);
    res.redirect('/dashboard');
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.json({ "Username": username, "password": password });
})

app.post('/tasks', (req, res) => {
    // database storing
    // ---
    const resToBeSend = (req.body);
    console.log(resToBeSend);
    res.send(req.body);
})