
// implement class to read a character and their extended data

// get star wars api
const StarWars = require('./api');

// small utility function to extract the desired fields into a new object
function extractFields(obj, fields)
{
	var result = {};

	for(var fld of fields)
		result[fld] = obj[fld] || '';

	return result;
}

class CharacterReader
{
	constructor(id)
	{
		// initialize API
		this.api = new StarWars();

		// id of character we're going to read
		this.characterId = id;

		// initialize storage for nested data
		this.character = {};
		this.homePlanet = {};
		this.species = [];
		this.films = [];
	}

	// load home planet
	async _loadPlanet(url)
	{
		// load planet data
		var result = await this.api.call(url);

		// extract desired fields
		this.homePlanet = extractFields(result.data, ['url', 'name', 'terrain', 'population']);
	}

	// load species
	async _loadSpecies(urls)
	{
		for(var url of urls)
		{
			let result = await this.api.call(url);
			let extracted = extractFields(result.data, ['url', 'name', 'average_lifespan', 'classification', 'language']);
			
			this.species.push(extracted);
		}
	}

	// load films
	async _loadFilms(urls)
	{
		for(var url of urls)
		{
			let result = await this.api.call(url);
			let extracted = extractFields(result.data, ['url', 'title', 'director', 'producer', 'release_date']);
			
			this.films.push(extracted);
		}
	}


	// internal method to load everything
	async _loadMain()
	{
 		// pull data from API
		var rawChar = await this.api.getPerson(this.characterId);

		// setup primary result object
		this.character = extractFields(rawChar, ['url', 'name', 'height', 'mass', 'hair_color', 'skin_color', 'birth_year', 'gender']);

		// load homeplanet
		if (rawChar.homeworld)
			await this._loadPlanet(rawChar.homeworld);

		// load species (if array is empty assume human?)
		if (rawChar.species && rawChar.species.length > 0)
			await this._loadSpecies(rawChar.species);
		else
			await this._loadSpecies(['https://swapi.dev/api/species/1/']);

		// load films
		if (rawChar.films && rawChar.films.length > 0)
			await this._loadFilms(rawChar.films);
	}

	// load all data and return object
	async fetch()
	{
		await this._loadMain();

		return {
			...this.character,
			home_planet: this.homePlanet,
			species: this.species,
			films: this.films,
		}
	}

}

module.exports = CharacterReader;