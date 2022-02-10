
// Implements lookup endpoint to return data for Star Wars Characters

// initialize express router
const express = require('express');
const router = express.Router();

// get character reader
const CharacterReader = require('../swapi/character');

// look up a single character
router.get('/:id', async (req, res, next) => {
	var id = req.params.id || 0;

	if (id == 0 || isNaN(id))
	{
		res.status(400);
		res.send({ error: 'Invalid ID: ' + id });
		return;
	}

	try
	{
		// initialize reader
		let reader = new CharacterReader(req.params.id);

		// fetch character data
		let char = await reader.fetch();

		res.send({
			character: char,
		});
	}
	catch(err)
	{
		// if the API call failed return here
		// (in a larger app i would develop a better higher level error catcher)
		if (err.isAxiosError)
		{
			res.status(err.response.status);
			res.send({ error: `Star Wars API returned an error: ${err.response.data.detail}` });
		}
		// otherwise leave for the default handler
		else 
		{
			next(err);
		}
	}
});

// export router
module.exports = router;