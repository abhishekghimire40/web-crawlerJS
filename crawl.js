const { JSDOM } = require("jsdom");
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
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};

const html = `<html>
<body>
    <a href="/path"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev/path1"><span>Go to Boot.dev</span></a>
</body>
</html>`;
console.log(getURLsFromHTML(html, "https://blog.boot.dev"));
