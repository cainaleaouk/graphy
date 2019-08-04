import 'isomorphic-fetch';

import commander from 'commander';

commander
  .option('--symbol <symbol>', 'company stocks symbol')
  .option('--since <since>', 'starting date')
  .option('--until <until>', 'ending date')
  .option('--price <price>', 'price type (`open`, `high`, `low` or `close`)', 'close');

commander.parse(process.argv);

if (process.argv.length < 5) {
  commander.outputHelp();
  process.exit(0);
}

const { symbol, since, until, price } = commander;

if (!symbol) throw 'symbol parameter is missing!';
if (!since) throw 'since parameter is missing!';
if (!until) throw 'until parameter is missing!';

const URL = `http://localhost:8000/ascii?symbol=${symbol}&since=${since}&until=${until}&price=${price}`;

fetch(URL)
  .then((response) => {
    return response.text();
  })
  .then((graphData) => {
    console.log(graphData);
  })
  .catch((e) => {
    console.error(e);
  });
