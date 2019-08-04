import Redis from 'ioredis';

import { withCache } from './withCache';
import { Query } from './types';

const fetcher = () => {
  return Promise.resolve('{}');
};

describe('#withCache', () => {
  beforeEach(() => {
    // @ts-ignore
    Redis.clear();
  });

  it('should set a value in the cache if it does not exist', async () => {
    const func = withCache(fetcher);
    const query = new Query();
    query.symbol = 'FOO';
    query.since = '1';
    query.until = '2';
    await func(query);

    // @ts-ignore
    expect(Object.keys(Redis.cache)).toContain(`${query.symbol}.${query.since}.${query.until}`);
  });

  it('should get a value from the cache if it exists', async () => {
    const query = new Query();
    query.symbol = 'FOO';
    query.since = '1';
    query.until = '2';

    const cacheKey = `${query.symbol}.${query.since}.${query.until}`;
    // @ts-ignore
    Redis.cache[cacheKey] = '{}';

    const func = withCache(fetcher);
    const result = await func(query);

    // @ts-ignore
    expect(result).toEqual({});
  });
});
