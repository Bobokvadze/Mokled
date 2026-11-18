(function (root) {
  'use strict';

  // Lucide ხატულები (lucide-static 0.460.0, ISC License - https://lucide.dev/license)
  const ICONS = {
    "languages": "<path d=\"m5 8 6 6\" /><path d=\"m4 14 6-6 2-3\" /><path d=\"M2 5h12\" /><path d=\"M7 2h1\" /><path d=\"m22 22-5-10-5 10\" /><path d=\"M14 18h6\" />",
    "house": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />",
    "file-text": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /><path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /><path d=\"M10 9H8\" /><path d=\"M16 13H8\" /><path d=\"M16 17H8\" />",
    "book-open": "<path d=\"M12 7v14\" /><path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\" />",
    "text-cursor-input": "<path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\" /><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\" /><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\" /><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\" /><path d=\"M9 7v10\" />",
    "briefcase": "<path d=\"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\" /><rect width=\"20\" height=\"14\" x=\"2\" y=\"6\" rx=\"2\" />",
    "landmark": "<line x1=\"3\" x2=\"21\" y1=\"22\" y2=\"22\" /><line x1=\"6\" x2=\"6\" y1=\"18\" y2=\"11\" /><line x1=\"10\" x2=\"10\" y1=\"18\" y2=\"11\" /><line x1=\"14\" x2=\"14\" y1=\"18\" y2=\"11\" /><line x1=\"18\" x2=\"18\" y1=\"18\" y2=\"11\" /><polygon points=\"12 2 20 7 4 7\" />",
    "percent": "<line x1=\"19\" x2=\"5\" y1=\"5\" y2=\"19\" /><circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\" /><circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\" />",
    "qr-code": "<rect width=\"5\" height=\"5\" x=\"3\" y=\"3\" rx=\"1\" /><rect width=\"5\" height=\"5\" x=\"16\" y=\"3\" rx=\"1\" /><rect width=\"5\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\" /><path d=\"M21 16h-3a2 2 0 0 0-2 2v3\" /><path d=\"M21 21v.01\" /><path d=\"M12 7v3a2 2 0 0 1-2 2H7\" /><path d=\"M3 12h.01\" /><path d=\"M12 3h.01\" /><path d=\"M12 16v.01\" /><path d=\"M16 12h1\" /><path d=\"M21 12v.01\" /><path d=\"M12 21v-1\" />",
    "mail": "<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" /><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" />",
    "type": "<polyline points=\"4 7 4 4 20 4 20 7\" /><line x1=\"9\" x2=\"15\" y1=\"20\" y2=\"20\" /><line x1=\"12\" x2=\"12\" y1=\"4\" y2=\"20\" />",
    "calendar-days": "<path d=\"M8 2v4\" /><path d=\"M16 2v4\" /><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /><path d=\"M3 10h18\" /><path d=\"M8 14h.01\" /><path d=\"M12 14h.01\" /><path d=\"M16 14h.01\" /><path d=\"M8 18h.01\" /><path d=\"M12 18h.01\" /><path d=\"M16 18h.01\" />",
    "image": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /><circle cx=\"9\" cy=\"9\" r=\"2\" /><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" />",
    "coins": "<circle cx=\"8\" cy=\"8\" r=\"6\" /><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\" /><path d=\"M7 6h1v4\" /><path d=\"m16.71 13.88.7.71-2.82 2.82\" />",
    "piggy-bank": "<path d=\"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z\" /><path d=\"M2 9v1c0 1.1.9 2 2 2h1\" /><path d=\"M16 11h.01\" />",
    "store": "<path d=\"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7\" /><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\" /><path d=\"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4\" /><path d=\"M2 7h20\" /><path d=\"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7\" />",
    "alarm-clock": "<circle cx=\"12\" cy=\"13\" r=\"8\" /><path d=\"M12 9v4l2 2\" /><path d=\"M5 3 2 6\" /><path d=\"m22 6-3-3\" /><path d=\"M6.38 18.7 4 21\" /><path d=\"M17.64 18.67 20 21\" />",
    "receipt": "<path d=\"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z\" /><path d=\"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8\" /><path d=\"M12 17.5v-11\" />",
    "file-spreadsheet": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /><path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /><path d=\"M8 13h2\" /><path d=\"M14 13h2\" /><path d=\"M8 17h2\" /><path d=\"M14 17h2\" />",
    "key-round": "<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\" /><circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />",
    "calculator": "<rect width=\"16\" height=\"20\" x=\"4\" y=\"2\" rx=\"2\" /><line x1=\"8\" x2=\"16\" y1=\"6\" y2=\"6\" /><line x1=\"16\" x2=\"16\" y1=\"14\" y2=\"18\" /><path d=\"M16 10h.01\" /><path d=\"M12 10h.01\" /><path d=\"M8 10h.01\" /><path d=\"M12 14h.01\" /><path d=\"M8 14h.01\" /><path d=\"M12 18h.01\" /><path d=\"M8 18h.01\" />",
    "folder-open": "<path d=\"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\" />",
    "wallet": "<path d=\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\" /><path d=\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\" />",
    "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /><path d=\"m9 12 2 2 4-4\" />",
    "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />",
    "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /><path d=\"M2 12h20\" />",
    "wifi-off": "<path d=\"M12 20h.01\" /><path d=\"M8.5 16.429a5 5 0 0 1 7 0\" /><path d=\"M5 12.859a10 10 0 0 1 5.17-2.69\" /><path d=\"M19 12.859a10 10 0 0 0-2.007-1.523\" /><path d=\"M2 8.82a15 15 0 0 1 4.177-2.643\" /><path d=\"M22 8.82a15 15 0 0 0-11.288-3.764\" /><path d=\"m2 2 20 20\" />",
    "smartphone": "<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\" /><path d=\"M12 18h.01\" />",
    "arrow-right": "<path d=\"M5 12h14\" /><path d=\"m12 5 7 7-7 7\" />",
    "star": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />",
    "sparkles": "<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\" /><path d=\"M20 3v4\" /><path d=\"M22 5h-4\" /><path d=\"M4 17v2\" /><path d=\"M5 18H3\" />",
    "zap": "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" />",
    "download": "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /><polyline points=\"7 10 12 15 17 10\" /><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\" />"
  };

  function icon(name, extraClass) {
    const inner = ICONS[name];
    if (!inner) return '';
    return '<svg class="ico' + (extraClass ? ' ' + extraClass : '') + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + inner + '</svg>';
  }

  function hydrateIcons(rootEl) {
    (rootEl || document).querySelectorAll('[data-icon]').forEach(function (el) {
      if (el.getAttribute('data-icon-done') === '1') return;
      el.innerHTML = icon(el.getAttribute('data-icon'));
      el.setAttribute('data-icon-done', '1');
    });
  }

  const TOOLS_CATALOG = [
    { id: 'georgian-converter', title: 'ქართული ტექსტის კონვერტერი', shortTitle: 'კონვერტერი', url: 'georgian-converter.html', category: 'ტექსტი', icon: 'languages', description: 'ქართული ტექსტის სწრაფი გადაყვანა სხვადასხვა ფონტებს, კოდირებებსა და ლათინურ ტრანსლიტერაციას შორის.' },
    { id: 'loan-calculator', title: 'სესხის კალკულატორი', shortTitle: 'სესხის კალკულატორი', url: 'loan-calculator.html', category: 'ფინანსები', icon: 'house', description: 'სესხის ყოველთვიური შენატანის, საშეღავათო პერიოდის, გარანტიისა და წინსწრებით დაფარვის ზუსტი კალკულატორი.' },
    { id: 'pdf-tools',
     title: 'PDF ხელსაწყოების ნაკრები', shortTitle: 'PDF ხელსაწყოები', url: 'pdf-tools.html', category: 'მედია', icon: 'file-text', description: 'PDF ფაილების გაერთიანება, შეკუმშვა, გვერდების ამოღება/გადალაგება, შემობრუნება და სურათების PDF-ად გადაქცევა პირდაპირ ბრაუზერში, სერვერზე ატვირთვის გარეშე.' },
    { id: 'djvu-to-pdf', title: 'DjVu → PDF კონვერტერი', shortTitle: 'DjVu → PDF', url: 'djvu-to-pdf.html', category: 'მედია', icon: 'book-open', description: 'DjVu (.djvu, .djv) ფორმატის წიგნებისა და დოკუმენტების სწრაფი გადაყვანა სტანდარტულ PDF ფაილად პირდაპირ ბრაუზერში.' },
    { id: 'number-to-words', title: 'თანხის და რიცხვის სიტყვიერად ჩაწერა', shortTitle: 'თანხა სიტყვიერად', url: 'number-to-words.html', category: 'ფინანსები', icon: 'text-cursor-input', description: 'თანხისა და რიცხვების უშეცდომო სიტყვიერი ჩაწერა ქართულად (ლარი და თეთრი, დოლარი, ევრო) ხელშეკრულებებისა და ინვოისებისთვის.' },
    { id: 'salary-calculator', title: 'ხელფასის კალკულატორი (Net ⇄ Gross)', shortTitle: 'ხელფასი', url: 'salary-calculator.html', category: 'ფინანსები', icon: 'briefcase', description: 'დარიცხული (Gross) და ხელზე ასაღები (Net) ხელფასის ზუსტი კალკულატორი საშემოსავლო გადასახადისა (20% / 5%) და საპენსიო შენატანის (2%) დათვლით.' },
    { id: 'iban-validator', title: 'ქართული IBAN შემმოწმებელი', shortTitle: 'IBAN შემოწმება', url: 'iban-validator.html', category: 'ფინანსები', icon: 'landmark', description: 'საბანკო ანგარიშის (IBAN) ვალიდაცია MOD-97 სტანდარტით, ქართული ბანკისა და SWIFT კოდის ავტომატური ამოცნობით.' },
    { id: 'vat-calculator', title: 'დღგ-ის კალკულატორი (18%)', shortTitle: 'დღგ 18%', url: 'vat-calculator.html', category: 'ფინანსები', icon: 'percent', description: '18%-იანი დღგ-ის დამატება თანხაზე და დღგ-ის შემცველი თანხიდან დღგ-ის ნაწილის ზუსტი გამოყოფა ფორმულებითა და შუალედური შედეგებით.' },
    { id: 'qr-generator', title: 'QR კოდის გენერატორი', shortTitle: 'QR კოდი', url: 'qr-generator.html', category: 'მედია', icon: 'qr-code', description: 'უფასო, უვადო QR კოდის შექმნა ბმულისთვის, ქართული ტექსტისთვის ან Wi-Fi-სთვის პირდაპირ ბრაუზერში - PNG და SVG ჩამოტვირთვით.' },
    { id: 'postal-codes', title: 'საქართველოს საფოსტო ინდექსები', shortTitle: 'საფოსტო კოდები', url: 'postal-codes.html', category: 'მონაცემები', icon: 'mail', description: 'თბილისის ყველა ქუჩის, ჩიხისა და საქართველოს ქალაქების/სოფლების საფოსტო კოდების (7,000+ მისამართი) სწრაფი საძიებო.' },
    { id: 'text-tools', title: 'ტექსტის დამმუშავებელი', shortTitle: 'ტექსტის ანალიზი', url: 'text-tools.html', category: 'ტექსტი', icon: 'type', description: 'სიტყვებისა და სიმბოლოების დათვლა, ზედმეტი გამოტოვებებისა და ცარიელი ხაზების მოცილება, მხედრული/მთავრული რეგისტრის შეცვლა.' },
    { id: 'date-calculator', title: 'თარიღების კალკულატორი', shortTitle: 'თარიღები', url: 'date-calculator.html', category: 'დრო და თარიღი', icon: 'calendar-days', description: 'ორ თარიღს შორის კალენდარული და სამუშაო დღეების დათვლა, თარიღზე დღეების დამატება/გამოკლება საქართველოს უქმეების (აღდგომის ჩათვლით) გათვალისწინებით.' },
    { id: 'currency-converter', title: 'ვალუტის კონვერტერი (სებ-ის კურსით)', shortTitle: 'ვალუტის კონვერტერი', url: 'currency-converter.html', category: 'ფინანსები', icon: 'coins', description: 'ვალუტების გადაყვანა საქართველოს ეროვნული ბანკის ოფიციალური კურსით, ნებისმიერი თარიღისთვის და ყველა ვალუტის კურსის ცხრილით.' },
    { id: 'deposit-calculator', title: 'ანაბრის (დეპოზიტის) კალკულატორი', shortTitle: 'ანაბარი', url: 'deposit-calculator.html', category: 'ფინანსები', icon: 'piggy-bank', description: 'ანაბრის შემოსავლის გამოთვლა რთული პროცენტით (კაპიტალიზაციით), ყოველთვიური შევსებითა და პროცენტზე გადასახადის გათვალისწინებით.' },
    { id: 'tax-penalty-calculator', title: 'საურავის კალკულატორი', shortTitle: 'საურავი', url: 'tax-penalty-calculator.html', category: 'ფინანსები', icon: 'alarm-clock', description: 'ვადაგადაცილებულ გადასახადზე დარიცხული საურავის გამოთვლა გადახდის ვადისა და ფაქტობრივი გადახდის თარიღის მიხედვით.' },
    { id: 'invoice-generator', title: 'ინვოისის გენერატორი', shortTitle: 'ინვოისი', url: 'invoice-generator.html', category: 'ფინანსები', icon: 'receipt', description: 'ინვოისის შექმნა გამყიდველისა და მყიდველის მონაცემებით, პოზიციებით, დღგ-ით, თანხით სიტყვიერად და PDF-ად შენახვით.' },
    { id: 'data-converter', title: 'CSV / Excel ⇄ JSON კონვერტერი', shortTitle: 'CSV / Excel ⇄ JSON', url: 'data-converter.html', category: 'მონაცემები', icon: 'file-spreadsheet', description: 'CSV და Excel (XLSX) ცხრილების გადაყვანა JSON-ად და პირიქით, ცხრილის წინასწარი ნახვით, პირდაპირ ბრაუზერში.' },
    { id: 'password-generator', title: 'პაროლის გენერატორი', shortTitle: 'პაროლი', url: 'password-generator.html', category: 'მონაცემები', icon: 'key-round', description: 'ძლიერი, შემთხვევითი პაროლის შექმნა კრიპტოგრაფიულად უსაფრთხო გენერატორით და სიძლიერის შეფასებით.' },
    { id: 'image-tools', title: 'სურათის ხელსაწყო', shortTitle: 'სურათის შეკუმშვა', url: 'image-tools.html', category: 'მედია', icon: 'image', description: 'სურათის შეკუმშვა, ზომების შეცვლა და ფორმატის გადაყვანა (JPEG, WebP, PNG) პირდაპირ ბრაუზერში, სერვერზე ატვირთვის გარეშე.' }
  ];

  const NAV_GROUPS = [
    { label: 'ფინანსები', ids: ['loan-calculator', 'deposit-calculator', 'currency-converter', 'salary-calculator', 'vat-calculator', 'tax-penalty-calculator', 'invoice-generator', 'number-to-words', 'iban-validator'] },
    { label: 'ტექსტი', ids: ['georgian-converter', 'text-tools'] },
    { label: 'PDF და მედია', ids: ['pdf-tools', 'djvu-to-pdf', 'image-tools', 'qr-generator'] },
    { label: 'მონაცემები და სხვა', ids: ['postal-codes', 'date-calculator', 'data-converter', 'password-generator'] }
  ];

  const USAGE_STORAGE_KEY = 'geotools_usage_counts_v1';
  const FAV_STORAGE_KEY = 'mokled_favorites_v1';
  const THEME_STORAGE_KEY = 'mokled_theme_v1';
  const NBG_CACHE_KEY = 'mokled_nbg_rates_v1';

  function getSavedTheme() {
    try { return localStorage.getItem(THEME_STORAGE_KEY) || 'light'; } catch (_) { return 'light'; }
  }

  function applyTheme(theme) {
    const active = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', active);
    try { localStorage.setItem(THEME_STORAGE_KEY, active); } catch (_) {}
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.innerHTML = active === 'dark' ? '<span class="theme-icon">☀️</span><span class="btn-label-text"> ნათელი</span>' : '<span class="theme-icon">🌙</span><span class="btn-label-text"> მუქი</span>';
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

  function initNbgHeaderRates() {
    const usdBtn = document.getElementById('nbg-pill-usd');
    const eurBtn = document.getElementById('nbg-pill-eur');
    if (!usdBtn || !eurBtn) return;

    function applyRatesToDom(data) {
      if (!data || !data.usd || !data.eur) return;
      const uRate = Number(data.usd.rate).toFixed(4);
      const eRate = Number(data.eur.rate).toFixed(4);
      const uDiff = Number(data.usd.diff || 0);
      const eDiff = Number(data.eur.diff || 0);
      const dateStr = data.date ? String(data.date).slice(0, 10) : '';

      const uArrow = Math.abs(uDiff) < 0.00005 ? '' : (uDiff > 0 ? ' <span class="nbg-up">▲</span>' : ' <span class="nbg-down">▼</span>');
      const eArrow = Math.abs(eDiff) < 0.00005 ? '' : (eDiff > 0 ? ' <span class="nbg-up">▲</span>' : ' <span class="nbg-down">▼</span>');

      usdBtn.setAttribute('data-rate', uRate);
      eurBtn.setAttribute('data-rate', eRate);
      usdBtn.innerHTML = '<span class="nbg-sym">$</span>' + uRate + uArrow;
      eurBtn.innerHTML = '<span class="nbg-sym">€</span>' + eRate + eArrow;

      const uSign = uDiff > 0 ? '+' : '';
      const eSign = eDiff > 0 ? '+' : '';
      usdBtn.title = 'ეროვნული ბანკის კურსი' + (dateStr ? ' (' + dateStr + ')' : '') + ': 1 USD = ' + uRate + ' ₾ (' + uSign + uDiff.toFixed(4) + ') — დააწკაპუნეთ დასაკოპირებლად';
      eurBtn.title = 'ეროვნული ბანკის კურსი' + (dateStr ? ' (' + dateStr + ')' : '') + ': 1 EUR = ' + eRate + ' ₾ (' + eSign + eDiff.toFixed(4) + ') — დააწკაპუნეთ დასაკოპირებლად';
    }

    try {
      const cached = localStorage.getItem(NBG_CACHE_KEY);
      if (cached) applyRatesToDom(JSON.parse(cached));
    } catch (_) {}

    usdBtn.addEventListener('click', function () {
      const r = usdBtn.getAttribute('data-rate') || '2.5987';
      copyToClipboard(r, 'სებ-ის USD კურსი (' + r + ') დაკოპირდა!', usdBtn);
    });

    eurBtn.addEventListener('click', function () {
      const r = eurBtn.getAttribute('data-rate') || '2.9129';
      copyToClipboard(r, 'სებ-ის EUR კურსი (' + r + ') დაკოპირდა!', eurBtn);
    });

    fetch('https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json')
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (json) {
        if (!json || !json[0] || !Array.isArray(json[0].currencies)) return;
        const list = json[0].currencies;
        const u = list.find(function (c) { return c.code === 'USD'; });
        const e = list.find(function (c) { return c.code === 'EUR'; });
        if (u && e) {
          const payload = {
            date: json[0].date || u.date || '',
            usd: { rate: Number(u.rate), diff: Number(u.diff || 0) },
            eur: { rate: Number(e.rate), diff: Number(e.diff || 0) }
          };
          applyRatesToDom(payload);
          try { localStorage.setItem(NBG_CACHE_KEY, JSON.stringify(payload)); } catch (_) {}
        }
      })
      .catch(function () {});
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
    excelRows.push({ type: 'header', cells: ['Mokled - სესხის გადახდის გრაფიკი', '', '', '', '', ''] });

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

  // კატეგორიის ფერი ხატულებისთვის (იგივე ფერები, რაც მთავარ გვერდზე)
  const CATEGORY_TONE = { 'ფინანსები': 'fi-blue', 'მედია': 'fi-red', 'ტექსტი': 'fi-violet', 'მონაცემები': 'fi-green', 'დრო და თარიღი': 'fi-green' };

  function toneFor(tool) {
    return (tool && CATEGORY_TONE[tool.category]) || 'fi-blue';
  }

  // ხელსაწყოს გვერდზე: ხატულა სათაურში და „მსგავსი ხელსაწყოები“ ბოლოში
  function enhanceToolPage(currentId) {
    const tool = TOOLS_CATALOG.find(function (t) { return t.id === currentId; });
    if (!tool) return;

    const h1 = document.querySelector('.page-header h1');
    if (h1 && !h1.querySelector('.page-icon')) {
      const badge = document.createElement('span');
      badge.className = 'page-icon ' + toneFor(tool);
      badge.setAttribute('aria-hidden', 'true');
      badge.innerHTML = icon(tool.icon);
      h1.insertBefore(badge, h1.firstChild);
    }

    const main = document.querySelector('main');
    if (!main || main.querySelector('.related-tools')) return;
    const sameCategory = TOOLS_CATALOG.filter(function (t) { return t.id !== tool.id && t.category === tool.category; });
    const others = TOOLS_CATALOG.filter(function (t) { return t.id !== tool.id && t.category !== tool.category; });
    const picks = sameCategory.slice(0, 4);
    for (let i = 0; picks.length < 4 && i < others.length; i++) picks.push(others[i]);

    const section = document.createElement('section');
    section.className = 'related-tools no-print';
    section.setAttribute('aria-label', 'მსგავსი ხელსაწყოები');
    section.innerHTML =
      '<h2>' + icon('sparkles') + 'სხვა სასარგებლო ხელსაწყოები</h2>' +
      '<div class="related-grid">' + picks.map(function (t) {
        return '<a class="related-card" href="' + t.url + '">' +
          '<span class="page-icon ' + toneFor(t) + '" aria-hidden="true">' + icon(t.icon) + '</span>' +
          '<span><strong>' + escapeHtml(t.shortTitle) + '</strong><small>' + escapeHtml(t.category) + '</small></span>' +
          '<span class="related-arrow" aria-hidden="true">' + icon('arrow-right') + '</span>' +
        '</a>';
      }).join('') + '</div>';
    main.appendChild(section);
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
            '<span class="nav-drop-icon">' + icon(t.icon) + '</span>' +
            '<span>' + escapeHtml(t.title) + '</span>' +
          '</a>';
        }).join('');

        return '<div class="nav-dropdown">' +
          '<button type="button" class="nav-link nav-drop-btn ' + (hasActive ? 'active' : '') + '">' +
            escapeHtml(grp.label) + ' <span class="caret">▾</span>' +
          '</button>' +
          '<div class="nav-drop-menu' + (groupTools.length > 6 ? ' wide' : '') + '">' + itemsHtml + '</div>' +
        '</div>';
      }).join('');

      const mobileLinksHtml = ['<a href="index.html" class="nav-link ' + (currentId === 'home' ? 'active' : '') + '">🏠 მთავარი</a>'].concat(
        TOOLS_CATALOG.map(function (t) {
          return '<a href="' + t.url + '" class="nav-link ' + (currentId === t.id ? 'active' : '') + '">' + escapeHtml(t.shortTitle) + '</a>';
        })
      ).join('');

      const curTheme = getSavedTheme();
      const themeLabel = curTheme === 'dark' ? '<span class="theme-icon">☀️</span><span class="btn-label-text"> ნათელი</span>' : '<span class="theme-icon">🌙</span><span class="btn-label-text"> მუქი</span>';

      headerEl.innerHTML =
        '<div class="container header-inner">' +
          '<a href="index.html" class="brand" aria-label="Mokled - მთავარი გვერდი"><span class="brand-logo"><img src="assets/logo.png" alt="Mokled" class="logo-light" /><img src="assets/logo-dark.png" alt="Mokled" class="logo-dark" /></span></a>' +
          '<nav class="desktop-nav" aria-label="მთავარი ნავიგაცია">' +
            '<a href="index.html" class="nav-link ' + (currentId === 'home' ? 'active' : '') + '">მთავარი</a>' +
            desktopDropdowns +
          '</nav>' +
          '<div class="header-controls">' +
            '<div class="nbg-header-rates" aria-label="ეროვნული ბანკის კურსი">' +
              '<span class="nbg-badge-lbl" title="საქართველოს ეროვნული ბანკის ოფიციალური კურსი">სებ:</span>' +
              '<button type="button" class="nbg-rate-pill" id="nbg-pill-usd" data-rate="2.5987" title="ეროვნული ბანკის USD კურსი — დააწკაპუნეთ დასაკოპირებლად"><span class="nbg-sym">$</span>2.5987</button>' +
              '<button type="button" class="nbg-rate-pill" id="nbg-pill-eur" data-rate="2.9129" title="ეროვნული ბანკის EUR კურსი — დააწკაპუნეთ დასაკოპირებლად"><span class="nbg-sym">€</span>2.9129</button>' +
            '</div>' +
            '<button type="button" class="theme-toggle-btn" id="theme-toggle-btn">' + themeLabel + '</button>' +
            '<button type="button" class="mobile-menu-btn" id="mobile-menu-toggle" aria-expanded="false" aria-label="მენიუ"><span class="btn-label-text">მენიუ </span>☰</button>' +
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

      initNbgHeaderRates();
    }

    if (footerEl) {
      const footerCols = NAV_GROUPS.map(function (grp) {
        const links = grp.ids.map(function (id) {
          return TOOLS_CATALOG.find(function (t) { return t.id === id; });
        }).filter(Boolean).map(function (t) {
          return '<li><a href="' + t.url + '">' + escapeHtml(t.shortTitle) + '</a></li>';
        }).join('');
        return '<div class="footer-col"><h4>' + escapeHtml(grp.label) + '</h4><ul>' + links + '</ul></div>';
      }).join('');

      footerEl.innerHTML =
        '<div class="container footer-grid">' +
          '<div class="footer-brand">' +
            '<a href="index.html" class="footer-logo" aria-label="Mokled - მთავარი გვერდი">' +
              '<img src="assets/logo.png" alt="Mokled" class="logo-light" loading="lazy" />' +
              '<img src="assets/logo-dark.png" alt="Mokled" class="logo-dark" loading="lazy" />' +
            '</a>' +
            '<p>უფასო საოფისე, ბიზნეს და ფინანსური ხელსაწყოები ქართულად - მოკლედ და მარტივად.</p>' +
            '<span class="footer-badge">' + icon('shield-check') + 'მონაცემები არ ტოვებს თქვენს ბრაუზერს</span>' +
          '</div>' +
          footerCols +
        '</div>' +
        '<div class="footer-bottom-wrap">' +
          '<div class="container footer-bottom">' +
            '<span>© ' + new Date().getFullYear() + ' Mokled - მოკლედ</span>' +
            '<nav aria-label="დამატებითი ბმულები">' +
              '<a href="about.html">ჩვენ შესახებ</a>' +
              '<a href="about.html#privacy">კონფიდენციალურობა</a>' +
              '<a href="index.html">ყველა ხელსაწყო</a>' +
            '</nav>' +
          '</div>' +
        '</div>';
    }

    enhanceToolPage(currentId);
    hydrateIcons(document);
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
      if (headerEl) { headerEl.classList.toggle('is-scrolled', window.scrollY > 8); }
    });
    topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      window.addEventListener('load', function () {
        // ძველი ქეშების წაშლას თავად sw.js-ის 'activate' ეტაპი აკეთებს (აქ ვერსიის მყარად ჩაწერა
        // ახალ ქეშს წაშლიდა, თუ ეს ფაილი და sw.js სხვადასხვა ვერსიაზე აღმოჩნდებოდნენ).
        navigator.serviceWorker.register('sw.js').then(function (reg) { reg.update(); }).catch(function () {});
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
    } else if (el.classList.contains('nbg-rate-pill')) {
      const rate = el.getAttribute('data-rate') || '';
      el.innerHTML = '✓ ' + escapeHtml(rate);
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
    icon: icon,
    hydrateIcons: hydrateIcons,
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