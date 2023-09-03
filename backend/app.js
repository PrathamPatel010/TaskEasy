// importing dependencies & modules
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const cors = require('cors');
const pool = require('./database/db');
const bcrypt = require('bcrypt');


// app initialization
const app = express();
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

// middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// home route
app.get('/', (req, res) => {
    res.send(`<h1>TaskEasy Backend is up & running</h1>`);
});

// register the user
app.post('/register', async(req, res) => {
    try {
        const { username, password } = req.body;

        // check if user already exist
        const userExist = await pool.query('SELECT * FROM userdata where username = $1', [username]);
        if (userExist.rowCount > 0) {
            return res.json({ status: 400, message: 'User Already Exist,You just need to login' });
        }

        // if not, then register the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO userdata (username,password) VALUES($1,$2) RETURNING *", [username, hashedPassword]
        );
        res.json({ UserInfo: newUser.rows[0], status: 200, message: 'Success!!' });
    } catch (err) {
        console.log(err.message);
    }
});

// login route
app.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // if no user exist, this query will return result with rowCount=0
        const userResult = await pool.query("select * from userdata where username=$1", [username]);
        if (userResult.rowCount == 0) {
            return res.json({ status: 404, message: "No User found!, You need to register" });
        }

        // if user exist, it will return password in 1st row, compare it with hashed password.
        const passCheck = await bcrypt.compare(password, userResult.rows[0].password);

        // case: password does not match username
        if (!passCheck) {
            return res.json({ status: 501, message: 'Wrong Username OR password!!' });
        }

        // case: password matches username
        res.json({ status: 200, message: 'Success!!', user: userResult.rows[0] });
    } catch (err) {
        console.log(err.message);
    }
})