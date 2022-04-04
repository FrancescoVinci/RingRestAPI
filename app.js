require('dotenv').config()

const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const app = express();
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

let server;
if(process.env.HTTPS && process.env.HTTPS.toLowerCase() === 'true') {
	let credentials = {
		key: fs.readFileSync(process.env.HTTPS_KEY, 'utf8'),
		cert: fs.readFileSync(process.env.HTTPS_CERT, 'utf8')
	};

	server = https.createServer(credentials, app);
}
else {
	server = http.createServer(app);
}

server.listen(process.env.PORT || 8000, '0.0.0.0')
