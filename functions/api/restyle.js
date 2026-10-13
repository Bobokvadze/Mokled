const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_MINUTE = 15;
const ipRequestsMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipRequestsMap.get(ip) || { count: 0, startTime: now };
  if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
    entry.count = 1;
    entry.startTime = now;
  } else {
    entry.count += 1;
  }
  ipRequestsMap.set(ip, entry);
  return entry.count <= MAX_REQUESTS_PER_MINUTE;
}

const STYLE_INSTRUCTIONS = {
  mokled: 'მოკლედ (ტექსტის შეჯამება) — შეაჯამე ტექსტი და გამოყავი მხოლოდ მთავარი სათქმელი და საკვანძო ფაქტები მოკლე, მკაფიო პუნქტებად, ყველა მნიშვნელოვანი თარიღის, თანხისა და სახელის ზუსტი შენარჩუნებით.',
  official: 'ოფიციალური — გადაამუშავე ტექსტი მკაცრად ოფიციალურ, საქმისწარმოების სტანდარტების შესაბამის სტილში.',
  friendly: 'მეგობრული — გადაამუშავე ტექსტი მეგობრულ, თბილ და ბუნებრივ სასაუბრო სტილში.',
  email: 'ელფოსტისთვის — ჩამოაყალიბე გამართული ელფოსტის სტრუქტურა: დასაწყისში შესთავაზე სათაური („თემა: ...“), მისალმება, ძირითადი ტექსტი და დამშვიდობება.',
  business: 'საქმიანი / პროფესიული — გადაამუშავე ტექსტი საქმიან, პროფესიულ და კორპორაციულ სტილში.',
  academic: 'აკადემიური — გადაამუშავე ტექსტი აკადემიურ, ობიექტურ და ანალიტიკურ სტილში.',
  concise: 'მოკლე და გასაგები — გადაწერე ტექსტი მაქსიმალურად მოკლედ, მკაფიოდ და ლაკონიურად, ყველა ფაქტის შენარჩუნებით.',
  polite: 'უფრო თავაზიანი — გადაამუშავე ტექსტი განსაკუთრებით თავაზიან, დელიკატურ და პატივისცემის გამომხატველ სტილში.',
  persuasive: 'დამაჯერებელი — გადაამუშავე ტექსტი დამაჯერებელ და არგუმენტირებულ სტილში ფაქტების გაყალბების გარეშე.',
  social: 'სოციალური ქსელისთვის — მოარგე ტექსტი სოციალური ქსელის პოსტის სტრუქტურას, გახადე დინამიკური და ადვილად წასაკითხი.',
  grammar: 'ტექსტის გრამატიკული და სტილისტური გამართვა — გაასწორე მხოლოდ მართლწერის, პუნქტუაციისა და სტილის ხარვეზები. თუ ტექსტი უკვე გამართულია, ზედმეტად ნუ გადააკეთებ.'
};

export async function onRequestGet(context) {
  const hasKey = Boolean(context.env && context.env.GEMINI_API_KEY);
  const model = (context.env && context.env.GEMINI_MODEL) || 'gemini-2.5-flash';
  return new Response(
    JSON.stringify({ configured: hasKey, model: model }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    }
  );
}

