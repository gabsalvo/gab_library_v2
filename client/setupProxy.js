const { createProxyMiddleware } = require("http-proxy-middleware");
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

module.exports = function (app) {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: `${apiBaseUrl}`,
      changeOrigin: true,
    })
  );
};
