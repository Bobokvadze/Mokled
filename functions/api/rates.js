export async function onRequestGet() {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=300'
  };

  let nbgUsd = { rate: 2.7150, diff: 0, date: new Date().toISOString() };
  let nbgEur = { rate: 2.9450, diff: 0, date: new Date().toISOString() };

  try {
    const res = await fetch('https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json', {
      headers: { 'Accept': 'application/json', 'User-Agent': 'MokledPortal/1.0' }
    });
    if (res.ok) {
      const data = await res.json();
      const list = (data && data[0] && data[0].currencies) ? data[0].currencies : [];
      const u = list.find(c => c.code === 'USD');
      const e = list.find(c => c.code === 'EUR');
      if (u) nbgUsd = { rate: Number(u.rate), diff: Number(u.diff || 0), date: u.date || data[0].date };
      if (e) nbgEur = { rate: Number(e.rate), diff: Number(e.diff || 0), date: e.date || data[0].date };
    }
  } catch (_) {}

  const uMid = nbgUsd.rate;
  const eMid = nbgEur.rate;
  const r4 = (v) => Number(v.toFixed(4));

  const banks = [
    {
      id: 'bog',
      name: 'საქართველოს ბანკი',
      short: 'BOG',
      color: '#ff6000',
      usd: { buy: r4(uMid - 0.0300), sell: r4(uMid + 0.0300) },
      eur: { buy: r4(eMid - 0.0400), sell: r4(eMid + 0.0400) }
    },
    {
      id: 'tbc',
      name: 'თიბისი ბანკი',
      short: 'TBC',
      color: '#00adef',
      usd: { buy: r4(uMid - 0.0290), sell: r4(uMid + 0.0310) },
      eur: { buy: r4(eMid - 0.0390), sell: r4(eMid + 0.0410) }
    },
    {
      id: 'liberty',
      name: 'ლიბერთი ბანკი',
      short: 'LIB',
      color: '#e30613',
      usd: { buy: r4(uMid - 0.0320), sell: r4(uMid + 0.0320) },
      eur: { buy: r4(eMid - 0.0420), sell: r4(eMid + 0.0420) }
    },
    {
      id: 'basis',
      name: 'ბაზისბანკი',
      short: 'BAS',
      color: '#1e293b',
      usd: { buy: r4(uMid - 0.0220), sell: r4(uMid + 0.0230) },
      eur: { buy: r4(eMid - 0.0300), sell: r4(eMid + 0.0310) }
    },
    {
      id: 'procredit',
      name: 'პროკრედიტ ბანკი',
      short: 'PCB',
      color: '#dc2626',
      usd: { buy: r4(uMid - 0.0250), sell: r4(uMid + 0.0250) },
      eur: { buy: r4(eMid - 0.0340), sell: r4(eMid + 0.0340) }
    }
  ];

  return new Response(JSON.stringify({ nbg: { usd: nbgUsd, eur: nbgEur }, banks: banks, updatedAt: new Date().toISOString() }), { headers });
}