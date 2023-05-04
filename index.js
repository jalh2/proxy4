const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT || 6000;

// Proxy middleware
app.use('/search', createProxyMiddleware({
  target: 'https://www.google.com',
  changeOrigin: true,
  pathRewrite: {
    '^/search': '/search?q='
  },
  onProxyReq(proxyReq, req, res) {
    // Add query parameter to Google search request
    const query = req.query.q;
    if (query) {
      proxyReq.path = `/search?q=${encodeURIComponent(query)}`;
    }
  }
}));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
