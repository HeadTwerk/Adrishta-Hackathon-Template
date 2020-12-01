const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('./home.html', { root: __dirname });
});
app.get('/about', (req, res) => {
    res.sendFile('./about.html', { root: __dirname });
});
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', { root: __dirname });
});
    
app.listen(port, () => console.log(`listening on port ${port}!`));