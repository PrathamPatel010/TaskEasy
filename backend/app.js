// importing dependencies & modules
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const cors = require('cors');
const bcrypt = require('bcrypt');
const { connectDb } = require('./database/db');
const { User } = require('./database/user');
const jwt = require('jsonwebtoken');
const secret = process.env.jwtsecret;

// app initialization
const app = express();
const getDbConnection = () => {
    try {
        connectDb();
        app.listen(PORT, () => {
            console.log(`Server is listening on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(err.message);
    }
}
getDbConnection();

// middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// home route
app.get('/', (req, res) => {
    res.send(`<h1>TaskEasy Backend is up & running</h1>`);
});

// register the user
app.post('/api/register', async(req, res) => {
    try {
        const { username, password } = req.body;

        // check if user already exist
        const UserExist = await User.findOne({ username });
        if (UserExist) {
            return res.json({ status: 400, message: 'User Already Exist, You just need to login' });
        }

        // if not, then register the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        jwt.sign({ id: user._id, username }, secret, (err, token) => {
            if (err) {
                console.log(err.message);
            } else {
                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' }).json({ status: 200, message: 'Success!!' });
            }
        })
    } catch (err) {
        console.log(err.message);
    }
});

// login route
app.post('/api/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // if no user exist, this query will return result with rowCount=0
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ status: 404, message: 'No User Found, You need to register' });
        }

        // if user exist, it will return User Object.
        const hashedPassword = user.password;
        const passCheck = await bcrypt.compare(password, hashedPassword);

        // case: password does not match username
        if (!passCheck) {
            return res.json({ status: 501, message: 'Wrong Username OR password!!' });
        }

        // case: password matches username
        jwt.sign({ id: user._id, username }, secret, (err, token) => {
            if (err) {
                console.log(err.message);
            } else {
                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' }).json({ status: 200, message: 'Success!!' });
            }
        })
    } catch (err) {
        console.log(err.message);
    }
})