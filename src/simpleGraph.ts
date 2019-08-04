const PRICES_KEY = 'daily_prices';

function getDay(date: string) {
  return date.split('-')[2];
}

/**
	Shows a simple graph with prices column, empty cell with '-', marked cell with 'x' and days as last row
**/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getGraph(data: Record<string, any>, priceType: string) {
  console.log('Get graph');

  const pricesObj = data[PRICES_KEY];

  const pricesByDate: Record<string, string> = {};

  const daysByPrice: Record<string, string> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let graphData: any = [];

  Object.keys(pricesObj).forEach((date) => {
    const dailyPrice = pricesObj[date][priceType];

    pricesByDate[date] = dailyPrice;
    daysByPrice[dailyPrice] = date;
  });

  const prices = Object.keys(daysByPrice).sort();
  const dates = Object.keys(pricesByDate).sort();

  graphData[prices.length] = [];

  for (let col = 0; col < prices.length; col++) {
    const cPrice = Number(prices[col]).toFixed(2);

		graphData[col] = [cPrice];
		for (let row = 0; row < dates.length; row++) {
			if (dates[row] === daysByPrice[prices[col]]) {
				graphData[col].push(' X');
				continue;
			}
			graphData[col].push(' -');
			// Adds the day to the last row (leave first index empty for indentation)
			graphData[prices.length][row+1] = getDay(dates[row]);
		}
		// Adds extra empty row for table styling
		graphData[col][dates.length+1] = '';

    graphData[col] = graphData[col].join(' |');
  }
  // Adds identation for days row
  graphData[prices.length][0] = '      ';
  // Adds extra empty column for table styling
  graphData[prices.length][dates.length + 1] = '';

  graphData[prices.length] = graphData[prices.length].join(' |');

	// Turn the graph array into string
	const asciiGraph: string = graphData.join('\r\n');

	return asciiGraph;
}
