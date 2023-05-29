function normalizeURL(urlString) {
  const normalized = new URL(urlString);
  const hostPath = `${normalized.hostname}${normalized.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/")
    return hostPath.slice(0, -1);
  return hostPath;
}
module.exports = {
  normalizeURL,
};
