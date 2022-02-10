
const axios = require('axios');

// implement class to wrap up Star Wars API
class StarWars
{
	constructor()
	{
		// create axios instance to access star wars api
		this.api = axios.create({
			baseURL: 'https://swapi.dev/api'
		});
	}

	// manually pull a fully formed url from the API
	async call(url, params)
	{
		return await axios.get(url, { params });
	}

	// fetch a single character
	async getPerson(id)
	{
		var result = await this.api.get(`/people/${id}`);
		return result.data;
	}
}

module.exports = StarWars;