const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

const URL = 'https://stock-data.graphy.now.sh';

function withCache(fetcherFunc) {

	return async (query) => {
		
		// Create cache key based on query variables
		const cacheKey = `${query.symbol}.${query.since}.${query.until}`;
		const possibleOldCache = await redis.get(cacheKey);
			
		// Check if data was cached in Redis and is not null/undefined
		if (possibleOldCache) {
			return JSON.parse(possibleOldCache);
		}

		// Call the fetcher function and get data
		const data = await fetcherFunc(query);
		// Update Redis with new data
		redis.set(cacheKey, JSON.stringify(data));

		return data;
	}
}

module.exports.withCache = withCache;