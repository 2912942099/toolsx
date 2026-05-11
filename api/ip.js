export default async function handler(req, res) {
  const ip = req.query.ip || '';

  const apiUrl = ip
    ? 'https://ipinfo.io/' + encodeURIComponent(ip) + '/json'
    : 'https://ipinfo.io/json';

  try {
    const response = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'fetch failed' });
  }
}
