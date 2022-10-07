const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/db');

dotenv.config({path : './config/config.env'});

connectDB();

const notes = require('./routes/notes');

const app = express();

app.use(express.json());

app.use('/api/v1/notes', notes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});