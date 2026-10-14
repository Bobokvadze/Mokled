(function (root) {
  'use strict';

  const TOOLS_CATALOG = [
    { id: 'georgian-converter', title: 'ქართული ტექსტის კონვერტერი', shortTitle: 'კონვერტერი', url: 'georgian-converter.html', category: 'ტექსტი', icon: 'Ⴀა', description: 'უნივერსალური კონვერტაცია AcadNusx-ს, ლათინურ ტრანსლიტერაციას (sh, ch, dz, kh...), ყოფილი პარლამენტის სტანდარტს (ÀÁÂÃ...ä), ქართულ უნიკოდსა და ასომთავრულს შორის.' },
    { id: 'loan-calculator', title: 'სესხის და იპოთეკის კალკულატორი', shortTitle: 'სესხი / იპოთეკა', url: 'loan-calculator.html', category: 'ფინანსები', icon: '🏠', description: 'სესხისა და იპოთეკის ყოველთვიური შენატანის, სრული გრაფიკისა და წინსწრებით დაფარვის (დაზოგილი პროცენტისა და ვადის) ზუსტი კალკულატორი.' },
    { id: 'pdf-tools', title: 'PDF ხელსაწყოების ნაკრები', shortTitle: 'PDF ხელსაწყოები', url: 'pdf-tools.html', category: 'მედია', icon: '📄', description: 'PDF ფაილების გაერთიანება, გვერდების ამოღება/დაყოფა, შემობრუნება და სურათების PDF-ად გადაქცევა პირდაპირ ბრაუზერში, სერვერზე ატვირთვის გარეშე.' },
    { id: 'number-to-words', title: 'თანხის და რიცხვის სიტყვიერად ჩაწერა', shortTitle: 'თანხა სიტყვიერად', url: 'number-to-words.html', category: 'ფინანსები', icon: '№', description: 'თანხისა და რიცხვების უშეცდომო სიტყვიერი ჩაწერა ქართულად (ლარი და თეთრი, დოლარი, ევრო) ხელშეკრულებებისა და ინვოისებისთვის.' },
    { id: 'salary-calculator', title: 'ხელფასის კალკულატორი (Net ⇄ Gross)', shortTitle: 'ხელფასი', url: 'salary-calculator.html', category: 'ფინანსები', icon: '💼', description: 'დარიცხული (Gross) და ხელზე ასაღები (Net) ხელფასის ზუსტი კალკულატორი საშემოსავლო გადასახადისა (20% / 5%) და საპენსიო შენატანის (2%) დათვლით.' },
    { id: 'iban-validator', title: 'ქართული IBAN შემმოწმებელი', shortTitle: 'IBAN შემოწმება', url: 'iban-validator.html', category: 'ფინანსები', icon: '🏦', description: 'საბანკო ანგარიშის (IBAN) ვალიდაცია MOD-97 სტანდარტით, ქართული ბანკისა და SWIFT კოდის ავტომატური ამოცნობით.' },
    { id: 'vat-calculator', title: 'დღგ-ის კალკულატორი (18%)', shortTitle: 'დღგ 18%', url: 'vat-calculator.html', category: 'ფინანსები', icon: '₾', description: '18%-იანი დღგ-ის დამატება თანხაზე და დღგ-ის შემცველი თანხიდან დღგ-ის ნაწილის ზუსტი გამოყოფა ფორმულებითა და შუალედური შედეგებით.' },
    { id: 'qr-generator', title: 'QR კოდის გენერატორი', shortTitle: 'QR კოდი', url: 'qr-generator.html', category: 'მედია', icon: '▣', description: 'უფასო, უვადო QR კოდის შექმნა ბმულისთვის, ქართული ტექსტისთვის ან Wi-Fi-სთვის პირდაპირ ბრაუზერში - PNG და SVG ჩამოტვირთვით.' },
    { id: 'postal-codes', title: 'საქართველოს საფოსტო ინდექსები', shortTitle: 'საფოსტო კოდები', url: 'postal-codes.html', category: 'მონაცემები', icon: '📮', description: 'თბილისის ყველა ქუჩის, ჩიხისა და საქართველოს ქალაქების/სოფლების საფოსტო კოდების (7,000+ მისამართი) სწრაფი საძიებო.' },
    { id: 'text-tools', title: 'ტექსტის დამმუშავებელი', shortTitle: 'ტექსტის ანალიზი', url: 'text-tools.html', category: 'ტექსტი', icon: 'T', description: 'სიტყვებისა და სიმბოლოების დათვლა, ზედმეტი გამოტოვებებისა და ცარიელი ხაზების მოცილება, მხედრული/მთავრული რეგისტრის შეცვლა.' },
    { id: 'csv-json', title: 'CSV / JSON გარდამქმნელი', shortTitle: 'CSV ⇄ JSON', url: 'csv-json.html', category: 'მონაცემები', icon: '{}', description: 'CSV ფაილის წაკითხვა, ცხრილად ჩვენება და CSV-სა და JSON-ს შორის უსაფრთხო გარდაქმნა ქართული Unicode-ის სრული მხარდაჭერით.' },
    { id: 'date-calculator', title: 'თარიღების კალკულატორი', shortTitle: 'თარიღები', url: 'date-calculator.html', category: 'დრო და თარიღი', icon: '📅', description: 'ორ თარიღს შორის კალენდარული და სამუშაო დღეების დათვლა, თარიღზე დღეების დამატება/გამოკლება საქართველოს უქმეების გათვალისწინებით.' },
    { id: 'image-tools', title: 'სურათის ხელსაწყო', shortTitle: 'სურათის შეკუმშვა', url: 'image-tools.html', category: 'მედია', icon: '🖼️', description: 'სურათის შეკუმშვა, ზომების შეცვლა და ფორმატის გადაყვანა (JPEG, WebP, PNG) პირდაპირ ბრაუზერში, სერვერზე ატვირთვის გარეშე.' }
  ];

  const NAV_GROUPS = [
    { label: 'ფინანსები', ids: ['loan-calculator', 'salary-calculator', 'number-to-words', 'iban-validator', 'vat-calculator'] },
    { label: 'ტექსტი', ids: ['georgian-converter', 'text-tools'] },
    { label: 'PDF და მედია', ids: ['pdf-tools', 'image-tools', 'qr-generator'] },
    { label: 'მონაცემები და დრო', ids: ['postal-codes', 'csv-json', 'date-calculator'] }
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
          '<a href="index.html" class="brand" aria-label="Mokled - მთავარი გვერდი"><span class="brand-logo"><img src="assets/logo.png" alt="Mokled" /></span></a>' +
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
    applyTheme: applyTheme
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);