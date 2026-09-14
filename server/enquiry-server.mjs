import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { handleEnquiryRequest } from './enquiry.mjs';

try {
  process.loadEnvFile(resolve(import.meta.dirname, '..', '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const port = Number(process.env.ENQUIRY_PORT || process.env.PORT || 8787);

createServer((req, res) => {
  const path = req.url?.split('?')[0];
  if (path === '/api/enquiry') {
    handleEnquiryRequest(req, res).catch(() => {
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ ok: false, reason: 'network' }));
      }
    });
    return;
  }
  res.statusCode = 404;
  res.end('Not found');
}).listen(port, () => {
  console.log(`Enquiry API listening on http://localhost:${port}/api/enquiry`);
});
