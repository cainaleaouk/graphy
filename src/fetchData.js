const URL = 'https://stock-data.graphy.now.sh';

async function fetchData(query) {
	try {
		const fetchResponse = await fetch(`${URL}?${getQueryStr(query)}`);
		return await fetchResponse.json();
	} catch (e) {
		throw e;
	}
}

function getQueryStr(query) {
	let queryStr = '';

	Object.keys(query).forEach((key) => {
		queryStr += `${key}=${query[key]}&`;
	});

	return queryStr;
}

module.exports = fetchData;