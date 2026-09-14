import { handleEnquiryRequest } from './enquiry.mjs';

export function enquiryApiPlugin(env) {
  const handler = (req, res, next) => {
    const path = req.url?.split('?')[0];
    if (path !== '/api/enquiry') {
      next();
      return;
    }
    handleEnquiryRequest(req, res, env).catch(() => {
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ ok: false, reason: 'network' }));
      }
    });
  };

  return {
    name: 'enquiry-api',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}
