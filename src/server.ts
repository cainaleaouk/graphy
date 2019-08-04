import 'isomorphic-fetch';

import express from 'express';
import portfinder from 'portfinder';

import { PriceTypes, Query } from './types';
import { QueryValidatorMap, queryValidators } from './validators';
import { Request, Response } from 'express-serve-static-core';

import { stocksApi } from './stocksApi';
import { withCache } from './withCache';
import { getGraph } from './simpleGraph';

// init express
const app = express();

const retrieveData = withCache(stocksApi);

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
app.get('/ascii', async (req: Request, res: Response) => {

	console.log('HERE! GET ascii');

	try {
		const queryObj = getValidatedQuery(req.query);

		const data = await retrieveData(queryObj);

		res.send(getGraph(data, queryObj.price));
	} catch (e) {
		res.send(e);
	}
});

function getValidatedQuery(query: Partial<Query>): Query {
	let validatedQuery = new Query();

	const keys = Object.keys(query) as (keyof QueryValidatorMap)[];

  keys.forEach((queryKey) => {
		const queryValue = query[queryKey];

		// check if all required keys are in the queryParams
		if (!queryValue) {
			throw (`Query param key (${queryKey}) is missing in the request`);
		}

    const validator = queryValidators[queryKey];

		// check if all the values passed in the params are valid
		if (validator && !validator(queryValue)) {
			throw (`Query value for (${queryKey}) is not in the correct format`);
		}

		if (query[queryKey]) {
		  validatedQuery[queryKey] = (query as Query)[queryKey] as any;
    }
	});

	return Object.assign(validatedQuery, new Query());
}


// find an open port
portfinder.getPort((err: Error | undefined, port: number) => {
  if (err) {
    throw err;
  }

  // start the server
  app.listen(port, () => console.log(`Running on :${port} 👍`));
});
