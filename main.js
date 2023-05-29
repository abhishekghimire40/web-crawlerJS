const { crawlPage } = require("./crawl");

function main() {
  if (process.argv.length < 3 || process.argv.length > 3) return;
  const baseURL = process.argv[2];
  console.log(`Crawler is starting at the ${process.argv[2]}`);
  crawlPage(baseURL);
}

main();
