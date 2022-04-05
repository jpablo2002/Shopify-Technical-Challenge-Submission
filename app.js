'use strict';
const express = require('express');

const api_key = 'LgMSmaBZAb4Ob7M36pdmsrt9PlYXzbx1dUHbsnck';

const app = express();

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.listen(port);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index', {key: api_key});
});