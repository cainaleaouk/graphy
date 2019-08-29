import { Query } from './types';

const URL = 'https://stock-data.graphy.now.sh';

function getQueryStr(query: Query) {
  return Object.keys(query).map((key:string) => `${key}=${query[key]}`).join('&');
}

export async function stocksApi(query: Query) {
  try {
    const fetchResponse = await fetch(`${URL}?${getQueryStr(query)}`);
    return await fetchResponse.json();
  } catch (e) {
    throw e;
  }
}
