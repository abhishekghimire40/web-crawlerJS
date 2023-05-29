const { JSDOM } = require("jsdom");

// function to crawl page
async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) return pages;
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (normalizedCurrentURL in pages) {
    pages[normalizedCurrentURL] += 1;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;

  console.log(`Actively crawling: ${currentURL}`);

  try {
    const res = await fetch(currentURL);
    if (res.status > 399)
      throw new Error(`Error in fetch with status code:${res.status}`);

    // get content type
    const contentType = res.headers.get(`content-type`);
    if (!contentType || !contentType.includes("text/html"))
      throw new Error(`Invalid content type: Non-HTML response`);
    const htmlBody = await res.text();
    const nextUrls = getURLsFromHTML(htmlBody, baseURL);
    for (const nextUrl of nextUrls) {
      pages = await crawlPage(baseURL, nextUrl, pages);
    }
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    return pages;
  }
  return pages;
}

// function to normalize the url
function normalizeURL(urlString) {
  const normalized = new URL(urlString);
  const hostPath = `${normalized.hostname}${normalized.pathname}`;
  // removing the trailing / from url
  if (hostPath.length > 0 && hostPath.slice(-1) === "/")
    return hostPath.slice(0, -1);
  return hostPath;
}

// function to get all the urls from html page
function getURLsFromHTML(htmlbody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlbody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkEl of linkElements) {
    // check if url is relative or absolute
    if (linkEl.href.slice(0, 1) === "/") {
      // check if url is valid or not
      try {
        const urlObj = new URL(`${baseURL}${linkEl.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with relative url: ${error.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkEl.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with absolute url:${error.message}`);
      }
    }
  }
  // console.log(urls);
  return urls;
}

// function to test arguements
function checkArguements(arguements) {
  const args = arguements.split(" ");
  if (args.length < 3 || args.length > 3) return "invalid";
  return `crawler starting at ${args[2]}`;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  checkArguements,
  crawlPage,
};

// const html = `<html>
// <body>
//     <a href="/path"><span>Go to Boot.dev</span></a>
//     <a href="https://blog.boot.dev/path1"><span>Go to Boot.dev</span></a>
// </body>
// </html>`;
// console.log(getURLsFromHTML(html, "https://blog.boot.dev"));
