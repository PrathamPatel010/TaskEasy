// importing dependencies & modules
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const cors = require('cors');
const bcrypt = require('bcrypt');
const { connectDb } = require('./database/db');
const { User } = require('./database/user');
const { Todo } = require('./database/todo');
const jwt = require('jsonwebtoken');
const secret = process.env.jwtsecret;
const frontend_url = process.env.frontend_url;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

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
app.use(cookieParser());
const corsOption = {
    origin: frontend_url,
    credentials: true,
};
app.use(cors(corsOption));


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
                res.cookie('token', token, { httpOnly: false, secure: true, sameSite: 'none' }).json({ status: 200, message: 'Success!!' });
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
            if (token) {
                res.cookie('token', token, { httpOnly: false, secure: true, sameSite: 'none' }).json({ status: 200, message: 'Success!!' });
            } else {
                console.log(err.message);
            }
        });
    } catch (err) {
        console.log(err.message);
    }
})

// Route for creating a todo
app.post('/api/addTodo', async(req, res) => {
    try {
        // extracting user id from cookies & todo description from request body
        const payload = jwt.verify(req.cookies.token, secret);
        const { description } = req.body;

        // creating a new record
        const newTodo = await Todo.create({ description: description, done: false, user: payload.id });
        res.json({ status: 200, todo: newTodo.description, todoStatus: newTodo.done });
    } catch (err) {
        console.log(err.message);
    }
});

// Route for retrieving todos
app.get('/api/todos', async(req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        const todos = await Todo.find({ user: new mongoose.Types.ObjectId(payload.id) }).select('_id description done');
        console.log(todos);
        res.json(todos);
    } catch (err) {
        console.log(err.message);
    }
});

app.delete('/api/todo/:id', async(req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        const id = req.params.id;
        await Todo.deleteOne({ user: new mongoose.Types.ObjectId(payload.id), _id: id });
        res.json({ status: 200, message: 'Todo deleted' });
    } catch (err) {
        res.json({ status: 400, message: 'Some error occured' });
        console.log(err.message);
    }
})