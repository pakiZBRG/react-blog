const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', usersRoute);

mongoose.connect('mongodb+srv://nikola:TzAHc9MmfHw7CNp@practice.mz8xz.mongodb.net/Practice?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch(() => console.log("MongoDB Connection Error"))

const PORT = process.env.PORT || 5000;
app.listen(PORT)