const scrapeCME = (rawData) => {
  const data = JSON.parse(rawData);
  const { resultsStrip } = data;
  resultsStrip.forEach(({ date, rates }) => {
    const rateObj = rates.sofrRatesFixing.reduce((obj, { price, term }) => {
      return {
        ...obj,
        [term]: Number.parseFloat(price),
      };
    }, {});
    console.log(date, rateObj);
  });
};

const scrapers = [
  { source: `https://www.cmegroup.com/services/sofr-strip-rates/?isProtected&_t=${new Date().getTime()}`, script: scrapeCME },
];

async function main() {
  scrapers.forEach(async ({ source, script }) => {
    const response = await fetch(source);
    const rawData = await response.text();
    script(rawData);
  });
}

main();