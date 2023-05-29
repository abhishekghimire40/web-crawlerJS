const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

// test normalized url
test("normalize URL", () => {
  const input = "https://wagslane.dev/path";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});
test("normalize URL strip trailing slashes", () => {
  const input = "https://wagslane.dev/path/";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});
test("normalize URL capitals", () => {
  const input = "https://WAGSLANE.dev/path/";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});
test("normalize URL strip http/https", () => {
  const input = "http://WAGSLANE.dev/path/";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

// test getURLsfromHTML
test("getURLsFromHTML absolute ", () => {
  const input = `<html>
  <body>
      <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
  </body>
  </html>`;
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative ", () => {
  const input = `<html>
  <body>
      <a href="/path/"><span>Go to Boot.dev</span></a>
  </body>
  </html>`;
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});
test("getURLsFromHTML both ", () => {
  const input = `<html>
  <body>
      <a href="/path/"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev</span></a>
  </body>
  </html>`;
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = [
    "https://blog.boot.dev/path/",
    "https://blog.boot.dev/path1/",
  ];
  expect(actual).toEqual(expected);
});
test("getURLsFromHTML invalid url  ", () => {
  const input = `<html>
  <body>
      <a href="invalid"><span>Go to Boot.dev</span></a>
  </body>
  </html>`;
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
