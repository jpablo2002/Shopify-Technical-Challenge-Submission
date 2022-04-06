'use strict';
const express = require('express');
const https = require('https');

const formatDate = function (date) {
	return date.toISOString().split("T")[0];
  };

let to_date = new Date();
let from_date = new Date();
from_date.setDate(from_date.getDate() - 10);
const api_key = 'LgMSmaBZAb4Ob7M36pdmsrt9PlYXzbx1dUHbsnck';

const app = express();

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.listen(port);

app.use(express.static('public'));

app.get('/', (req, res) => {
	to_date = new Date();
	from_date = new Date();
	from_date.setDate(from_date.getDate() - 10);
	res.render('index')
});

app.get('/new-imgs', (req, res) => {
	https.get(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=${formatDate(from_date)}&end_date=${formatDate(to_date)}`, (resp) => {
		to_date.setDate(to_date.getDate() - 10);
		from_date.setDate(from_date.getDate() - 10);
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			let imgs = JSON.parse(data);
			res.send({ imgs })
		});

		}).on("error", (err) => {
		console.log("Error: " + err.message);
			
		});
})
