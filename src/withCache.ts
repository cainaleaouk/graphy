import Redis from 'ioredis';

import { FetcherFunction, Query } from './types';

const redis = new Redis(process.env.REDIS_URL);

export function withCache(fetcherFunc: FetcherFunction) {
  return async (query: Query) => {
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
    await redis.set(cacheKey, JSON.stringify(data));

    return data;
  };
}
