
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


app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.get('/start', validateName, (req, res) => {
    const name =req.query.userNameme;
    res.sendFile(path.join(staticPath, 'thrishala.html'));
});

app.get('/exit', (req,res) => {
    res.sendFile(path.join(staticPath, "ivon.html"))
})

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

