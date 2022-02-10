
// initialize express
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.RDT_ENV == 'production' ? 80 : 3000;

// get endpoint handlers
const characters = require('./endpoints/characters');

// add access to public files
app.use(express.static('public'));

// mount endpoints
app.use('/characters', characters);

// KLUDGY: hardcode /char route here so that we can send index.html and preserve SPA functionality
app.get('/char/:id', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// add error handler
app.use((err, req, res, next) => {
	if (res.headersSent)
		return next(err);

	// catch error from API call
	res.status(500);
	res.send({ error: err.message });
});

// start server!
app.listen(port, () => {
	console.log(`Republic Data Terminal activated on port ${port}`);
});