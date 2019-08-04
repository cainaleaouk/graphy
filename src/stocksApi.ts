import { Query } from './types';

const URL = 'https://stock-data.graphy.now.sh';

function getQueryStr(query: Query) {
  let queryStr = '';

  Object.keys(query).forEach((key: string) => {
    queryStr += `${key}=${query[key]}&`;
  });

  return queryStr;
}

export async function stocksApi(query: Query) {
  try {
    const fetchResponse = await fetch(`${URL}?${getQueryStr(query)}`);
    return await fetchResponse.json();
  } catch (e) {
    throw e;
  }
}
