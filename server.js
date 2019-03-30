const express = require('express');
//const uuid = require('uuid');
const bodyParser = require('body-parser');
const sportsRouter = require('./blog-post-router');
const app = express();
const jsonParser = bodyParser.json();

app.use('/post/api', jsonParser, sportsRouter); // /sports/api

app.listen(8080, () => {
	console.log('Your app is running in port 8080');
});






