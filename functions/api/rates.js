export async function onRequestGet(context) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=180'
  };

  let nbgUsd = { rate: 2.5987, diff: -0.0002, date: '2026-10-16' };
  let nbgEur = { rate: 2.9129, diff: 0.0055, date: '2026-10-16' };

  try {
    const res = await fetch('https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json', {
      headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' }
    });
    if (res.ok) {
      const data = await res.json();
      const list = (data && data[0] && data[0].currencies) ? data[0].currencies : [];
      const u = list.find(c => c.code === 'USD');
      const e = list.find(c => c.code === 'EUR');
      if (u) nbgUsd = { rate: Number(u.rate), diff: Number(u.diff || 0), date: String(u.date || data[0].date || '').slice(0, 10) };
      if (e) nbgEur = { rate: Number(e.rate), diff: Number(e.diff || 0), date: String(e.date || data[0].date || '').slice(0, 10) };
    }
  } catch (_) {}

  const baselineBanks = [
    { "id": "bog", "name": "საქართველოს ბანკი", "short": "BOG", "color": "#ff6000", "url": "https://bankofgeorgia.ge/ka/currencies", "usd": { "buy": 2.5537, "sell": 2.6437 }, "eur": { "buy": 2.8549, "sell": 2.9709 } },
    { "id": "tbc", "name": "თიბისი ბანკი", "short": "TBC", "color": "#00adef", "url": "https://tbcbank.ge/ka/treasury-products", "usd": { "buy": 2.5537, "sell": 2.6437 }, "eur": { "buy": 2.8549, "sell": 2.9709 } },
    { "id": "liberty", "name": "ლიბერთი ბანკი", "short": "LIB", "color": "#e30613", "url": "https://libertybank.ge/ka/produqtebi/chemtvis/valutis-kursebi", "usd": { "buy": 2.5490, "sell": 2.6490 }, "eur": { "buy": 2.8540, "sell": 2.9700 } },
    { "id": "basis", "name": "ბაზისბანკი", "short": "BAS", "color": "#1e293b", "url": "https://basisbank.ge/ka/currencies", "usd": { "buy": 2.5737, "sell": 2.6237 }, "eur": { "buy": 2.8779, "sell": 2.9479 } },
    { "id": "procredit", "name": "პროკრედიტ ბანკი", "short": "PCB", "color": "#dc2626", "url": "https://www.procreditbank.ge/ka/exchange-rates", "usd": { "buy": 2.5687, "sell": 2.6287 }, "eur": { "buy": 2.8729, "sell": 2.9529 } }
  ];
  const bankMap = {};
  baselineBanks.forEach(b => { bankMap[b.id] = JSON.parse(JSON.stringify(b)); });

  function extractPairFromNumbers(nums, refRate, maxDev) {
    for (let i = 0; i < nums.length - 1; i++) {
      const a = nums[i], b = nums[i + 1];
      if (Math.abs(a - refRate) < 0.0002 || Math.abs(b - refRate) < 0.0002) continue;
      const low = Math.min(a, b), high = Math.max(a, b);
      const spread = high - low;
      if (spread >= 0.001 && spread <= 0.22 && Math.abs(low - refRate) <= maxDev && Math.abs(high - refRate) <= maxDev && low <= refRate + 0.015 && high >= refRate - 0.015) {
        return { buy: Number(low.toFixed(4)), sell: Number(high.toFixed(4)) };
      }
    }
    return null;
  }

  function parseAggregator(html, uRef, eRef) {
    const clean = html.replace(/<(script|style|svg|head)[\s\S]*?<\/\1>/gi, ' ');
    const specs = [
      { id: 'bog', rx: /(საქართველოს\s*ბანკი|bank-of-georgia)/i },
      { id: 'tbc', rx: /(თიბისი|tbc-bank)/i },
      { id: 'liberty', rx: /(ლიბერთი|liberty-bank)/i },
      { id: 'basis', rx: /(ბაზის\s*ბანკი|ბაზისბანკი|basisbank|basis-bank)/i },
      { id: 'procredit', rx: /(პროკრედიტ|procredit)/i }
    ];
    const trs = clean.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
    for (const tr of trs) {
      for (const sp of specs) {
        if (!sp.rx.test(tr)) continue;
        const txt = tr.replace(/<[^>]+>/g, ' ').replace(/,/g, '.');
        const matches = txt.match(/(?<![0-9.])([1-4]\.\d{1,4})(?![0-9.])/g) || [];
        const nums = matches.map(Number);
        if (nums.length >= 4) {
          const u1 = nums[0], u2 = nums[1], e1 = nums[2], e2 = nums[3];
          const uLow = Math.min(u1, u2), uHigh = Math.max(u1, u2);
          const eLow = Math.min(e1, e2), eHigh = Math.max(e1, e2);
          if (uHigh > uLow && Math.abs(uLow - uRef) <= 0.18 && Math.abs(uHigh - uRef) <= 0.18) {
            bankMap[sp.id].usd = { buy: Number(uLow.toFixed(4)), sell: Number(uHigh.toFixed(4)) };
          }
          if (eHigh > eLow && Math.abs(eLow - eRef) <= 0.22 && Math.abs(eHigh - eRef) <= 0.22) {
            bankMap[sp.id].eur = { buy: Number(eLow.toFixed(4)), sell: Number(eHigh.toFixed(4)) };
          }
        }
      }
    }
  }

  try {
    const aggRes = await fetch('https://myfin.ge/ka/rates', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36', 'Accept-Language': 'ka,en;q=0.9' }
    });
    if (aggRes.ok) {
      const html = await aggRes.text();
      parseAggregator(html, nbgUsd.rate, nbgEur.rate);
    }
  } catch (_) {}

  const finalBanks = ['bog', 'tbc', 'liberty', 'basis', 'procredit'].map(id => bankMap[id]);
  return new Response(JSON.stringify({ nbg: { usd: nbgUsd, eur: nbgEur }, banks: finalBanks, updatedAt: new Date().toISOString() }), { headers });
}