export async function onRequestPost(context) {
  const headers = { 'Content-Type': 'application/json;charset=utf-8' };

  const apiKey = context.env && context.env.GEMINI_API_KEY;
  const model = (context.env && context.env.GEMINI_MODEL) || 'gemini-2.5-flash';

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'AI ფუნქცია ჯერ არ არის კონფიგურირებული: გთხოვთ დაამატოთ GEMINI_API_KEY გარემოს ცვლადი Cloudflare Pages-ის პარამეტრებში (Settings - Environment variables).'
      }),
      { status: 503, headers: headers }
    );
  }

  const clientIp = context.request.headers.get('CF-Connecting-IP') || 'local';
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({
        error: 'მოთხოვნების ლიმიტი ამოიწურა (მაქსიმუმ 15 მოთხოვნა წუთში). გთხოვთ მოიცადოთ 1 წუთი.'
      }),
      { status: 429, headers: headers }
    );
  }

  let body;
  try {
    body = await context.request.json();
  } catch (_) {
    return new Response(
      JSON.stringify({ error: 'არასწორი JSON მოთხოვნა.' }),
      { status: 400, headers: headers }
    );
  }

  const sourceText = typeof body.sourceText === 'string' ? body.sourceText.trim() : '';
  const styleId = typeof body.styleId === 'string' ? body.styleId.trim() : '';
  const customStyleName = typeof body.customStyleName === 'string' ? body.customStyleName.trim() : '';
  const extraInstruction = typeof body.extraInstruction === 'string' ? body.extraInstruction.trim() : '';
  const regenerate = Boolean(body.regenerate);

  if (!sourceText) {
    return new Response(
      JSON.stringify({ error: 'გთხოვთ შეიყვანოთ საწყისი ტექსტი.' }),
      { status: 400, headers: headers }
    );
  }

  if (sourceText.length > 5000) {
    return new Response(
      JSON.stringify({ error: 'ტექსტის მოცულობა აღემატება დასაშვებ 5000 სიმბოლოს.' }),
      { status: 400, headers: headers }
    );
  }

  let styleDirective = '';
  if (styleId === 'custom') {
    if (!customStyleName) {
      return new Response(
        JSON.stringify({ error: 'გთხოვთ მიუთითოთ ინდივიდუალური სტილის აღწერა.' }),
        { status: 400, headers: headers }
      );
    }
    styleDirective = 'ინდივიდუალური სტილი: ' + customStyleName;
  } else if (STYLE_INSTRUCTIONS[styleId]) {
    styleDirective = STYLE_INSTRUCTIONS[styleId];
  } else {
    return new Response(
      JSON.stringify({ error: 'არასწორი სტილის იდენტიფიკატორი.' }),
      { status: 400, headers: headers }
    );
  }

  const systemInstruction = [
    'შენ ხარ ქართული და მრავალენოვანი ტექსტების პროფესიონალი რედაქტორი.',
    'მკაცრი წესები:',
    '1. შეინარჩუნე თავდაპირველი აზრი, ფაქტები, სახელები, თარიღები, თანხები და სხვა მნიშვნელოვანი მონაცემები.',
    '2. არ მოიგონო ფაქტები და არ დაამატო ისეთი დაპირებები ან ინფორმაცია, რომელიც საწყის ტექსტში არ ყოფილა.',
    '3. ნაგულისხმევად შეინარჩუნე საწყისი ტექსტის ენა.',
    '4. ქართულ ენაზე შედეგი უნდა იყოს გრამატიკულად გამართული და ბუნებრივი.',
    '5. თუ ტექსტი უკვე გამართულია, ზედმეტად ნუ გადააკეთებ.',
    '6. დააბრუნე მხოლოდ გადამუშავებული ტექსტი, ყოველგვარი შესავალი ფრაზების გარეშე.'
  ].join('\n');

  const userPrompt = [
    'სასურველი სტილი: ' + styleDirective,
    extraInstruction ? 'დამატებითი მითითება: ' + extraInstruction : '',
    regenerate ? 'შენიშვნა: შემოგვთავაზე წინა ვერსიისგან ოდნავ განსხვავებული, ალტერნატიული ფორმულირება იმავე სტილში.' : '',
    '',
    'საწყისი ტექსტი:',
    '"""',
    sourceText,
    '"""'
  ].filter(Boolean).join('\n');

  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent';

  try {
    const geminiResp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }]
          }
        ],
        generationConfig: {
          temperature: regenerate ? 0.65 : 0.35,
          maxOutputTokens: 2048
        }
      })
    });

    const geminiData = await geminiResp.json().catch(function () { return {}; });

    if (!geminiResp.ok) {
      const apiErrMsg = (geminiData.error && geminiData.error.message) || ('Gemini API შეცდომა: ' + geminiResp.status);
      return new Response(
        JSON.stringify({ error: 'AI სერვისთან დაკავშირების შეცდომა: ' + apiErrMsg }),
        { status: geminiResp.status, headers: headers }
      );
    }

    const candidates = geminiData.candidates || [];
    const firstPart =
      candidates[0] &&
      candidates[0].content &&
      candidates[0].content.parts &&
      candidates[0].content.parts[0];
    const resultText = firstPart && typeof firstPart.text === 'string' ? firstPart.text.trim() : '';

    if (!resultText) {
      return new Response(
        JSON.stringify({ error: 'მოდელმა ტექსტი ვერ დააგენერირა. გთხოვთ შეამოწმოთ შეყვანილი ტექსტი.' }),
        { status: 500, headers: headers }
      );
    }

    return new Response(
      JSON.stringify({ resultText: resultText, model: model }),
      { status: 200, headers: headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'სერვერული კავშირის შეცდომა: ' + err.message }),
      { status: 500, headers: headers }
    );
  }
}