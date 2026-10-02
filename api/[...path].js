import app from '../server/src/index.js';

export default function (req, res) {
  // Vercel strips the /api prefix, which breaks Express routing.
  // Prepend /api to req.url if it's missing.
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + (req.url === '/' ? '' : req.url);
  }
  return app(req, res);
}
