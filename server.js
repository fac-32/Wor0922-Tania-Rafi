
const express = require('express');
const path = require('node:path');
const app = express();
const port = 8000;
const staticPath = path.join(__dirname, 'frontend')



app.use(express.static(staticPath));

function validateName(req, res, next) {
    const name = req.query.userName;
    const isAlpha = /^[A-Za-z]+$/;
    if (!name || name.trim() === ''|| !isAlpha.test(name)) {
       return res.status(400).send('Please enter a valid name.');
    } 
    next();
}


app.get('/start', validateName, (req, res) => {
    res.sendFile(path.join(staticPath, 'thrishala.html'));
});

app.get('/', (req, res) => {
    res.redirect('/start');
});

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

