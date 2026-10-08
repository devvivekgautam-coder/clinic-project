const express = require('express');
const db = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const indexRouter = require('./routers/index.router');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', indexRouter);

db();

app.listen(port, (error) => {
    if (error) {
        console.log('Failed to start server:', error.message);
    } else {
        console.log(`Server Is Running On Port: http://localhost:${port}`);
    }
});