(function (root) {
  'use strict';

  const TOOLS_CATALOG = [
    { id: 'georgian-converter', title: 'ქართული ტექსტის კონვერტერი', shortTitle: 'კონვერტერი', url: 'georgian-converter.html', category: 'ტექსტი', icon: 'Ⴀა', description: 'ქართული ტექსტის სწრაფი გადაყვანა სხვადასხვა ფონტებს, კოდირებებსა და ლათინურ ტრანსლიტერაციას შორის.' },
    { id: 'loan-calculator', title: 'სესხის და იპოთეკის კალკულატორი', shortTitle: 'სესხი / იპოთეკა', url: 'loan-calculator.html', category: 'ფინანსები', icon: '🏠', description: 'სესხისა და იპოთეკის ყოველთვიური შენატანის, საშეღავათო პერიოდის, სრული გრაფიკისა და წინსწრებით დაფარვის ზუსტი კალკულატორი.' },
    { id: 'pdf-tools', title: 'PDF ხელსაწყოების ნაკრები', shortTitle: 'PDF ხელსაწყოები', url: 'pdf-tools.html', category: 'მედია', icon: '📄', description: 'PDF ფაილების გაერთიანება, გვერდების ამოღება/დაყოფა, შემობრუნება და სურათების PDF-ად გადაქცევა პირდაპირ ბრაუზერში, სერვერზე ატვირთვის გარეშე.' },
    { id: 'number-to-words', title: 'თანხის და რიცხვის სიტყვიერად ჩაწერა', shortTitle: 'თანხა სიტყვიერად', url: 'number-to-words.html', category: 'ფინანსები', icon: '№', description: 'თანხისა და რიცხვების უშეცდომო სიტყვიერი ჩაწერა ქართულად (ლარი და თეთრი, დოლარი, ევრო) ხელშეკრულებებისა და ინვოისებისთვის.' },
    { id: 'salary-calculator', title: 'ხელფასის კალკულატორი (Net ⇄ Gross)', shortTitle: 'ხელფასი', url: 'salary-calculator.html', category: 'ფინანსები', icon: '💼', description: 'დარიცხული (Gross) და ხელზე ასაღები (Net) ხელფასის ზუსტი კალკულატორი საშემოსავლო გადასახადისა (20% / 5%) და საპენსიო შენატანის (2%) დათვლით.' },
    { id: 'iban-validator', title: 'ქართული IBAN შემმოწმებელი', shortTitle: 'IBAN შემოწმება', url: 'iban-validator.html', category: 'ფინანსები', icon: '🏦', description: 'საბანკო ანგარიშის (IBAN) ვალიდაცია MOD-97 სტანდარტით, ქართული ბანკისა და SWIFT კოდის ავტომატური ამოცნობით.' },
    { id: 'vat-calculator', title: 'დღგ-ის კალკულატორი (18%)', shortTitle: 'დღგ 18%', url: 'vat-calculator.html', category: 'ფინანსები', icon: '₾', description: '18%-იანი დღგ-ის დამატება თანხაზე და დღგ-ის შემცველი თანხიდან დღგ-ის ნაწილის ზუსტი გამოყოფა ფორმულებითა და შუალედური შედეგებით.' },
    { id: 'qr-generator', title: 'QR კოდის გენერატორი', shortTitle: 'QR კოდი', url: 'qr-generator.html', category: 'მედია', icon: '▣', description: 'უფასო, უვადო QR კოდის შექმნა ბმულისთვის, ქართული ტექსტისთვის ან Wi-Fi-სთვის პირდაპირ ბრაუზერში - PNG და SVG ჩამოტვირთვით.' },
    { id: 'postal-codes', title: 'საქართველოს საფოსტო ინდექსები', shortTitle: 'საფოსტო კოდები', url: 'postal-codes.html', category: 'მონაცემები', icon: '📮', description: 'თბილისის ყველა ქუჩის, ჩიხისა და საქართველოს ქალაქების/სოფლების საფოსტო კოდების (7,000+ მისამართი) სწრაფი საძიებო.' },
    { id: 'text-tools', title: 'ტექსტის დამმუშავებელი', shortTitle: 'ტექსტის ანალიზი', url: 'text-tools.html', category: 'ტექსტი', icon: 'T', description: 'სიტყვებისა და სიმბოლოების დათვლა, ზედმეტი გამოტოვებებისა და ცარიელი ხაზების მოცილება, მხედრული/მთავრული რეგისტრის შეცვლა.' },
    { id: 'date-calculator', title: 'თარიღების კალკულატორი', shortTitle: 'თარიღები', url: 'date-calculator.html', category: 'დრო და თარიღი', icon: '📅', description: 'ორ თარიღს შორის კალენდარული და სამუშაო დღეების დათვლა, თარიღზე დღეების დამატება/გამოკლება საქართველოს უქმეების გათვალისწინებით.' },
    { id: 'image-tools', title: 'სურათის ხელსაწყო', shortTitle: 'სურათის შეკუმშვა', url: 'image-tools.html', category: 'მედია', icon: '🖼️', description: 'სურათის შეკუმშვა, ზომების შეცვლა და ფორმატის გადაყვანა (JPEG, WebP, PNG) პირდაპირ ბრაუზერში, სერვერზე ატვირთვის გარეშე.' }
  ];

  const NAV_GROUPS = [
    { label: 'ფინანსები', ids: ['loan-calculator', 'salary-calculator', 'number-to-words', 'iban-validator', 'vat-calculator'] },
    { label: 'ტექსტი', ids: ['georgian-converter', 'text-tools'] },
    { label: 'PDF და მედია', ids: ['pdf-tools', 'image-tools', 'qr-generator'] },
    { label: 'მონაცემები და დრო', ids: ['postal-codes', 'date-calculator'] }
  ];

  const USAGE_STORAGE_KEY = 'geotools_usage_counts_v1';
  const FAV_STORAGE_KEY = 'mokled_favorites_v1';
  const THEME_STORAGE_KEY = 'mokled_theme_v1';

  function getSavedTheme() {
    try { return localStorage.getItem(THEME_STORAGE_KEY) || 'light'; } catch (_) { return 'light'; }
  }

  function applyTheme(theme) {
    const active = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', active);
    try { localStorage.setItem(THEME_STORAGE_KEY, active); } catch (_) {}
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.textContent = active === 'dark' ? '☀️ ნათელი' : '🌙 მუქი';
      btn.setAttribute('aria-label', active === 'dark' ? 'ნათელ რეჟიმზე გადართვა' : 'მუქ რეჟიმზე გადართვა');
    }
  }

  applyTheme(getSavedTheme());

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function recordToolUsage(toolId) {
    if (!toolId) return;
    try {
      const raw = localStorage.getItem(USAGE_STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : {};
      data[toolId] = (Number(data[toolId]) || 0) + 1;
      localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(data));
    } catch (_) {}
  }

  function getUsageCounts() {
    try { const raw = localStorage.getItem(USAGE_STORAGE_KEY); return raw ? JSON.parse(raw) : {}; } catch (_) { return {}; }
  }

  function resetUsageCounts() {
    try { localStorage.removeItem(USAGE_STORAGE_KEY); } catch (_) {}
  }

  function getFavorites() {
    try {
      const raw = localStorage.getItem(FAV_STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  }

  function toggleFavorite(toolId) {
    const current = getFavorites();
    const idx = current.indexOf(toolId);
    let added = false;
    if (idx >= 0) { current.splice(idx, 1); } else { current.push(toolId); added = true; }
    try { localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(current)); } catch (_) {}
    return added;
  }

  function formatNumberWithCommas(rawVal, allowDecimals) {
    let clean = String(rawVal || '').replace(/[^0-9.]/g, '');
    if (!clean) return '';
    const parts = clean.split('.');
    const intPart = parts[0].replace(/^0+(?=\d)/, '');
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (allowDecimals && parts.length > 1) {
      return formattedInt + '.' + parts.slice(1).join('').slice(0, 4);
    }
    return formattedInt;
  }

  function parseMaskedNumber(val) {
    if (val === undefined || val === null) return 0;
    const clean = String(val).replace(/,/g, '').trim();
    const num = Number(clean);
    return Number.isFinite(num) ? num : 0;
  }

  function enableNumericInputMasking() {
    const maskTargets = document.querySelectorAll('input[data-mask="money"], #loan-principal, #loan-prepay, #sal-amount, #vat-amount, #num-input');
    maskTargets.forEach(function (inp) {
      if (inp.getAttribute('data-mask-bound') === '1') return;
      inp.setAttribute('data-mask-bound', '1');
      inp.setAttribute('type', 'text');
      inp.setAttribute('inputmode', 'decimal');

      if (inp.value) {
        inp.value = formatNumberWithCommas(inp.value, true);
      }

      inp.addEventListener('input', function () {
        const oldVal = inp.value;
        const selStart = inp.selectionStart || oldVal.length;
        const digitsBeforeCursor = oldVal.slice(0, selStart).replace(/[^0-9.]/g, '').length;
        const newVal = formatNumberWithCommas(oldVal, true);
        if (oldVal !== newVal) {
          inp.value = newVal;
          let newCursor = 0;
          let seenDigits = 0;
          for (let i = 0; i < newVal.length; i++) {
            if (/[0-9.]/.test(newVal[i])) seenDigits++;
            if (seenDigits >= digitsBeforeCursor) { newCursor = i + 1; break; }
          }
          if (digitsBeforeCursor === 0) newCursor = 0;
          try { inp.setSelectionRange(newCursor, newCursor); } catch (_) {}
        }
      });
    });
  }

  const CRC32_TABLE = (function () {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      t[i] = c >>> 0;
    }
    return t;
  })();

  function computeCrc32(u8) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < u8.length; i++) {
      crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ u8[i]) & 0xFF];
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function xmlEscape(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function colIndexToLetter(idx) {
    let s = '';
    let n = idx + 1;
    while (n > 0) {
      const m = (n - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      n = Math.floor((n - 1) / 26);
    }
    return s;
  }

  function buildXlsxBlob(sheetTitle, rows) {
    const stylesXml =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
        '<numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0.00"/></numFmts>' +
        '<fonts count="3">' +
          '<font><sz val="11"/><name val="Sylfaen"/></font>' +
          '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Sylfaen"/></font>' +
          '<font><b/><sz val="11"/><name val="Sylfaen"/></font>' +
        '</fonts>' +
        '<fills count="3">' +
          '<fill><patternFill patternType="none"/></fill>' +
          '<fill><patternFill patternType="gray125"/></fill>' +
          '<fill><patternFill patternType="solid"><fgColor rgb="FF2563EB"/><bgColor indexed="64"/></patternFill></fill>' +
        '</fills>' +
        '<borders count="2">' +
          '<border><left/><right/><top/><bottom/><diagonal/></border>' +
          '<border>' +
            '<left style="thin"><color rgb="FFD1D5DB"/></left>' +
            '<right style="thin"><color rgb="FFD1D5DB"/></right>' +
            '<top style="thin"><color rgb="FFD1D5DB"/></top>' +
            '<bottom style="thin"><color rgb="FFD1D5DB"/></bottom>' +
            '<diagonal/>' +
          '</border>' +
        '</borders>' +
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
        '<cellXfs count="5">' +
          '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/>' +
          '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
          '<xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>' +
          '<xf numFmtId="164" fontId="2" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1"/>' +
          '<xf numFmtId="0" fontId="2" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1"/>' +
        '</cellXfs>' +
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>' +
      '</styleSheet>';

    let sheetRowsXml = '';
    for (let r = 0; r < rows.length; r++) {
      const rowObj = rows[r];
      const cells = Array.isArray(rowObj) ? rowObj : (rowObj.cells || []);
      const rowType = (!Array.isArray(rowObj) && rowObj.type) ? rowObj.type : 'data';
      const rowNum = r + 1;
      let rowXml = '<row r="' + rowNum + '">';
      for (let c = 0; c < cells.length; c++) {
        const ref = colIndexToLetter(c) + rowNum;
        const rawVal = cells[c];
        if (rawVal === null || rawVal === undefined || rawVal === '') {
          rowXml += '<c r="' + ref + '" s="0" t="inlineStr"><is><t></t></is></c>';
          continue;
        }
        if (typeof rawVal === 'number' && Number.isFinite(rawVal)) {
          let styleIdx = 2;
          if (rowType === 'header') styleIdx = 1;
          else if (rowType === 'summary') styleIdx = (c === 0 && Number.isInteger(rawVal)) ? 4 : 3;
          else if (c === 0 && Number.isInteger(rawVal)) styleIdx = 0;
          rowXml += '<c r="' + ref + '" s="' + styleIdx + '" t="n"><v>' + rawVal + '</v></c>';
        } else {
          let styleIdx = 0;
          if (rowType === 'header') styleIdx = 1;
          else if (rowType === 'summary') styleIdx = 4;
          rowXml += '<c r="' + ref + '" s="' + styleIdx + '" t="inlineStr"><is><t>' + xmlEscape(rawVal) + '</t></is></c>';
        }
      }
      rowXml += '</row>';
      sheetRowsXml += rowXml;
    }

    const sheetXml =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
        '<cols>' +
          '<col min="1" max="1" width="14" customWidth="1"/>' +
          '<col min="2" max="8" width="22" customWidth="1"/>' +
        '</cols>' +
        '<sheetData>' + sheetRowsXml + '</sheetData>' +
      '</worksheet>';

    const files = [
      {
        name: '[Content_Types].xml',
        content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'
      },
      {
        name: '_rels/.rels',
        content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
      },
      {
        name: 'xl/workbook.xml',
        content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="' + xmlEscape(sheetTitle || 'სესხის გრაფიკი') + '" sheetId="1" r:id="rId1"/></sheets></workbook>'
      },
      {
        name: 'xl/_rels/workbook.xml.rels',
        content: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
      },
      { name: 'xl/styles.xml', content: stylesXml },
      { name: 'xl/worksheets/sheet1.xml', content: sheetXml }
    ];

    const enc = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    for (let i = 0; i < files.length; i++) {
      const nameBytes = enc.encode(files[i].name);
      const dataBytes = enc.encode(files[i].content);
      const crc = computeCrc32(dataBytes);
      const size = dataBytes.length;

      const lh = new Uint8Array(30 + nameBytes.length);
      const ldv = new DataView(lh.buffer);
      ldv.setUint32(0, 0x04034b50, true);
      ldv.setUint16(4, 20, true);
      ldv.setUint16(6, 0x0800, true);
      ldv.setUint16(8, 0, true);
      ldv.setUint16(10, 0, true);
      ldv.setUint16(12, 0, true);
      ldv.setUint32(14, crc, true);
      ldv.setUint32(18, size, true);
      ldv.setUint32(22, size, true);
      ldv.setUint16(26, nameBytes.length, true);
      ldv.setUint16(28, 0, true);
      lh.set(nameBytes, 30);

      localParts.push(lh, dataBytes);

      const ch = new Uint8Array(46 + nameBytes.length);
      const cdv = new DataView(ch.buffer);
      cdv.setUint32(0, 0x02014b50, true);
      cdv.setUint16(4, 20, true);
      cdv.setUint16(6, 20, true);
      cdv.setUint16(8, 0x0800, true);
      cdv.setUint16(10, 0, true);
      cdv.setUint16(12, 0, true);
      cdv.setUint16(14, 0, true);
      cdv.setUint32(16, crc, true);
      cdv.setUint32(20, size, true);
      cdv.setUint32(24, size, true);
      cdv.setUint16(28, nameBytes.length, true);
      cdv.setUint16(30, 0, true);
      cdv.setUint16(32, 0, true);
      cdv.setUint16(34, 0, true);
      cdv.setUint16(36, 0, true);
      cdv.setUint32(38, 0, true);
      cdv.setUint32(42, offset, true);
      ch.set(nameBytes, 46);

      centralParts.push(ch);
      offset += lh.length + size;
    }

    let cdSize = 0;
    for (let i = 0; i < centralParts.length; i++) cdSize += centralParts[i].length;

    const eocd = new Uint8Array(22);
    const edv = new DataView(eocd.buffer);
    edv.setUint32(0, 0x06054b50, true);
    edv.setUint16(4, 0, true);
    edv.setUint16(6, 0, true);
    edv.setUint16(8, files.length, true);
    edv.setUint16(10, files.length, true);
    edv.setUint32(12, cdSize, true);
    edv.setUint32(16, offset, true);
    edv.setUint16(20, 0, true);

    return new Blob(localParts.concat(centralParts, [eocd]), {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  }

  function downloadExcelXlsx(filename, sheetTitle, rows) {
    const blob = buildXlsxBlob(sheetTitle, rows);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.xlsx') ? filename : (filename + '.xlsx');
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function exportLoanScheduleFromDom() {
    const table = document.querySelector('table');
    if (!table) { showToast('გრაფიკის ცხრილი ვერ მოიძებნა.'); return; }
    const tbody = table.querySelector('tbody');
    const trList = tbody ? Array.from(tbody.querySelectorAll('tr')) : [];
    if (trList.length === 0) {
      showToast('ჯერ გამოთვალეთ სესხის გრაფიკი.');
      return;
    }

    const excelRows = [];
    excelRows.push({ type: 'header', cells: ['Mokled - სესხის და იპოთეკის გადახდის გრაფიკი', '', '', '', '', ''] });

    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach(function (box) {
      const lbl = box.querySelector('.stat-label');
      const val = box.querySelector('.stat-value');
      if (lbl && val) {
        excelRows.push({ type: 'summary', cells: [lbl.textContent.trim(), val.textContent.trim()] });
      }
    });
    excelRows.push({ type: 'data', cells: [] });

    const ths = Array.from(table.querySelectorAll('thead th')).map(function (th) { return th.textContent.trim(); });
    if (ths.length > 0) {
      excelRows.push({ type: 'header', cells: ths });
    }

    trList.forEach(function (tr) {
      const tds = Array.from(tr.querySelectorAll('td'));
      if (tds.length === 0) return;
      const rowCells = tds.map(function (td, idx) {
        const raw = td.textContent.trim();
        if (idx === 0) {
          const mMatch = raw.match(/^\d+/);
          return mMatch && raw.indexOf('საშეღ') === -1 ? Number(mMatch[0]) : raw;
        }
        const cleaned = raw.replace(/[₾$€,%\s]/g, '').replace(/,/g, '');
        if (cleaned !== '' && /^-?\d+(\.\d+)?$/.test(cleaned)) {
          return Number(Number(cleaned).toFixed(2));
        }
        return raw;
      });
      excelRows.push({ type: 'data', cells: rowCells });
    });

    downloadExcelXlsx('sesxis-grafiki.xlsx', 'სესხის გრაფიკი', excelRows);
    showToast('სესხის გრაფიკი ჩამოიტვირთა Excel (.xlsx) ფორმატში!');
  }

  function setupLoanExcelExportButton() {
    const btn = document.getElementById('btn-export-loan-excel') || document.getElementById('btn-export-loan-csv');
    if (btn) {
      const freshBtn = btn.cloneNode(true);
      freshBtn.id = 'btn-export-loan-excel';
      freshBtn.textContent = '📥 Excel-ში ჩამოტვირთვა (.xlsx)';
      btn.parentNode.replaceChild(freshBtn, btn);
      freshBtn.addEventListener('click', function (e) {
        e.preventDefault();
        exportLoanScheduleFromDom();
      });
    }
  }

  function initLayout(activeToolId) {
    const currentId = activeToolId || 'home';
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');

    if (headerEl) {
      const desktopDropdowns = NAV_GROUPS.map(function (grp) {
        const groupTools = grp.ids.map(function (id) {
          return TOOLS_CATALOG.find(function (t) { return t.id === id; });
        }).filter(Boolean);
        const hasActive = groupTools.some(function (t) { return t.id === currentId; });
        const itemsHtml = groupTools.map(function (t) {
          return '<a href="' + t.url + '" class="nav-drop-item ' + (currentId === t.id ? 'active' : '') + '">' +
            '<span class="nav-drop-icon">' + escapeHtml(t.icon) + '</span>' +
            '<span>' + escapeHtml(t.title) + '</span>' +
          '</a>';
        }).join('');

        return '<div class="nav-dropdown">' +
          '<button type="button" class="nav-link nav-drop-btn ' + (hasActive ? 'active' : '') + '">' +
            escapeHtml(grp.label) + ' <span class="caret">▾</span>' +
          '</button>' +
          '<div class="nav-drop-menu">' + itemsHtml + '</div>' +
        '</div>';
      }).join('');

      const mobileLinksHtml = ['<a href="index.html" class="nav-link ' + (currentId === 'home' ? 'active' : '') + '">🏠 მთავარი</a>'].concat(
        TOOLS_CATALOG.map(function (t) {
          return '<a href="' + t.url + '" class="nav-link ' + (currentId === t.id ? 'active' : '') + '">' + escapeHtml(t.shortTitle) + '</a>';
        })
      ).join('');

      const curTheme = getSavedTheme();
      const themeLabel = curTheme === 'dark' ? '☀️ ნათელი' : '🌙 მუქი';

      headerEl.innerHTML =
        '<div class="container header-inner">' +
          '<a href="index.html" class="brand" aria-label="Mokled - მთავარი გვერდი"><span class="brand-logo"><img src="assets/logo.png" alt="Mokled" class="logo-light" /><img src="assets/logo-dark.png" alt="Mokled" class="logo-dark" /></span></a>' +
          '<nav class="desktop-nav" aria-label="მთავარი ნავიგაცია">' +
            '<a href="index.html" class="nav-link ' + (currentId === 'home' ? 'active' : '') + '">მთავარი</a>' +
            desktopDropdowns +
          '</nav>' +
          '<div class="header-controls">' +
            '<button type="button" class="theme-toggle-btn" id="theme-toggle-btn">' + themeLabel + '</button>' +
            '<button type="button" class="mobile-menu-btn" id="mobile-menu-toggle" aria-expanded="false">მენიუ ☰</button>' +
          '</div>' +
          '<nav class="main-nav" id="main-nav" aria-label="მობილური ნავიგაცია">' + mobileLinksHtml + '</nav>' +
        '</div>';

      const menuBtn = document.getElementById('mobile-menu-toggle');
      const mainNav = document.getElementById('main-nav');
      if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
          const isOpen = mainNav.classList.toggle('open');
          menuBtn.setAttribute('aria-expanded', String(isOpen));
        });
      }

      const themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) {
        themeBtn.addEventListener('click', function () {
          applyTheme(getSavedTheme() === 'dark' ? 'light' : 'dark');
        });
      }
    }

    if (footerEl) {
      footerEl.innerHTML =
        '<div class="container footer-inner">' +
          '<div>' +
            '<strong>Mokled - მოკლედ | ქართული ციფრული ხელსაწყოების პორტალი</strong>' +
            '<p>ყველა გამოთვლა და ფაილის დამუშავება სრულდება ადგილობრივად, თქვენს ბრაუზერში.</p>' +
          '</div>' +
        '</div>';
    }

    if (currentId && currentId !== 'home') { recordToolUsage(currentId); }
    enableNumericInputMasking();
    if (currentId === 'loan-calculator') { setupLoanExcelExportButton(); }

    const topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'back-to-top hidden';
    topBtn.title = 'ზემოთ ასვლა';
    topBtn.textContent = '↑';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 360) { topBtn.classList.remove('hidden'); } else { topBtn.classList.add('hidden'); }
    });
    topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function () {});
      });
    }
  }

  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 2600);
  }

  function triggerButtonCopyFeedback(btnEl) {
    const el = btnEl || (document.activeElement && document.activeElement.tagName === 'BUTTON' ? document.activeElement : null);
    if (!el) return;
    if (el.getAttribute('data-copy-busy') === '1') return;
    const origHtml = el.innerHTML;
    el.setAttribute('data-copy-busy', '1');
    el.classList.add('btn-copied');
    if (el.classList.contains('zip-pill')) {
      const code = el.getAttribute('data-code') || '';
      el.innerHTML = '✓ ' + escapeHtml(code);
    } else {
      el.innerHTML = '✓ დაკოპირდა';
    }
    setTimeout(function () {
      el.innerHTML = origHtml;
      el.classList.remove('btn-copied');
      el.removeAttribute('data-copy-busy');
    }, 1500);
  }

  function copyToClipboard(text, successMsg, triggerEl) {
    const msg = successMsg || 'ტექსტი დაკოპირდა!';
    if (!text) { showToast('დასაკოპირებელი მონაცემი ცარიელია.'); return; }
    const activeBtn = triggerEl || (document.activeElement && document.activeElement.tagName === 'BUTTON' ? document.activeElement : null);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        triggerButtonCopyFeedback(activeBtn);
        showToast(msg);
      }).catch(function () {
        fallbackCopy(text, msg, activeBtn);
      });
    } else {
      fallbackCopy(text, msg, activeBtn);
    }
  }

  function fallbackCopy(text, msg, activeBtn) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      triggerButtonCopyFeedback(activeBtn);
      showToast(msg);
    } catch (_) {
      showToast('კოპირება ვერ მოხერხდა.');
    }
    ta.remove();
  }

  function downloadTextFile(filename, content, mimeType, includeUtf8Bom) {
    const prefix = includeUtf8Bom ? '\uFEFF' : '';
    const blob = new Blob([prefix + content], { type: mimeType || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function copyShareUrl(paramsObj) {
    const url = new URL(window.location.href);
    url.search = '';
    Object.keys(paramsObj).forEach(function (k) {
      if (paramsObj[k] !== undefined && paramsObj[k] !== null && String(paramsObj[k]) !== '') {
        url.searchParams.set(k, String(paramsObj[k]));
      }
    });
    copyToClipboard(url.toString(), 'გამოთვლის ბმული დაკოპირდა!');
  }

  root.GeoCommon = {
    TOOLS_CATALOG: TOOLS_CATALOG,
    escapeHtml: escapeHtml,
    recordToolUsage: recordToolUsage,
    getUsageCounts: getUsageCounts,
    resetUsageCounts: resetUsageCounts,
    getFavorites: getFavorites,
    toggleFavorite: toggleFavorite,
    initLayout: initLayout,
    showToast: showToast,
    copyToClipboard: copyToClipboard,
    downloadTextFile: downloadTextFile,
    copyShareUrl: copyShareUrl,
    applyTheme: applyTheme,
    parseMaskedNumber: parseMaskedNumber,
    formatNumberWithCommas: formatNumberWithCommas,
    downloadExcelXlsx: downloadExcelXlsx,
    exportLoanScheduleFromDom: exportLoanScheduleFromDom
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);