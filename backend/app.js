// importing dependencies & modules
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;

// app initialization
const app = express();
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// home route
app.get('/', (req, res) => {
    res.send(`<h1>TaskEasy Backend is up & running</h1>`);
});