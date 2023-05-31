const express = require('express');
const path = require('path');

// initialize app
const app = express();
app.use(express.static('./public'))
app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})


// Routes
app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, 'public/login.html');
    res.sendFile(filePath);
})