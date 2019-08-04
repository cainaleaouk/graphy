require('isomorphic-fetch');
const express = require('express');
const portfinder = require('portfinder');
const Redis = require('ioredis');
const { scaleLinear } = require('d3-scale');

// init express
const app = express();

// init redis; how to use: https://github.com/luin/ioredis#basic-usage
// const redis = new Redis();

const isSet = require('./validators').isSet;
const isValidDate = require('./validators').isValidDate;
const isValidPrice = require('./validators').isValidPrice;

/**
 * Use D3 to map values to the (x, y) position on the ASCII line chart.
 * https://github.com/d3/d3-scale#linear-scales
 * https://observablehq.com/@d3/d3-scalelinear
 *
 * @example
 * const x = scaleLinear().domain([-100, 100]).range([0, 10]);
 * x(35); // 6.75
 * x(-80); // 1
 */

// do your magic here 👇


const PRICES_KEY = 'daily_prices';

 const queryValidators = {
 	symbol:isSet,
 	since:isValidDate,
 	until:isValidDate,
 	price:isValidPrice,
 };

// do your magic here 👇
app.get('/ascii', async(req, res) => {

	console.log('HERE! GET ascii');

	try {
		const queryObj = getValidatedQuery(req.query);

		res.send(queryObj);
	} catch (e) {
		res.send(e);
	}
});


function getValidatedQuery(query) {
	let validatedQuery = {};

	Object.keys(queryValidators).forEach((queryKey) => {
		const queryValue = query[queryKey];

		// price is optional, so if has no value set just skip
		if (queryKey === 'price' && !queryValue) {
			validatedQuery.price = 'close'; // default value
			return;
		}

		// check if all required keys are in the queryParams
		if (!queryValue) {
			throw (`Query param key (${queryKey}) is missing in the request`);
		}

		// check if all the values passed in the params are valid
		if (!queryValidators[queryKey](queryValue)) {
			throw (`Query value for (${queryKey}) is not in the correct format`);	
		}

		validatedQuery[queryKey] = query[queryKey];
	});

	return validatedQuery; 
}


// find an open port
portfinder.getPort((err, port) => {
  if (err) {
    throw err;
  }

  // start the server
  app.listen(port, () => console.log(`Running on :${port} 👍`));
});
