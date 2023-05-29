const { crawlPage } = require("./crawl");

async function main() {
  if (process.argv.length < 3 || process.argv.length > 3) return;
  const baseURL = process.argv[2];
  if (!baseURL.includes("http")) {
    console.log(`Add proper url with http//:`);
    return;
  }
  const pages = await crawlPage(baseURL, baseURL, {});
  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
