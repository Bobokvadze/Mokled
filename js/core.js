(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.GeoCore = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /* 1. ლათინურ-ქართული ტრანსლიტერაცია */
  const QWERTY_MAP = {
    a: 'ა', b: 'ბ', g: 'გ', d: 'დ', e: 'ე', v: 'ვ', z: 'ზ', Z: 'ძ',
    t: 'ტ', T: 'თ', i: 'ი', k: 'კ', K: 'ქ', l: 'ლ', m: 'მ', n: 'ნ',
    o: 'ო', p: 'პ', P: 'ფ', j: 'ჯ', J: 'ჟ', r: 'რ', R: 'ღ', s: 'ს',
    S: 'შ', u: 'უ', f: 'ფ', q: 'ყ', y: 'ყ', c: 'ც', C: 'ჩ', w: 'წ',
    W: 'ჭ', x: 'ხ', h: 'ჰ'
  };

  const DIGRAPH_RULES = [
    ['tch', 'ჭ'],
    ['tsk', 'წყ'],
    ['dz', 'ძ'],
    ['ts', 'ც'],
    ['ch', 'ჩ'],
    ['sh', 'შ'],
    ['kh', 'ხ'],
    ['gh', 'ღ'],
    ['zh', 'ჟ'],
    ['ph', 'ფ'],
    ['th', 'თ']
  ];

  const AMBIGUOUS_PAIRS = {
    t: ['ტ', 'თ'],
    k: ['კ', 'ქ'],
    p: ['პ', 'ფ'],
    c: ['ც', 'ჩ', 'წ'],
    w: ['წ', 'ჭ'],
    z: ['ზ', 'ძ'],
    r: ['რ', 'ღ'],
    j: ['ჯ', 'ჟ'],
    s: ['ს', 'შ']
  };

  function transliterateSimpleWord(word, mode) {
    let res = '';
    let i = 0;
    while (i < word.length) {
      let matched = false;
      if (mode === 'smart') {
        const rem = word.slice(i).toLowerCase();
        for (let d = 0; d < DIGRAPH_RULES.length; d++) {
          const seq = DIGRAPH_RULES[d][0];
          const geo = DIGRAPH_RULES[d][1];
          if (rem.startsWith(seq)) {
            res += geo;
            i += seq.length;
            matched = true;
            break;
          }
        }
      }
      if (!matched) {
        const ch = word[i];
        res += QWERTY_MAP[ch] || QWERTY_MAP[ch.toLowerCase()] || ch;
        i += 1;
      }
    }
    return res;
  }

  function detectWordAmbiguities(input, mode) {
    const words = input.match(/[A-Za-z]{2,}/g) || [];
    const uniqueWords = Array.from(new Set(words)).slice(0, 12);
    const results = [];

    for (let w = 0; w < uniqueWords.length; w++) {
      const word = uniqueWords[w];
      const baseConverted = transliterateSimpleWord(word, mode);
      const variants = new Set([baseConverted]);

      for (let pos = 0; pos < word.length; pos++) {
        const ch = word[pos];
        if (AMBIGUOUS_PAIRS[ch]) {
          const alts = AMBIGUOUS_PAIRS[ch];
          for (let a = 0; a < alts.length; a++) {
            const altGeo = alts[a];
            const modified =
              transliterateSimpleWord(word.slice(0, pos), mode) +
              altGeo +
              transliterateSimpleWord(word.slice(pos + 1), mode);
            variants.add(modified);
          }
        }
      }

      const alternatives = Array.from(variants).filter(function (v) {
        return v !== baseConverted;
      }).slice(0, 4);

      if (alternatives.length > 0) {
        results.push({
          latin: word,
          current: baseConverted,
          alternatives: alternatives
        });
      }
    }

    return results;
  }

  function transliterateGeorgian(input, mode) {
    const activeMode = mode || 'smart';
    if (typeof input !== 'string' || input.length === 0) {
      return { output: '', ambiguities: [] };
    }

    let output = '';
    let i = 0;

    while (i < input.length) {
      let matchedDigraph = false;

      if (activeMode === 'smart') {
        const remainingLower = input.slice(i).toLowerCase();
        for (let d = 0; d < DIGRAPH_RULES.length; d++) {
          const latinSeq = DIGRAPH_RULES[d][0];
          const geoChar = DIGRAPH_RULES[d][1];
          if (remainingLower.startsWith(latinSeq)) {
            output += geoChar;
            i += latinSeq.length;
            matchedDigraph = true;
            break;
          }
        }
      }

      if (!matchedDigraph) {
        const ch = input[i];
        if (Object.prototype.hasOwnProperty.call(QWERTY_MAP, ch)) {
          output += QWERTY_MAP[ch];
        } else if (Object.prototype.hasOwnProperty.call(QWERTY_MAP, ch.toLowerCase())) {
          output += QWERTY_MAP[ch.toLowerCase()];
        } else {
          output += ch;
        }
        i += 1;
      }
    }

    const ambiguities = detectWordAmbiguities(input, activeMode);
    return { output: output, ambiguities: ambiguities };
  }

  /* 2. ტექსტის დამმუშავებელი */
  function analyzeText(text) {
    const raw = typeof text === 'string' ? text : '';
    const charsWithSpaces = Array.from(raw).length;
    const charsNoSpaces = Array.from(raw.replace(/\s/g, '')).length;
    const trimmed = raw.trim();
    const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
    const lines = raw === '' ? 0 : raw.split(/\r\n|\r|\n/).length;
    const paragraphs = trimmed === '' ? 0 : trimmed.split(/\n\s*\n/).filter(Boolean).length;

    return {
      words: words,
      charsWithSpaces: charsWithSpaces,
      charsNoSpaces: charsNoSpaces,
      lines: lines,
      paragraphs: paragraphs
    };
  }

  function normalizeSpaces(text) {
    if (typeof text !== 'string') return '';
    return text
      .split(/\r\n|\r|\n/)
      .map(function (line) {
        return line.replace(/[ \t]+/g, ' ').trim();
      })
      .join('\n');
  }

  function removeEmptyLines(text) {
    if (typeof text !== 'string') return '';
    return text
      .split(/\r\n|\r|\n/)
      .filter(function (line) {
        return line.trim().length > 0;
      })
      .join('\n');
  }

  function removeDuplicateLines(text) {
    if (typeof text !== 'string') return '';
    const seen = new Set();
    const out = [];
    const lines = text.split(/\r\n|\r|\n/);
    for (let i = 0; i < lines.length; i++) {
      if (!seen.has(lines[i])) {
        seen.add(lines[i]);
        out.push(lines[i]);
      }
    }
    return out.join('\n');
  }

  function transformTextCase(text, caseType) {
    if (typeof text !== 'string') return '';

    if (caseType === 'mtavruli' || caseType === 'upper') {
      let result = '';
      const chars = Array.from(text);
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const code = ch.codePointAt(0);
        if (code >= 0x10d0 && code <= 0x10fa) {
          result += String.fromCodePoint(code + (0x1c90 - 0x10d0));
        } else {
          result += ch.toUpperCase();
        }
      }
      return result;
    }

    if (caseType === 'mkhedruli' || caseType === 'lower') {
      let result = '';
      const chars = Array.from(text);
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const code = ch.codePointAt(0);
        if (code >= 0x1c90 && code <= 0x1cba) {
          result += String.fromCodePoint(code - (0x1c90 - 0x10d0));
        } else {
          result += ch.toLowerCase();
        }
      }
      return result;
    }

    if (caseType === 'sentence') {
      const lowered = transformTextCase(text, 'mkhedruli');
      return lowered.replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g, function (match) {
        return match.toUpperCase();
      });
    }

    return text;
  }

  /* 3. დღგ-ის კალკულატორი */
  function calculateVAT(amount, mode, ratePercent) {
    const activeMode = mode || 'add';
    const rate = ratePercent !== undefined ? Number(ratePercent) : 18;
    const cleanedAmount = typeof amount === 'number' ? amount : Number(String(amount).trim().replace(',', '.'));

    if (String(amount).trim() === '' || !Number.isFinite(cleanedAmount) || cleanedAmount < 0) {
      throw new Error('გთხოვთ შეიყვანოთ სწორი, დადებითი რიცხვითი თანხა.');
    }
    if (!Number.isFinite(rate) || rate < 0 || rate > 100) {
      throw new Error('დღგ-ის განაკვეთი უნდა იყოს 0-დან 100%-მდე.');
    }

    const multiplier = rate / 100;
    let netRaw, vatRaw, grossRaw, formulaText;

    if (activeMode === 'add') {
      netRaw = cleanedAmount;
      vatRaw = netRaw * multiplier;
      grossRaw = netRaw + vatRaw;
      formulaText =
        'დღგ = ' + netRaw.toFixed(2) + ' × (' + rate + ' / 100) = ' + vatRaw.toFixed(4) + ' ₾ | ' +
        'ჯამური თანხა = ' + netRaw.toFixed(2) + ' + ' + vatRaw.toFixed(4) + ' = ' + grossRaw.toFixed(4) + ' ₾';
    } else if (activeMode === 'extract') {
      grossRaw = cleanedAmount;
      netRaw = grossRaw / (1 + multiplier);
      vatRaw = grossRaw - netRaw;
      formulaText =
        'თანხა დღგ-ის გარეშე = ' + grossRaw.toFixed(2) + ' / (1 + ' + rate + '/100) = ' + netRaw.toFixed(4) + ' ₾ | ' +
        'დღგ = ' + grossRaw.toFixed(2) + ' - ' + netRaw.toFixed(4) + ' = ' + vatRaw.toFixed(4) + ' ₾';
    } else {
      throw new Error('უცნობი გამოთვლის რეჟიმი.');
    }

    function round2(n) {
      return Math.round((n + Number.EPSILON) * 100) / 100;
    }

    return {
      mode: activeMode,
      rate: rate,
      net: round2(netRaw),
      vat: round2(vatRaw),
      gross: round2(grossRaw),
      intermediate: {
        netExact: Number(netRaw.toFixed(4)),
        vatExact: Number(vatRaw.toFixed(4)),
        grossExact: Number(grossRaw.toFixed(4))
      },
      formula: formulaText
    };
  }

  /* 4. CSV / JSON გარდამქმნელი */
  function parseCSV(csvText, delimiter) {
    const delim = delimiter || ',';
    if (typeof csvText !== 'string') {
      throw new Error('CSV მონაცემები უნდა იყოს ტექსტური ფორმატის.');
    }

    const cleanText = csvText.replace(/^\uFEFF/, '');
    if (cleanText.trim() === '') {
      throw new Error('CSV ველი ცარიელია. გთხოვთ ჩასვათ მონაცემები ან ატვირთოთ ფაილი.');
    }

    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuotes = false;
    let lineNum = 1;

    for (let i = 0; i < cleanText.length; i++) {
      const ch = cleanText[i];
      const nextCh = cleanText[i + 1];

      if (inQuotes) {
        if (ch === '"') {
          if (nextCh === '"') {
            currentField += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          if (ch === '\n') lineNum++;
          currentField += ch;
        }
      } else {
        if (ch === '"') {
          if (currentField.length === 0) {
            inQuotes = true;
          } else {
            throw new Error('სინტაქსური შეცდომა ხაზზე ' + lineNum + ': ბრჭყალი არაბრჭყალებიანი ველის შუაში.');
          }
        } else if (ch === delim) {
          currentRow.push(currentField);
          currentField = '';
        } else if (ch === '\r' || ch === '\n') {
          if (ch === '\r' && nextCh === '\n') {
            i++;
          }
          currentRow.push(currentField);
          rows.push(currentRow);
          currentRow = [];
          currentField = '';
          lineNum++;
        } else {
          currentField += ch;
        }
      }
    }

    if (inQuotes) {
      throw new Error('სინტაქსური შეცდომა: დაუხურავი ბრჭყალი (") CSV ტექსტში (ხაზი ' + lineNum + ').');
    }

    if (currentField.length > 0 || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }

    if (rows.length > 1 && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === '') {
      rows.pop();
    }

    if (rows.length === 0) {
      throw new Error('ვერ მოხერხდა CSV სტრიქონების წაკითხვა.');
    }

    const headerCount = rows[0].length;
    for (let r = 1; r < rows.length; r++) {
      if (rows[r].length !== headerCount) {
        throw new Error(
          'მონაცემთა სტრუქტურის შეუსაბამობა სტრიქონზე ' + (r + 1) +
          ': პირველ სტრიქონში არის ' + headerCount + ' სვეტი, ხოლო ამ სტრიქონში - ' + rows[r].length +
          '. მონაცემები არ დაკარგულა, გთხოვთ შეამოწმოთ გამყოფი ან ბრჭყალები.'
        );
      }
    }

    return rows;
  }

  function csvToJson(csvText, delimiter, useHeaders) {
    const delim = delimiter || ',';
    const headersEnabled = useHeaders !== undefined ? Boolean(useHeaders) : true;
    const rows = parseCSV(csvText, delim);

    if (!headersEnabled) {
      const generatedHeaders = rows[0].map(function (_, idx) {
        return 'სვეტი_' + (idx + 1);
      });
      return { rows: rows, json: rows, headers: generatedHeaders };
    }

    const headers = rows[0].map(function (h, idx) {
      return h.trim() !== '' ? h.trim() : 'სვეტი_' + (idx + 1);
    });

    const duplicates = headers.filter(function (item, index) {
      return headers.indexOf(item) !== index;
    });

    if (duplicates.length > 0) {
      throw new Error(
        'CSV სათაურის სტრიქონში მეორდება სვეტის სახელი: "' + duplicates[0] +
        '". მონაცემების ჩუმად დაკარგვის თავიდან ასაცილებლად შეცვალეთ სვეტის სახელი ან გამორთეთ "პირველი სტრიქონი სათაურია".'
      );
    }

    const dataRows = rows.slice(1);
    const data = dataRows.map(function (row) {
      const obj = {};
      headers.forEach(function (h, idx) {
        obj[h] = row[idx];
      });
      return obj;
    });

    return { headers: headers, rows: dataRows, json: data };
  }

  function jsonToCsv(jsonInput, delimiter) {
    const delim = delimiter || ',';
    let parsed;
    if (typeof jsonInput === 'string') {
      if (jsonInput.trim() === '') {
        throw new Error('JSON ველი ცარიელია.');
      }
      try {
        parsed = JSON.parse(jsonInput);
      } catch (e) {
        throw new Error('არასწორი JSON ფორმატი: ' + e.message);
      }
    } else {
      parsed = jsonInput;
    }

    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error('JSON უნდა წარმოადგენდეს არაცარიელ მასივს (მაგ.: [{"სახელი": "გიორგი"}]).');
    }

    function escapeCsvCell(val) {
      if (val === null || val === undefined) return '';
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
      if (str.includes('"') || str.includes(delim) || str.includes('\n') || str.includes('\r')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    }

    if (Array.isArray(parsed[0])) {
      const headers = parsed[0].map(function (_, i) {
        return 'სვეტი_' + (i + 1);
      });
      const csvLines = parsed.map(function (row) {
        if (!Array.isArray(row)) {
          throw new Error('JSON მასივის ყველა ელემენტი უნდა იყოს ერთგვაროვანი.');
        }
        return row.map(escapeCsvCell).join(delim);
      });
      return { csv: csvLines.join('\r\n'), headers: headers, rows: parsed };
    }

    if (typeof parsed[0] === 'object' && parsed[0] !== null) {
      const headerSet = new Set();
      parsed.forEach(function (item) {
        if (typeof item !== 'object' || item === null || Array.isArray(item)) {
          throw new Error('JSON მასივის ყველა ელემენტი უნდა იყოს ობიექტი.');
        }
        Object.keys(item).forEach(function (k) {
          headerSet.add(k);
        });
      });
      const headers = Array.from(headerSet);
      const rows = parsed.map(function (item) {
        return headers.map(function (h) {
          return item[h] !== undefined && item[h] !== null
            ? (typeof item[h] === 'object' ? JSON.stringify(item[h]) : String(item[h]))
            : '';
        });
      });
      const csvLines = [
        headers.map(escapeCsvCell).join(delim)
      ].concat(
        rows.map(function (r) {
          return r.map(escapeCsvCell).join(delim);
        })
      );
      return { csv: csvLines.join('\r\n'), headers: headers, rows: rows };
    }

    throw new Error('JSON მასივი უნდა შეიცავდეს ობიექტებს ან ქვე-მასივებს.');
  }

  /* 5. თარიღების კალკულატორი */
  const GEORGIAN_PUBLIC_HOLIDAYS_MMDD = [
    { mmdd: '01-01', name: 'ახალი წელი' },
    { mmdd: '01-02', name: 'ბედობა' },
    { mmdd: '01-07', name: 'ქრისტესშობა' },
    { mmdd: '01-19', name: 'ნათლისღება' },
    { mmdd: '03-03', name: 'დედის დღე' },
    { mmdd: '03-08', name: 'ქალთა საერთაშორისო დღე' },
    { mmdd: '04-09', name: 'ეროვნული ერთიანობის დღე' },
    { mmdd: '05-09', name: 'ფაშიზმზე გამარჯვების დღე' },
    { mmdd: '05-12', name: 'წმ. ანდრია პირველწოდებულის დღე' },
    { mmdd: '05-26', name: 'დამოუკიდებლობის დღე' },
    { mmdd: '08-28', name: 'მარიამობა' },
    { mmdd: '10-14', name: 'სვეტიცხოვლობა' },
    { mmdd: '11-23', name: 'გიორგობა' }
  ];

  function parseIsoDateUTC(dateStr) {
    if (typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
      throw new Error('არასწორი თარიღის ფორმატი: "' + dateStr + '". გამოიყენეთ YYYY-MM-DD (მაგ.: 2026-05-26).');
    }
    const parts = dateStr.trim().split('-').map(Number);
    const y = parts[0];
    const m = parts[1];
    const d = parts[2];
    const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) {
      throw new Error('არარსებული კალენდარული თარიღი: "' + dateStr + '".');
    }
    return dt;
  }

  function formatIsoDateUTC(dt) {
    const y = dt.getUTCFullYear();
    const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
    const d = String(dt.getUTCDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function getGeorgianDayName(dow) {
    const names = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];
    return names[dow] || '';
  }

  function parseCustomHolidays(rawText, includeGeorgianHolidays, years) {
    const set = new Set();
    if (typeof rawText === 'string' && rawText.trim() !== '') {
      const tokens = rawText.split(/[\n,;]+/).map(function (s) {
        return s.trim();
      }).filter(Boolean);
      for (let i = 0; i < tokens.length; i++) {
        parseIsoDateUTC(tokens[i]);
        set.add(tokens[i]);
      }
    }
    if (includeGeorgianHolidays) {
      const targetYears = Array.isArray(years) && years.length > 0 ? years : [new Date().getFullYear()];
      for (let y = 0; y < targetYears.length; y++) {
        const yr = targetYears[y];
        for (let h = 0; h < GEORGIAN_PUBLIC_HOLIDAYS_MMDD.length; h++) {
          set.add(yr + '-' + GEORGIAN_PUBLIC_HOLIDAYS_MMDD[h].mmdd);
        }
      }
    }
    return set;
  }

  function calculateDateDifference(startStr, endStr, options) {
    const opts = options || {};
    const includeEndDate = Boolean(opts.includeEndDate);
    const customHolidaysText = opts.customHolidaysText || '';
    const includeGeoHolidays = Boolean(opts.includeGeoHolidays);

    const d1 = parseIsoDateUTC(startStr);
    const d2 = parseIsoDateUTC(endStr);

    const isReversed = d1.getTime() > d2.getTime();
    const start = isReversed ? d2 : d1;
    const end = isReversed ? d1 : d2;

    const years = [];
    for (let y = start.getUTCFullYear(); y <= end.getUTCFullYear(); y++) {
      years.push(y);
    }
    const holidaySet = parseCustomHolidays(customHolidaysText, includeGeoHolidays, years);

    const msPerDay = 86400000;
    const rawDiffDays = Math.round((end.getTime() - start.getTime()) / msPerDay);
    const totalDays = includeEndDate ? rawDiffDays + 1 : rawDiffDays;

    let workingDays = 0;
    let weekendDays = 0;
    let holidayOnWeekdayCount = 0;

    for (let i = 0; i < totalDays; i++) {
      const cur = new Date(start.getTime() + i * msPerDay);
      const dow = cur.getUTCDay();
      const iso = formatIsoDateUTC(cur);

      if (dow === 0 || dow === 6) {
        weekendDays++;
      } else if (holidaySet.has(iso)) {
        holidayOnWeekdayCount++;
      } else {
        workingDays++;
      }
    }

    return {
      isReversed: isReversed,
      totalDays: totalDays,
      weeks: Math.floor(totalDays / 7),
      remainingDays: totalDays % 7,
      workingDays: workingDays,
      weekendDays: weekendDays,
      holidayOnWeekdayCount: holidayOnWeekdayCount
    };
  }

  function addOrSubtractDays(startStr, daysCount, options) {
    const opts = options || {};
    const operation = opts.operation || 'add';
    const onlyWorkingDays = Boolean(opts.onlyWorkingDays);
    const customHolidaysText = opts.customHolidaysText || '';
    const includeGeoHolidays = Boolean(opts.includeGeoHolidays);

    const start = parseIsoDateUTC(startStr);
    const count = Number(daysCount);
    if (!Number.isInteger(count) || count < 0 || count > 36500) {
      throw new Error('დღეების რაოდენობა უნდა იყოს მთელი დადებითი რიცხვი (0-დან 36500-მდე).');
    }

    const step = operation === 'subtract' ? -1 : 1;
    const msPerDay = 86400000;

    if (!onlyWorkingDays) {
      const target = new Date(start.getTime() + step * count * msPerDay);
      return {
        resultDate: formatIsoDateUTC(target),
        dayOfWeekGeo: getGeorgianDayName(target.getUTCDay())
      };
    }

    const startYear = start.getUTCFullYear();
    const years = [];
    for (let y = startYear - 10; y <= startYear + 10; y++) {
      years.push(y);
    }
    const holidaySet = parseCustomHolidays(customHolidaysText, includeGeoHolidays, years);

    let current = new Date(start.getTime());
    let remaining = count;

    while (remaining > 0) {
      current = new Date(current.getTime() + step * msPerDay);
      const dow = current.getUTCDay();
      const iso = formatIsoDateUTC(current);
      if (dow !== 0 && dow !== 6 && !holidaySet.has(iso)) {
        remaining--;
      }
    }

    return {
      resultDate: formatIsoDateUTC(current),
      dayOfWeekGeo: getGeorgianDayName(current.getUTCDay())
    };
  }

  /* 6. სურათის ზომები */
  function calculateAspectDimensions(origWidth, origHeight, targetWidth, targetHeight, changedField) {
    if (origWidth <= 0 || origHeight <= 0) {
      throw new Error('სურათის საწყისი ზომები არასწორია.');
    }
    const ratio = origWidth / origHeight;
    if ((changedField || 'width') === 'width') {
      const w = Math.max(1, Math.round(Number(targetWidth) || origWidth));
      const h = Math.max(1, Math.round(w / ratio));
      return { width: w, height: h };
    } else {
      const h = Math.max(1, Math.round(Number(targetHeight) || origHeight));
      const w = Math.max(1, Math.round(h * ratio));
      return { width: w, height: h };
    }
  }

  function formatBytes(bytes) {
    const b = Number(bytes);
    if (!Number.isFinite(b) || b < 0) return '0 B';
    if (b < 1024) return b + ' B';
    if (b < 1024 * 1024) return (b / 1024).toFixed(2) + ' KB';
    return (b / (1024 * 1024)).toFixed(2) + ' MB';
  }

  /* ==========================================================================
     7. ქართული ტექსტის კონვერტერი:
        - ყოფილი პარლამენტის სტანდარტი (8-ბიტიანი Geo_Parliament: àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ¸)
        - AcadNusx / LitNusx (abgdevzTiklmnopJrstufqRySCcZwWxjh)
        - უნიკოდი (UTF-8 / Sylfaen)
        - ასომთავრული (ႠႡႢ...)
        - ლათინური
     ========================================================================== */

  const MKHEDRULI_33 = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
  // ნამდვილი 8-ბიტიანი პარლამენტის სტანდარტის (Geo_Parliament / GEOSTD8) სიმბოლოები:
  // ა..ჯ = U+00E0..U+00FF (à..ÿ), ჰ = U+00B8 (¸)
  const PARLIAMENT_8BIT_LOWER = 'àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ¸';
  // მთავრული/ასომთავრული წყვილები პარლამენტის სტანდარტში:
  // Ⴀ..Ⴟ = U+00C0..U+00DF (À..ß), Ⴠ = U+00A8 (¨)
  const PARLIAMENT_8BIT_UPPER = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß¨';

  const PARLIAMENT_UNICODE_TO_8BIT = {};
  const PARLIAMENT_8BIT_TO_UNICODE = {};

  for (let idx = 0; idx < 33; idx++) {
    const geoChar = MKHEDRULI_33[idx];
    const pLower = PARLIAMENT_8BIT_LOWER[idx];
    const pUpper = PARLIAMENT_8BIT_UPPER[idx];
    const asomChar = String.fromCodePoint(0x10a0 + idx);

    PARLIAMENT_UNICODE_TO_8BIT[geoChar] = pLower;
    PARLIAMENT_UNICODE_TO_8BIT[asomChar] = pUpper;
    PARLIAMENT_8BIT_TO_UNICODE[pLower] = geoChar;
    PARLIAMENT_8BIT_TO_UNICODE[pUpper] = geoChar;
  }
  // არქაული ასოები პარლამენტის ფონტში
  PARLIAMENT_8BIT_TO_UNICODE['š'] = 'ჴ';
  PARLIAMENT_8BIT_TO_UNICODE['œ'] = 'ჵ';
  PARLIAMENT_UNICODE_TO_8BIT['ჴ'] = 'š';
  PARLIAMENT_UNICODE_TO_8BIT['ჵ'] = 'œ';

  // AcadNusx / LitNusx ცხრილი
  const ACADNUSX_UNICODE_TO_ASCII = {
    'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e', 'ვ': 'v', 'ზ': 'z', 'თ': 'T',
    'ი': 'i', 'კ': 'k', 'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o', 'პ': 'p', 'ჟ': 'J',
    'რ': 'r', 'ს': 's', 'ტ': 't', 'უ': 'u', 'ფ': 'f', 'ქ': 'q', 'ღ': 'R', 'ყ': 'y',
    'შ': 'S', 'ჩ': 'C', 'ც': 'c', 'ძ': 'Z', 'წ': 'w', 'ჭ': 'W', 'ხ': 'x', 'ჯ': 'j',
    'ჰ': 'h'
  };

  const ACADNUSX_ASCII_TO_UNICODE = {};
  Object.keys(ACADNUSX_UNICODE_TO_ASCII).forEach(function (geo) {
    ACADNUSX_ASCII_TO_UNICODE[ACADNUSX_UNICODE_TO_ASCII[geo]] = geo;
  });

  const UNICODE_TO_LATIN_MAP = {
    'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e', 'ვ': 'v', 'ზ': 'z', 'თ': 't',
    'ი': 'i', 'კ': 'k', 'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o', 'პ': 'p', 'ჟ': 'zh',
    'რ': 'r', 'ს': 's', 'ტ': 't', 'უ': 'u', 'ფ': 'p', 'ქ': 'k', 'ღ': 'gh', 'ყ': 'q',
    'შ': 'sh', 'ჩ': 'ch', 'ც': 'ts', 'ძ': 'dz', 'წ': 'ts', 'ჭ': 'tch', 'ხ': 'kh', 'ჯ': 'j',
    'ჰ': 'h', 'ჱ': 'ey', 'ჲ': 'y', 'ჳ': 'w', 'ჴ': 'q', 'ჵ': 'o'
  };

  function normalizeToMkhedruli(text) {
    if (typeof text !== 'string') return '';
    let out = '';
    const chars = Array.from(text);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const code = ch.codePointAt(0);
      if (code >= 0x10a0 && code <= 0x10c5) {
        out += String.fromCodePoint(code + 0x30);
      } else if (code === 0x10c7 || code === 0x10cd) {
        out += String.fromCodePoint(code + 0x30);
      } else if (code >= 0x1c90 && code <= 0x1cba) {
        out += String.fromCodePoint(code - (0x1c90 - 0x10d0));
      } else {
        out += ch;
      }
    }
    return out;
  }

  function toAsomtavruli(text) {
    if (typeof text !== 'string') return { output: '', unsupportedChars: [] };
    const mkhedruli = normalizeToMkhedruli(text);
    const unsupported = new Set();
    let out = '';
    const chars = Array.from(mkhedruli);

    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const code = ch.codePointAt(0);
      if (code >= 0x10d0 && code <= 0x10f5) {
        out += String.fromCodePoint(code - 0x30);
      } else if (code === 0x10f7 || code === 0x10fd) {
        out += String.fromCodePoint(code - 0x30);
      } else if (code >= 0x10f6 && code <= 0x10fa) {
        unsupported.add(ch);
        out += ch;
      } else {
        out += ch;
      }
    }
    return { output: out, unsupportedChars: Array.from(unsupported) };
  }

  function fromAsomtavruli(text) {
    return normalizeToMkhedruli(text);
  }

  function fromParliamentStandard(text) {
    if (typeof text !== 'string') {
      return { output: '', unverifiedChars: [] };
    }
    let out = '';
    const chars = Array.from(text);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (Object.prototype.hasOwnProperty.call(PARLIAMENT_8BIT_TO_UNICODE, ch)) {
        out += PARLIAMENT_8BIT_TO_UNICODE[ch];
      } else {
        out += ch;
      }
    }
    return { output: out, unverifiedChars: [] };
  }

  function toParliamentStandard(text) {
    if (typeof text !== 'string') {
      return { output: '' };
    }
    let out = '';
    const chars = Array.from(text);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const code = ch.codePointAt(0);
      // თუ მთავრულია (U+1C90..U+1CBA), გადავიყვანოთ პარლამენტის დიდ ასოებში (À..ß, ¨)
      if (code >= 0x1c90 && code <= 0x1cb0) {
        const idx = code - 0x1c90;
        out += PARLIAMENT_8BIT_UPPER[idx] || ch;
      } else if (Object.prototype.hasOwnProperty.call(PARLIAMENT_UNICODE_TO_8BIT, ch)) {
        out += PARLIAMENT_UNICODE_TO_8BIT[ch];
      } else {
        out += ch;
      }
    }
    return { output: out };
  }

  function fromAcadNusx(text) {
    if (typeof text !== 'string') return { output: '', unverifiedChars: [] };
    let out = '';
    const unverified = new Set();
    const chars = Array.from(text);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (Object.prototype.hasOwnProperty.call(ACADNUSX_ASCII_TO_UNICODE, ch)) {
        out += ACADNUSX_ASCII_TO_UNICODE[ch];
      } else if (/[A-Z]/.test(ch)) {
        unverified.add(ch);
        out += ch;
      } else {
        out += ch;
      }
    }
    return { output: out, unverifiedChars: Array.from(unverified) };
  }

  function toAcadNusx(text) {
    if (typeof text !== 'string') return { output: '' };
    const mkhedruli = normalizeToMkhedruli(text);
    let out = '';
    const chars = Array.from(mkhedruli);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      out += ACADNUSX_UNICODE_TO_ASCII[ch] || ch;
    }
    return { output: out };
  }

  function unicodeToLatin(text) {
    if (typeof text !== 'string') return '';
    const mkhedruli = normalizeToMkhedruli(text);
    let out = '';
    const chars = Array.from(mkhedruli);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (Object.prototype.hasOwnProperty.call(UNICODE_TO_LATIN_MAP, ch)) {
        out += UNICODE_TO_LATIN_MAP[ch];
      } else {
        out += ch;
      }
    }
    return out;
  }

  function convertGeorgianText(inputText, sourceFormat, targetFormat, options) {
    const opts = options || {};
    const validFormats = ['latin', 'unicode', 'parliament', 'acadnusx', 'asomtavruli'];
    if (!validFormats.includes(sourceFormat)) {
      throw new Error('უცნობი საწყისი ფორმატი: ' + sourceFormat);
    }
    if (!validFormats.includes(targetFormat)) {
      throw new Error('უცნობი საბოლოო ფორმატი: ' + targetFormat);
    }
    if (typeof inputText !== 'string') {
      return { output: '', warnings: [], ambiguities: [] };
    }

    const warnings = [];
    let ambiguities = [];
    let canonicalUnicode = '';

    if (sourceFormat === 'unicode') {
      canonicalUnicode = opts.normalizeMtavruliInput ? normalizeToMkhedruli(inputText) : inputText;
    } else if (sourceFormat === 'latin') {
      const translitRes = transliterateGeorgian(inputText, opts.latinMode || 'smart');
      canonicalUnicode = translitRes.output;
      ambiguities = translitRes.ambiguities;
    } else if (sourceFormat === 'parliament') {
      const parlRes = fromParliamentStandard(inputText);
      canonicalUnicode = parlRes.output;
    } else if (sourceFormat === 'acadnusx') {
      const acadRes = fromAcadNusx(inputText);
      canonicalUnicode = acadRes.output;
      if (acadRes.unverifiedChars.length > 0) {
        warnings.push(
          'საწყის ტექსტში შეგხვდა დიდი ლათინური ასოები (' +
          acadRes.unverifiedChars.join(', ') +
          '), რომლებიც არ შედის AcadNusx-ის 33-ასოიან ცხრილში (T, J, R, S, C, Z, W). ისინი უცვლელად შენარჩუნდა.'
        );
      }
    } else if (sourceFormat === 'asomtavruli') {
      canonicalUnicode = fromAsomtavruli(inputText);
    }

    let finalOutput = '';

    if (targetFormat === 'unicode') {
      finalOutput = normalizeToMkhedruli(canonicalUnicode);
    } else if (targetFormat === 'latin') {
      finalOutput = unicodeToLatin(canonicalUnicode);
      ambiguities = [];
    } else if (targetFormat === 'parliament') {
      finalOutput = toParliamentStandard(canonicalUnicode).output;
    } else if (targetFormat === 'acadnusx') {
      finalOutput = toAcadNusx(canonicalUnicode).output;
    } else if (targetFormat === 'asomtavruli') {
      const asomRes = toAsomtavruli(canonicalUnicode);
      finalOutput = asomRes.output;
      if (asomRes.unsupportedChars.length > 0) {
        warnings.push(
          'ზოგიერთ სპეციფიკურ სიმბოლოს (' +
          asomRes.unsupportedChars.join(', ') +
          ') ისტორიულ ასომთავრულში (U+10A0-U+10C5) შესატყვისი არ გააჩნია და უცვლელად დარჩა.'
        );
      }
    }

    return {
      output: finalOutput,
      warnings: warnings,
      ambiguities: ambiguities
    };
  }

  /* 8. თანხის და რიცხვის სიტყვიერად ჩაწერა */
  const GEO_UNITS_1_TO_19 = [
    '', 'ერთი', 'ორი', 'სამი', 'ოთხი', 'ხუთი', 'ექვსი', 'შვიდი', 'რვა', 'ცხრა',
    'ათი', 'თერთმეტი', 'თორმეტი', 'ცამეტი', 'თოთხმეტი', 'თხუთმეტი', 'თექვსმეტი', 'ჩვიდმეტი', 'თვრამეტი', 'ცხრამეტი'
  ];

  const GEO_TWENTIES_EXACT = ['', 'ოცი', 'ორმოცი', 'სამოცი', 'ოთხმოცი'];
  const GEO_TWENTIES_PREFIX = ['', 'ოცდა', 'ორმოცდა', 'სამოცდა', 'ოთხმოცდა'];

  const GEO_HUNDREDS_EXACT = [
    '', 'ასი', 'ორასი', 'სამასი', 'ოთხასი', 'ხუთასი', 'ექვსასი', 'შვიდასი', 'რვაასი', 'ცხრაასი'
  ];
  const GEO_HUNDREDS_PREFIX = [
    '', 'ას', 'ორას', 'სამას', 'ოთხას', 'ხუთას', 'ექვსას', 'შვიდას', 'რვაას', 'ცხრაას'
  ];

  function convertUnder1000ToGeo(n) {
    if (n <= 0 || n >= 1000) return '';
    const h = Math.floor(n / 100);
    const rem = n % 100;
    const parts = [];

    if (h > 0) {
      if (rem === 0) {
        return GEO_HUNDREDS_EXACT[h];
      }
      parts.push(GEO_HUNDREDS_PREFIX[h]);
    }

    if (rem > 0) {
      if (rem < 20) {
        parts.push(GEO_UNITS_1_TO_19[rem]);
      } else {
        const v = Math.floor(rem / 20);
        const u = rem % 20;
        if (u === 0) {
          parts.push(GEO_TWENTIES_EXACT[v]);
        } else {
          parts.push(GEO_TWENTIES_PREFIX[v] + GEO_UNITS_1_TO_19[u]);
        }
      }
    }

    return parts.join(' ');
  }

  function numberToGeorgianWords(numInput) {
    const cleaned = typeof numInput === 'number' ? numInput : Number(String(numInput).trim().replace(/,/g, ''));
    if (!Number.isFinite(cleaned) || Math.abs(cleaned) > 999999999999) {
      throw new Error('გთხოვთ შეიყვანოთ რიცხვი 0-დან 999,999,999,999-მდე.');
    }

    const isNegative = cleaned < 0;
    const n = Math.floor(Math.abs(cleaned));

    if (n === 0) {
      return 'ნული';
    }

    const billions = Math.floor(n / 1000000000);
    const millions = Math.floor((n % 1000000000) / 1000000);
    const thousands = Math.floor((n % 1000000) / 1000);
    const remainder = n % 1000;

    const groups = [];

    if (billions > 0) {
      const hasMoreAfterBillions = (millions + thousands + remainder) > 0;
      const scaleWord = hasMoreAfterBillions ? 'მილიარდ' : 'მილიარდი';
      groups.push(convertUnder1000ToGeo(billions) + ' ' + scaleWord);
    }

    if (millions > 0) {
      const hasMoreAfterMillions = (thousands + remainder) > 0;
      const scaleWord = hasMoreAfterMillions ? 'მილიონ' : 'მილიონი';
      groups.push(convertUnder1000ToGeo(millions) + ' ' + scaleWord);
    }

    if (thousands > 0) {
      const hasMoreAfterThousands = remainder > 0;
      const scaleWord = hasMoreAfterThousands ? 'ათას' : 'ათასი';
      if (thousands === 1) {
        groups.push(scaleWord);
      } else {
        groups.push(convertUnder1000ToGeo(thousands) + ' ' + scaleWord);
      }
    }

    if (remainder > 0) {
      groups.push(convertUnder1000ToGeo(remainder));
    }

    const fullWords = groups.join(' ');
    return isNegative ? 'მინუს ' + fullWords : fullWords;
  }

  const CURRENCY_UNITS = {
    GEL: { main: 'ლარი', sub: 'თეთრი', symbol: '₾' },
    USD: { main: 'აშშ დოლარი', sub: 'ცენტი', symbol: '$' },
    EUR: { main: 'ევრო', sub: 'ევროცენტი', symbol: '€' }
  };

  function amountToGeorgianWords(amountInput, options) {
    const opts = options || {};
    const currencyCode = opts.currency || 'GEL';
    const subUnitAsWords = Boolean(opts.subUnitAsWords);

    const rawStr = String(amountInput).trim().replace(/\s+/g, '').replace(',', '.');
    if (rawStr === '' || !/^-?\d+(\.\d{1,4})?$/.test(rawStr)) {
      throw new Error('გთხოვთ შეიყვანოთ სწორი თანხა (მაგ.: 14250.85).');
    }

    const numericVal = Number(rawStr);
    if (!Number.isFinite(numericVal) || numericVal < 0 || numericVal > 999999999999) {
      throw new Error('თანხა უნდა იყოს 0-დან 999,999,999,999-მდე.');
    }

    const totalCents = Math.round((numericVal + Number.EPSILON) * 100);
    const wholePart = Math.floor(totalCents / 100);
    const subPart = totalCents % 100;

    const wholeWords = numberToGeorgianWords(wholePart);
    const subPartPadded = String(subPart).padStart(2, '0');
    const subWords = numberToGeorgianWords(subPart);

    if (currencyCode === 'NONE') {
      if (subPart === 0) {
        return {
          wordsText: wholeWords,
          contractText: wholePart.toLocaleString('en-US') + ' (' + wholeWords + ')',
          wholePart: wholePart,
          subPart: subPart
        };
      }
      const decWords = wholeWords + ' მთელი და ' + (subUnitAsWords ? subWords : subPartPadded) + ' მეასედი';
      return {
        wordsText: decWords,
        contractText: numericVal.toFixed(2) + ' (' + decWords + ')',
        wholePart: wholePart,
        subPart: subPart
      };
    }

    const curr = CURRENCY_UNITS[currencyCode] || CURRENCY_UNITS.GEL;
    const subFormatted = subUnitAsWords ? subWords : subPartPadded;
    const wordsText = wholeWords + ' ' + curr.main + ' და ' + subFormatted + ' ' + curr.sub;

    const formattedNumber = wholePart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + subPartPadded;
    const contractText = formattedNumber + ' ' + curr.symbol + ' (' + wordsText + ')';

    return {
      wordsText: wordsText,
      contractText: contractText,
      wholeWordsOnly: wholeWords + ' ' + curr.main,
      wholePart: wholePart,
      subPart: subPart
    };
  }

  /* 9. ხელფასის კალკულატორი */
  function calculateSalary(amountInput, options) {
    const opts = options || {};
    const direction = opts.direction || 'gross_to_net';
    const incomeTaxRatePercent = opts.incomeTaxRate !== undefined ? Number(opts.incomeTaxRate) : 20;
    const includePension = opts.includePension !== undefined ? Boolean(opts.includePension) : true;
    const employeePensionRatePercent = includePension ? 2 : 0;
    const employerPensionRatePercent = includePension ? 2 : 0;

    const cleanedAmount = typeof amountInput === 'number'
      ? amountInput
      : Number(String(amountInput).trim().replace(',', '.'));

    if (String(amountInput).trim() === '' || !Number.isFinite(cleanedAmount) || cleanedAmount < 0) {
      throw new Error('გთხოვთ შეიყვანოთ დადებითი ხელფასის თანხა.');
    }
    if (!Number.isFinite(incomeTaxRatePercent) || incomeTaxRatePercent < 0 || incomeTaxRatePercent >= 100) {
      throw new Error('საშემოსავლო გადასახადის განაკვეთი უნდა იყოს 0-დან 99%-მდე.');
    }

    const pRate = employeePensionRatePercent / 100;
    const tRate = incomeTaxRatePercent / 100;
    const netFactor = (1 - pRate) * (1 - tRate);

    let grossRaw, employeePensionRaw, taxableBaseRaw, incomeTaxRaw, netRaw;

    if (direction === 'gross_to_net') {
      grossRaw = cleanedAmount;
      employeePensionRaw = grossRaw * pRate;
      taxableBaseRaw = grossRaw - employeePensionRaw;
      incomeTaxRaw = taxableBaseRaw * tRate;
      netRaw = taxableBaseRaw - incomeTaxRaw;
    } else if (direction === 'net_to_gross') {
      netRaw = cleanedAmount;
      grossRaw = netRaw / netFactor;
      employeePensionRaw = grossRaw * pRate;
      taxableBaseRaw = grossRaw - employeePensionRaw;
      incomeTaxRaw = taxableBaseRaw * tRate;
    } else {
      throw new Error('უცნობი გამოთვლის მიმართულება.');
    }

    const employerPensionRaw = grossRaw * (employerPensionRatePercent / 100);
    const totalEmployerCostRaw = grossRaw + employerPensionRaw;
    const totalPensionFundRaw = employeePensionRaw + employerPensionRaw;

    function round2(n) {
      return Math.round((n + Number.EPSILON) * 100) / 100;
    }

    const formulaText = direction === 'gross_to_net'
      ? 'დასაბეგრი ბაზა = ' + grossRaw.toFixed(2) + ' - ' + employeePensionRaw.toFixed(2) + ' = ' + taxableBaseRaw.toFixed(2) + ' ₾ | საშემოსავლო (' + incomeTaxRatePercent + '%) = ' + incomeTaxRaw.toFixed(2) + ' ₾ | ხელზე = ' + netRaw.toFixed(2) + ' ₾'
      : 'დარიცხული (Gross) = ' + netRaw.toFixed(2) + ' / ' + netFactor.toFixed(4) + ' = ' + grossRaw.toFixed(2) + ' ₾ | საპენსიო (2%) = ' + employeePensionRaw.toFixed(2) + ' ₾ | საშემოსავლო (' + incomeTaxRatePercent + '%) = ' + incomeTaxRaw.toFixed(2) + ' ₾';

    return {
      direction: direction,
      gross: round2(grossRaw),
      net: round2(netRaw),
      employeePension: round2(employeePensionRaw),
      taxableBase: round2(taxableBaseRaw),
      incomeTax: round2(incomeTaxRaw),
      employerPension: round2(employerPensionRaw),
      totalEmployerCost: round2(totalEmployerCostRaw),
      totalPensionAccumulated: round2(totalPensionFundRaw),
      netFactor: Number(netFactor.toFixed(4)),
      formula: formulaText
    };
  }

  /* 10. ქართული IBAN შემმოწმებელი */
  const GEORGIAN_BANKS_BY_CODE = {
    BG: { name: 'სს „საქართველოს ბანკი“ (Bank of Georgia)', swift: 'BAGAGE22' },
    TB: { name: 'სს „თიბისი ბანკი“ (TBC Bank)', swift: 'TBCBGE22' },
    LB: { name: 'სს „ლიბერთი ბანკი“ (Liberty Bank)', swift: 'LBRTGE22' },
    CB: { name: 'სს „ბაზისბანკი“ (Basisbank)', swift: 'CBASGE22' },
    CD: { name: 'სს „კრედო ბანკი“ (Credo Bank)', swift: 'JSCRGE22' },
    PC: { name: 'სს „პროკრედიტ ბანკი“ (ProCredit Bank)', swift: 'MIBGGE22' },
    KS: { name: 'სს „ტერაბანკი“ (Terabank)', swift: 'TEBAGE22' },
    CR: { name: 'სს „ბანკი ქართუ“ (Cartu Bank)', swift: 'CRTUGE22' },
    HB: { name: 'სს „ჰალიკ ბანკი საქართველო“ (Halyk Bank)', swift: 'HABGGE22' },
    PA: { name: 'სს „პაშა ბანკი საქართველო“ (PASHA Bank)', swift: 'PAHAGE22' },
    IS: { name: 'სს „თურქეთის იშ ბანკი საქართველო“ (Isbank)', swift: 'ISBKGE22' },
    ZB: { name: 'სს „ზირაათ ბანკი საქართველო“ (Ziraat Bank)', swift: 'TCZBGE22' },
    NB: { name: 'საქართველოს ეროვნული ბანკი (NBG)', swift: 'BNLNGE22' },
    TR: { name: 'სახელმწიფო ხაზინა (State Treasury)', swift: 'TRESGE22' },
    VT: { name: 'სს „ვითიბი ბანკი ჯორჯია“ (VTB Bank)', swift: 'UGEBGE22' },
    SL: { name: 'სს „სილქ ბანკი“ (Silk Bank)', swift: 'DISNGE22' },
    PS: { name: 'სს „პეისერა ბანკი საქართველო“ (Paysera)', swift: 'EVIUGE22' }
  };

  function computeIbanMod97(rearrangedIban) {
    let numericStr = '';
    for (let i = 0; i < rearrangedIban.length; i++) {
      const code = rearrangedIban.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        numericStr += String(code - 55);
      } else {
        numericStr += rearrangedIban[i];
      }
    }

    let remainder = 0;
    for (let i = 0; i < numericStr.length; i += 7) {
      const part = String(remainder) + numericStr.slice(i, i + 7);
      remainder = Number(part) % 97;
    }
    return remainder;
  }

  function validateIBAN(rawIban) {
    if (typeof rawIban !== 'string' || rawIban.trim() === '') {
      throw new Error('გთხოვთ შეიყვანოთ IBAN ანგარიშის ნომერი.');
    }

    const cleaned = rawIban.replace(/[\s-]+/g, '').toUpperCase();
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();

    if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(cleaned)) {
      return {
        isValid: false,
        cleaned: cleaned,
        formatted: formatted,
        countryCode: cleaned.slice(0, 2),
        isGeorgian: cleaned.startsWith('GE'),
        reason: 'IBAN ფორმატი არასწორია: უნდა იწყებოდეს 2 ლათინური ასოთი (ქვეყნის კოდი) და 2 საკონტროლო ციფრით.'
      };
    }

    const countryCode = cleaned.slice(0, 2);
    const checkDigits = cleaned.slice(2, 4);
    const isGeorgian = countryCode === 'GE';

    if (isGeorgian && cleaned.length !== 22) {
      return {
        isValid: false,
        cleaned: cleaned,
        formatted: formatted,
        countryCode: countryCode,
        checkDigits: checkDigits,
        isGeorgian: true,
        reason: 'ქართული IBAN უნდა შედგებოდეს ზუსტად 22 სიმბოლოსგან (შეყვანილია ' + cleaned.length + ' სიმბოლო).'
      };
    }

    const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
    const mod = computeIbanMod97(rearranged);
    const isValid = mod === 1;

    let bankCode = '';
    let bankName = 'უცნობი / უცხოური ბანკი';
    let swift = '-';
    let suggestedCheckDigits = checkDigits;

    if (isGeorgian) {
      bankCode = cleaned.slice(4, 6);
      const bankInfo = GEORGIAN_BANKS_BY_CODE[bankCode];
      if (bankInfo) {
        bankName = bankInfo.name;
        swift = bankInfo.swift;
      } else {
        bankName = 'უცნობი ბანკის კოდი (' + bankCode + ')';
      }

      if (!isValid) {
        const zeroCheckRearranged = cleaned.slice(4) + 'GE00';
        const remForZero = computeIbanMod97(zeroCheckRearranged);
        suggestedCheckDigits = String(98 - remForZero).padStart(2, '0');
      }
    }

    return {
      isValid: isValid,
      cleaned: cleaned,
      formatted: formatted,
      countryCode: countryCode,
      checkDigits: checkDigits,
      suggestedCheckDigits: suggestedCheckDigits,
      isGeorgian: isGeorgian,
      bankCode: bankCode,
      bankName: bankName,
      swift: swift,
      accountNumber: isGeorgian ? cleaned.slice(6) : cleaned.slice(4),
      reason: isValid
        ? 'IBAN ანგარიში ვალიდურია (MOD-97 შემოწმება წარმატებით გაიარა).'
        : 'საკონტროლო ციფრები (' + checkDigits + ') არ ემთხვევა MOD-97 ალგორითმს' +
          (isGeorgian ? ' (სავარაუდო სწორი საკონტროლო კოდია: GE' + suggestedCheckDigits + ').' : '.')
    };
  }

  /* 11. QR კოდის გენერატორი */
  const QR_VERSION_SPECS_L = [
    null,
    [26, 7, 1, 19, 0, 0, []],
    [44, 10, 1, 34, 0, 0, [6, 18]],
    [70, 15, 1, 55, 0, 0, [6, 22]],
    [100, 20, 1, 80, 0, 0, [6, 26]],
    [134, 26, 1, 108, 0, 0, [6, 30]],
    [172, 18, 2, 68, 0, 0, [6, 34]],
    [196, 20, 2, 78, 0, 0, [6, 22, 38]],
    [242, 24, 2, 97, 0, 0, [6, 24, 42]],
    [292, 30, 2, 116, 0, 0, [6, 26, 46]],
    [346, 18, 2, 68, 2, 69, [6, 28, 50]]
  ];

  const GF_EXP = new Uint8Array(512);
  const GF_LOG = new Uint8Array(256);
  (function initGaloisField() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      GF_EXP[i] = x;
      GF_LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i++) {
      GF_EXP[i] = GF_EXP[i - 255];
    }
  })();

  function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return GF_EXP[GF_LOG[a] + GF_LOG[b]];
  }

  function rsGeneratorPoly(degree) {
    let poly = [1];
    for (let i = 0; i < degree; i++) {
      const next = new Array(poly.length + 1).fill(0);
      const factor = GF_EXP[i];
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= poly[j];
        next[j + 1] ^= gfMul(poly[j], factor);
      }
      poly = next;
    }
    return poly;
  }

  function rsEncodeBlock(dataBytes, ecLen) {
    const gen = rsGeneratorPoly(ecLen);
    const rem = new Uint8Array(ecLen);
    for (let i = 0; i < dataBytes.length; i++) {
      const factor = dataBytes[i] ^ rem[0];
      for (let j = 0; j < ecLen - 1; j++) {
        rem[j] = rem[j + 1] ^ gfMul(gen[j + 1], factor);
      }
      rem[ecLen - 1] = gfMul(gen[ecLen], factor);
    }
    return rem;
  }

  function stringToUtf8Bytes(str) {
    if (typeof TextEncoder !== 'undefined') {
      return Array.from(new TextEncoder().encode(str));
    }
    const utf8 = unescape(encodeURIComponent(str));
    const arr = [];
    for (let i = 0; i < utf8.length; i++) {
      arr.push(utf8.charCodeAt(i));
    }
    return arr;
  }

  function generateQrMatrix(text) {
    if (typeof text !== 'string' || text.trim() === '') {
      throw new Error('გთხოვთ შეიყვანოთ ტექსტი ან ბმული QR კოდის შესაქმნელად.');
    }

    const payloadBytes = stringToUtf8Bytes(text);
    let version = 0;
    for (let v = 1; v <= 10; v++) {
      const spec = QR_VERSION_SPECS_L[v];
      const totalDataCw = spec[2] * spec[3] + spec[4] * spec[5];
      const headerBytes = v <= 9 ? 2 : 3;
      if (payloadBytes.length + headerBytes <= totalDataCw) {
        version = v;
        break;
      }
    }

    if (version === 0) {
      throw new Error('ტექსტი ზედმეტად გრძელია სტანდარტული QR კოდისთვის (მაქსიმუმ 270 UTF-8 ბაიტი).');
    }

    const spec = QR_VERSION_SPECS_L[version];
    const ecLen = spec[1];
    const totalDataCw = spec[2] * spec[3] + spec[4] * spec[5];

    const bits = [];
    function pushBits(val, len) {
      for (let i = len - 1; i >= 0; i--) {
        bits.push((val >>> i) & 1);
      }
    }

    pushBits(0b0100, 4);
    pushBits(payloadBytes.length, version <= 9 ? 8 : 16);
    for (let i = 0; i < payloadBytes.length; i++) {
      pushBits(payloadBytes[i], 8);
    }

    const maxDataBits = totalDataCw * 8;
    const terminatorLen = Math.min(4, maxDataBits - bits.length);
    pushBits(0, terminatorLen);
    while (bits.length % 8 !== 0) {
      bits.push(0);
    }

    const dataCodewords = [];
    for (let i = 0; i < bits.length; i += 8) {
      let byteVal = 0;
      for (let b = 0; b < 8; b++) {
        byteVal = (byteVal << 1) | bits[i + b];
      }
      dataCodewords.push(byteVal);
    }

    let padToggle = true;
    while (dataCodewords.length < totalDataCw) {
      dataCodewords.push(padToggle ? 0xec : 0x11);
      padToggle = !padToggle;
    }

    const dataBlocks = [];
    const ecBlocks = [];
    let offset = 0;

    for (let b = 0; b < spec[2]; b++) {
      const block = dataCodewords.slice(offset, offset + spec[3]);
      offset += spec[3];
      dataBlocks.push(block);
      ecBlocks.push(Array.from(rsEncodeBlock(block, ecLen)));
    }
    for (let b = 0; b < spec[4]; b++) {
      const block = dataCodewords.slice(offset, offset + spec[5]);
      offset += spec[5];
      dataBlocks.push(block);
      ecBlocks.push(Array.from(rsEncodeBlock(block, ecLen)));
    }

    const interleaved = [];
    const maxDataBlockLen = Math.max(spec[3], spec[5]);
    for (let i = 0; i < maxDataBlockLen; i++) {
      for (let b = 0; b < dataBlocks.length; b++) {
        if (i < dataBlocks[b].length) {
          interleaved.push(dataBlocks[b][i]);
        }
      }
    }
    for (let i = 0; i < ecLen; i++) {
      for (let b = 0; b < ecBlocks.length; b++) {
        interleaved.push(ecBlocks[b][i]);
      }
    }

    const size = version * 4 + 17;
    const modules = Array.from({ length: size }, function () {
      return new Int8Array(size);
    });
    const isFunction = Array.from({ length: size }, function () {
      return new Uint8Array(size);
    });

    function setFunctionModule(r, c, dark) {
      if (r < 0 || r >= size || c < 0 || c >= size) return;
      modules[r][c] = dark ? 1 : 0;
      isFunction[r][c] = 1;
    }

    function drawFinderPattern(row, col) {
      for (let dr = -1; dr <= 7; dr++) {
        for (let dc = -1; dc <= 7; dc++) {
          const r = row + dr;
          const c = col + dc;
          if (r < 0 || r >= size || c < 0 || c >= size) continue;
          const isBorder = dr === 0 || dr === 6 || dc === 0 || dc === 6;
          const isInner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
          const isSep = dr === -1 || dr === 7 || dc === -1 || dc === 7;
          setFunctionModule(r, c, !isSep && (isBorder || isInner));
        }
      }
    }

    drawFinderPattern(0, 0);
    drawFinderPattern(0, size - 7);
    drawFinderPattern(size - 7, 0);

    for (let i = 8; i < size - 8; i++) {
      setFunctionModule(6, i, i % 2 === 0);
      setFunctionModule(i, 6, i % 2 === 0);
    }

    const alignCoords = spec[6];
    for (let i = 0; i < alignCoords.length; i++) {
      for (let j = 0; j < alignCoords.length; j++) {
        const ar = alignCoords[i];
        const ac = alignCoords[j];
        if (
          (ar === 6 && ac === 6) ||
          (ar === 6 && ac === size - 7) ||
          (ar === size - 7 && ac === 6)
        ) {
          continue;
        }
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const dark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
            setFunctionModule(ar + dr, ac + dc, dark);
          }
        }
      }
    }

    for (let i = 0; i <= 8; i++) {
      if (i !== 6) {
        if (!isFunction[8][i]) setFunctionModule(8, i, false);
        if (!isFunction[i][8]) setFunctionModule(i, 8, false);
      }
    }
    for (let i = 0; i < 8; i++) {
      if (!isFunction[8][size - 1 - i]) setFunctionModule(8, size - 1 - i, false);
      if (!isFunction[size - 1 - i][8]) setFunctionModule(size - 1 - i, 8, false);
    }
    setFunctionModule(size - 8, 8, true);

    const allBits = [];
    for (let i = 0; i < interleaved.length; i++) {
      for (let b = 7; b >= 0; b--) {
        allBits.push((interleaved[i] >>> b) & 1);
      }
    }

    let bitIdx = 0;
    let upward = true;
    for (let rightCol = size - 1; rightCol >= 1; rightCol -= 2) {
      if (rightCol === 6) rightCol = 5;
      for (let step = 0; step < size; step++) {
        const r = upward ? size - 1 - step : step;
        for (let dc = 0; dc < 2; dc++) {
          const c = rightCol - dc;
          if (!isFunction[r][c]) {
            const dark = bitIdx < allBits.length ? allBits[bitIdx] === 1 : false;
            bitIdx++;
            const masked = ((r + c) % 2 === 0) ? !dark : dark;
            modules[r][c] = masked ? 1 : 0;
          }
        }
      }
      upward = !upward;
    }

    const formatBits = 0x77c4;
    function getFormatBit(idx) {
      return ((formatBits >>> idx) & 1) === 1;
    }

    for (let i = 0; i <= 5; i++) setFunctionModule(8, i, getFormatBit(i));
    setFunctionModule(8, 7, getFormatBit(6));
    setFunctionModule(8, 8, getFormatBit(7));
    setFunctionModule(7, 8, getFormatBit(8));
    for (let i = 9; i < 15; i++) setFunctionModule(14 - i, 8, getFormatBit(i));

    for (let i = 0; i < 8; i++) setFunctionModule(8, size - 1 - i, getFormatBit(i));
    for (let i = 8; i < 15; i++) setFunctionModule(size - 15 + i, 8, getFormatBit(i));

    return {
      version: version,
      size: size,
      modules: modules
    };
  }

  function generateQrSvg(text, options) {
    const opts = options || {};
    const darkColor = opts.darkColor || '#0f172a';
    const lightColor = opts.lightColor || '#ffffff';
    const margin = opts.margin !== undefined ? Number(opts.margin) : 4;

    const qr = generateQrMatrix(text);
    const totalSize = qr.size + margin * 2;
    let paths = '';

    for (let r = 0; r < qr.size; r++) {
      for (let c = 0; c < qr.size; c++) {
        if (qr.modules[r][c] === 1) {
          paths += 'M' + (c + margin) + ',' + (r + margin) + 'h1v1h-1z';
        }
      }
    }

    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + totalSize + ' ' + totalSize + '" shape-rendering="crispEdges">' +
        '<rect width="100%" height="100%" fill="' + lightColor + '"/>' +
        '<path d="' + paths + '" fill="' + darkColor + '"/>' +
      '</svg>'
    );
  }

  /* ==========================================================================
     12. სესხის და იპოთეკის კალკულატორი (გრაფიკით და წინსწრებით)
     ========================================================================== */

  function roundMoney(n) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  function simulateLoanSchedule(principal, annualRatePercent, termMonths, scheduleType, extraMonthly, extraOneTime, extraOneTimeMonth, extraMode) {
    const monthlyRate = (annualRatePercent / 100) / 12;
    let balance = principal;
    let remainingMonths = termMonths;
    const schedule = [];
    let totalInterest = 0;
    let totalPaid = 0;

    let currentAnnuityPayment = 0;
    if (scheduleType === 'annuity') {
      if (monthlyRate === 0) {
        currentAnnuityPayment = principal / termMonths;
      } else {
        currentAnnuityPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
      }
    }

    const basePrincipalStep = principal / termMonths;
    let currentDecliningPrincipalStep = basePrincipalStep;

    for (let month = 1; month <= termMonths * 2 && balance > 0.005; month++) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = 0;
      let scheduledPayment = 0;

      if (scheduleType === 'annuity') {
        scheduledPayment = currentAnnuityPayment;
        principalPayment = scheduledPayment - interestPayment;
        if (principalPayment < 0) {
          principalPayment = 0;
        }
      } else {
        principalPayment = currentDecliningPrincipalStep;
        scheduledPayment = principalPayment + interestPayment;
      }

      if (principalPayment > balance) {
        principalPayment = balance;
        scheduledPayment = principalPayment + interestPayment;
      }

      let extraThisMonth = extraMonthly > 0 ? extraMonthly : 0;
      if (extraOneTime > 0 && month === extraOneTimeMonth) {
        extraThisMonth += extraOneTime;
      }

      if (principalPayment + extraThisMonth > balance) {
        extraThisMonth = Math.max(0, balance - principalPayment);
      }

      const actualPrincipalPaid = principalPayment + extraThisMonth;
      const actualTotalPayment = actualPrincipalPaid + interestPayment;
      balance = Math.max(0, balance - actualPrincipalPaid);

      totalInterest += interestPayment;
      totalPaid += actualTotalPayment;

      schedule.push({
        month: month,
        payment: roundMoney(actualTotalPayment),
        principal: roundMoney(principalPayment),
        interest: roundMoney(interestPayment),
        extraPayment: roundMoney(extraThisMonth),
        balance: roundMoney(balance)
      });

      remainingMonths = Math.max(1, termMonths - month);

      // თუ მომხმარებელმა აირჩია "ყოველთვიური შენატანის შემცირება" და მოხდა წინსწრება
      if (extraThisMonth > 0 && extraMode === 'reduce_payment' && balance > 0.005 && remainingMonths > 0) {
        if (scheduleType === 'annuity') {
          if (monthlyRate === 0) {
            currentAnnuityPayment = balance / remainingMonths;
          } else {
            currentAnnuityPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / (Math.pow(1 + monthlyRate, remainingMonths) - 1);
          }
        } else {
          currentDecliningPrincipalStep = balance / remainingMonths;
        }
      }
    }

    const firstPayment = schedule.length > 0 ? schedule[0].payment : 0;
    const lastPayment = schedule.length > 0 ? schedule[schedule.length - 1].payment : 0;

    return {
      firstPayment: firstPayment,
      lastPayment: lastPayment,
      totalPaid: roundMoney(totalPaid),
      totalInterest: roundMoney(totalInterest),
      actualMonths: schedule.length,
      schedule: schedule
    };
  }

  function calculateLoan(principalInput, annualRateInput, termMonthsInput, options) {
    const opts = options || {};
    const principal = Number(String(principalInput).trim().replace(',', '.'));
    const annualRate = Number(String(annualRateInput).trim().replace(',', '.'));
    const termMonths = Math.round(Number(termMonthsInput));
    const scheduleType = opts.scheduleType || 'annuity'; // 'annuity' | 'declining'
    const extraMonthly = Math.max(0, Number(String(opts.extraMonthly || 0).replace(',', '.')) || 0);
    const extraOneTime = Math.max(0, Number(String(opts.extraOneTime || 0).replace(',', '.')) || 0);
    const extraOneTimeMonth = Math.max(1, Math.round(Number(opts.extraOneTimeMonth || 1)));
    const extraMode = opts.extraMode || 'reduce_term'; // 'reduce_term' | 'reduce_payment'

    if (!Number.isFinite(principal) || principal <= 0) {
      throw new Error('გთხოვთ შეიყვანოთ სესხის დადებითი თანხა.');
    }
    if (!Number.isFinite(annualRate) || annualRate < 0 || annualRate > 200) {
      throw new Error('წლიური საპროცენტო განაკვეთი უნდა იყოს 0-დან 200%-მდე.');
    }
    if (!Number.isInteger(termMonths) || termMonths < 1 || termMonths > 600) {
      throw new Error('სესხის ვადა უნდა იყოს 1-დან 600 თვემდე.');
    }

    const baseline = simulateLoanSchedule(principal, annualRate, termMonths, scheduleType, 0, 0, 1, 'reduce_term');
    const actual = simulateLoanSchedule(principal, annualRate, termMonths, scheduleType, extraMonthly, extraOneTime, extraOneTimeMonth, extraMode);

    return {
      principal: roundMoney(principal),
      annualRate: annualRate,
      termMonths: termMonths,
      scheduleType: scheduleType,
      firstPayment: actual.firstPayment,
      lastPayment: actual.lastPayment,
      baselineFirstPayment: baseline.firstPayment,
      totalPaid: actual.totalPaid,
      totalInterest: actual.totalInterest,
      baselineTotalInterest: baseline.totalInterest,
      savedInterest: roundMoney(Math.max(0, baseline.totalInterest - actual.totalInterest)),
      actualMonths: actual.actualMonths,
      savedMonths: Math.max(0, termMonths - actual.actualMonths),
      schedule: actual.schedule
    };
  }

  return {
    transliterateGeorgian: transliterateGeorgian,
    analyzeText: analyzeText,
    normalizeSpaces: normalizeSpaces,
    removeEmptyLines: removeEmptyLines,
    removeDuplicateLines: removeDuplicateLines,
    transformTextCase: transformTextCase,
    calculateVAT: calculateVAT,
    parseCSV: parseCSV,
    csvToJson: csvToJson,
    jsonToCsv: jsonToCsv,
    GEORGIAN_PUBLIC_HOLIDAYS_MMDD: GEORGIAN_PUBLIC_HOLIDAYS_MMDD,
    parseCustomHolidays: parseCustomHolidays,
    calculateDateDifference: calculateDateDifference,
    addOrSubtractDays: addOrSubtractDays,
    getGeorgianDayName: getGeorgianDayName,
    calculateAspectDimensions: calculateAspectDimensions,
    formatBytes: formatBytes,
    PARLIAMENT_UNICODE_TO_8BIT: PARLIAMENT_UNICODE_TO_8BIT,
    PARLIAMENT_8BIT_TO_UNICODE: PARLIAMENT_8BIT_TO_UNICODE,
    ACADNUSX_UNICODE_TO_ASCII: ACADNUSX_UNICODE_TO_ASCII,
    ACADNUSX_ASCII_TO_UNICODE: ACADNUSX_ASCII_TO_UNICODE,
    normalizeToMkhedruli: normalizeToMkhedruli,
    toAsomtavruli: toAsomtavruli,
    fromAsomtavruli: fromAsomtavruli,
    toParliamentStandard: toParliamentStandard,
    fromParliamentStandard: fromParliamentStandard,
    toAcadNusx: toAcadNusx,
    fromAcadNusx: fromAcadNusx,
    unicodeToLatin: unicodeToLatin,
    convertGeorgianText: convertGeorgianText,
    numberToGeorgianWords: numberToGeorgianWords,
    amountToGeorgianWords: amountToGeorgianWords,
    calculateSalary: calculateSalary,
    GEORGIAN_BANKS_BY_CODE: GEORGIAN_BANKS_BY_CODE,
    validateIBAN: validateIBAN,
    generateQrMatrix: generateQrMatrix,
    generateQrSvg: generateQrSvg,
    calculateLoan: calculateLoan
  };
});