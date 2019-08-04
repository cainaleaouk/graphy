const URL = 'https://stock-data.graphy.now.sh';

function getQueryStr(query) {
	let queryStr = '';

	Object.keys(query).forEach((key) => {
		queryStr += `${key}=${query[key]}&`;
	});

	return queryStr;
}

async function stocksApi(query) {
	console.log('a')
	try {
		const fetchResponse = await fetch(`${URL}?${getQueryStr(query)}`);
		console.log('b')
		return await fetchResponse.json();
	} catch (e) {
		throw e;
	}
}

module.exports.stocksApi = stocksApi;