//required to read variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/homeRoutes');
const articleRoutes = require('./routes/addRoutes');
const cors = require('cors');

//declaring express app
const app = express();
//middleware
app.use(express.json());
app.use(cors());
//routes
app.use('/', homeRoutes)
app.use(articleRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Connected to database and Server start on port', process.env.PORT);
    })
}) .catch((err) => {
    console.log(err);
});