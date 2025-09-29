
const express = require('express');
const path = require('node:path');
const { setTimeout } = require('node:timers');
const app = express();
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({
    keyFilename: '/Users/Thrishala/Downloads/Day4 Fac32/Wor0922-Tania-Rafi/keys/core-sprite-268808-b535e2df1210.json'
});


const port = 8000;
const staticPath = path.join(__dirname, 'frontend')

app.use(express.json()); 

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

app.get('/userCategory', (req,res) => {
    res.sendFile(path.join(staticPath, 'thrishala.html'));
});

app.get('/feedback', (req, res) => {
    res.sendFile(path.join(staticPath, "ivon.html"));
});

app.get('/exit', (req,res) => {
    res.sendFile(path.join(staticPath, "ivon.html"));
})

app.post('/translate', async(req, res) => {
    const { text, target } = req.body;
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    res.send(translations[0]);
})

app.get('/sentenceTranslation', (req, res) => {
    res.sendFile(path.join(staticPath, "sentence.html"));
})

app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

