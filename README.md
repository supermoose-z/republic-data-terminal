Republic Data Terminal
======================

How to run locally
==================

To run the project locally, make sure Node and Yarn are installed. Then run the following commands:

Install dependencies:

`$ yarn install`

Use nodemon to automatically reload code changes

`$ npx nodemon index`

Or just run index.js to run the server normally

`$ node index`

To enable updates to JavaScript changes using webpack --watch

`$ yarn watch`

Or, just build the production scripts before running node index above

`$ yarn build`

Other notes
==================

To run on port 80, create an environment variable called PORT and set it to 80, otherwise it will default to 3000.


Project Structure
==================

- endpoints
	- Scripts that implement various API endpoints, right now there's just one for /characters/:id
- public
	- Static frontend assets
- src
	- Vue/SASS source scripts
- swapi
	- Basic swapi.dev wrapper

The bootstrap script is in index.js. This script is responsible for setting up the express.js instance and configuring routing/middleware.
