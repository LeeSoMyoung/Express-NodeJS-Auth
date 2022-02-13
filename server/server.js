'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const signUpRouter = require('./routes/signUp.js');

const PORT = process.env.PORT || 8081;

app.use('/src',express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.json());

app.use('/sign-up',signUpRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'src', 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;