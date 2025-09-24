
const express = require('express');
const path = require('node:path');
const app = express();
const port = 8080;
const staticPath = path.join(__dirname, 'frontend')


app.use(express.static(path.join(staticPath,'assets')));

let toggle = true;

app.get('/', (req, res) => {
    if (toggle) {
        res.sendFile(path.join(staticPath, 'index.html'));
    } else {
        res.sendFile(path.join(staticPath, 'thrishala.html'));
    }
    toggle = !toggle;
});

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

