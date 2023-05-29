function printReport(pages) {
  console.log("=========================");
  console.log("Report");
  console.log("=========================");
  const sortedPages = sortPages(pages);
  for (const [url, count] of sortedPages)
    console.log(`Found ${count} link${count > 1 ? "s" : ""} to ${url} `);
  console.log("=========================");
  console.log("End Report");
  console.log("=========================");
}
function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((p1, p2) => p2[1] - p1[1]);
  return pagesArr;
}

module.exports = {
  printReport,
};
