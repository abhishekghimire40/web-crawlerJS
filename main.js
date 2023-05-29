const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function main() {
  if (process.argv.length < 3 || process.argv.length > 3) return;
  const baseURL = process.argv[2];
  if (!baseURL.includes("http")) {
    console.log(`Add proper url with http//:`);
    return;
  }
  console.log(`Started crawling at: ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();
