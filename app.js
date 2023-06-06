require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { User } = require('./database/models')
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = 'secret123';
const { authenticateUser } = require('./middleware/authenticateUser');
const { Todo } = require('./database/todos');

// initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// database connection
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })

// middlewares
app.use(express.static('./public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true }));
app.use(cors({
    credentials: true,
}))


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

app.get('/dashboard', authenticateUser, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
})

app.post('/register', async(req, res) => {
    const { mail, pwd } = req.body;
    try {
        const check = await User.findOne({ email: mail })
        if (check) {
            res.json({ flag: 1 });
        } else {
            const hashedPassword = bcrypt.hashSync(pwd, 10);
            const user = new User({ email: mail, password: hashedPassword });
            user.save().then(userInfo => {
                jwt.sign({ id: userInfo._id, email: userInfo.email }, secret, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.cookie('token', token).json({ id: userInfo._id, email: userInfo.email });
                    }
                })
            })
        }
    } catch (err) {
        console.log(err);
    }
})

app.post('/login', async(req, res) => {
    const { mail, pwd } = req.body;
    User.findOne({ email: mail })
        .then((userInfo) => {
            // console.log(userInfo);
            const passOk = bcrypt.compareSync(pwd, userInfo.password);
            if (passOk) {
                jwt.sign({ id: userInfo._id, mail: userInfo.email }, secret, (err, token) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.cookie('token', token).json({ id: userInfo._id, email: userInfo.email });
                    }
                })
            } else {
                console.log(`Wrong E-mail OR password`);
                res.json({ flag: 401 });
            }
        })
        .catch((err) => {
            console.log(`No email found`);
            res.json({ flag: 404 });
        })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').send();
})
app.post('/todos', (req, res) => {
    const payload = jwt.verify(req.cookies.token, secret);
    const { task } = req.body;
    const newTodo = new Todo({ text: task, done: false, user: payload.id })
    newTodo.save().then((response) => {
        res.json(response);
    })
})

app.get('/todos', async(req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        const todos = await Todo.find({ user: new mongoose.Types.ObjectId(payload.id) });
        res.json(todos);
    } catch (err) {
        console.log(err);
    }
})

app.delete('/todos', async(req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        const taskText = req.query.text;
        await Todo.deleteOne({ user: new mongoose.Types.ObjectId(payload.id), text: taskText });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});