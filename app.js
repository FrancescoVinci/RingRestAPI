const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoute = require('./routes/api');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit : "50mb"
}));

app.use('/api', apiRoute);

app.listen(3000);