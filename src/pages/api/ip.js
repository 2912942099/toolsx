export const prerender = false;

export async function GET({ request }) {
  const url = new URL(request.url);
  const ip = url.searchParams.get('ip');
  const lang = url.searchParams.get('lang') || 'en';

  const apiUrl = ip
    ? 'https://ipinfo.io/' + encodeURIComponent(ip) + '/json'
    : 'https://ipinfo.io/json';

  try {
    const res = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'fetch failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
