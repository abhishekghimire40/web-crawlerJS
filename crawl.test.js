const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalize URL strip protocol", () => {
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
