const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoute = require('./routes/api');
const cors = require('cors');


app.use(function (req, res, next){
	res.setHeader('Access-Control-Allow-Origin', 'https://www.dsi.unive.it'); 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(cors());

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit : "50mb"
}));

app.use('/api', apiRoute);

app.listen(8002);