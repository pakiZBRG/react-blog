const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const cookie = require('cookie-parser');
const cors = require('cors');
const config = require('./config/key').mongoURI;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie());
app.use(cors());

app.use('/api/users', usersRoute);

mongoose.connect(config, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch(() => console.log("MongoDB Connection Error"));

const PORT = process.env.PORT || 5000;
app.listen(PORT);