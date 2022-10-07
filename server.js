const express = require('express');
const dotenv = require("dotenv");

dotenv.config({path : './config/config.env'});

const notes = require('./routes/notes')
const app = express();

app.use('/api/v1/notes', notes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});