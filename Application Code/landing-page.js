const express = require('express');      //Importing express library
const app = express();                //Creating the express app
const port = 3000;                      //port to listen on

//To Serve files as requested by address 
app.get('/', (req, res) => {
    res.sendFile('./landing-page/home.html', { root: __dirname });
});

app.get('/webtest', (req, res) => {
    res.sendFile('./landing-page/webtest.html', { root: __dirname });
});     