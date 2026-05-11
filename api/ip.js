export default async function handler(req, res) {
  const queryIp = req.query.ip || '';

  // Get client's real IP from headers (Vercel provides this)
  const clientIp = req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for'].split(',')[0].trim()
    : '';

  // Determine which IP to look up
  const targetIp = queryIp || clientIp || '';

  const apiUrl = targetIp
    ? 'https://ipinfo.io/' + encodeURIComponent(targetIp) + '/json'
    : 'https://ipinfo.io/json';

  try {
    const response = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();

    // If no specific IP was requested, also return the client IP
    if (!queryIp) {
      data._clientIp = clientIp;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'fetch failed' });
  }
}
