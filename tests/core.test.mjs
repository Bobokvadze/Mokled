import test from 'node:test';
import assert from 'node:assert/strict';
import GeoCore from '../js/core.js';

test('1. ყოფილი პარლამენტის 33-ასოიანი სტანდარტი (ÀÁÂÃÄÅÆÈÉÊËÌÍÏÐÑÒÓÔÖ×ØÙÚÛÜÝÞßàáãä <-> ა..ჰ)', () => {
  const all33Unicode = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
  const all33Parliament = 'ÀÁÂÃÄÅÆÈÉÊËÌÍÏÐÑÒÓÔÖ×ØÙÚÛÜÝÞßàáãä';

  assert.equal(GeoCore.convertGeorgianText(all33Unicode, 'unicode', 'parliament').output, all33Parliament);
  assert.equal(GeoCore.convertGeorgianText(all33Parliament, 'parliament', 'unicode').output, all33Unicode);

  const sampleUnicode = 'საქართველო, ჰაერი';
  assert.equal(GeoCore.convertGeorgianText(sampleUnicode, 'unicode', 'parliament').output, 'ÓÀØÀÒÈÅÄËÏ, äÀÄÒÉ');
  assert.equal(GeoCore.convertGeorgianText('ÓÀØÀÒÈÅÄËÏ, äÀÄÒÉ', 'parliament', 'unicode').output, sampleUnicode);
});

test('2. რიცხვებისა და თანხების მძიმეებით გამოყოფა (formatMoney / formatNumber)', () => {
  assert.equal(GeoCore.formatMoney(372639, 2), '372,639.00');
  assert.equal(GeoCore.formatNumber(372639), '372,639');
});

test('3. სესხის კალკულატორი, ხელფასი, დღგ და IBAN', () => {
  const loan = GeoCore.calculateLoan(50000, 12, 12, { scheduleType: 'annuity' });
  assert.equal(loan.actualMonths, 12);
  assert.equal(GeoCore.calculateSalary(1000, { direction: 'gross_to_net', incomeTaxRate: 20, includePension: true }).net, 784);
  assert.equal(GeoCore.calculateVAT(100, 'add', 18).gross, 118);
  assert.equal(GeoCore.validateIBAN('GE61TB7777777777777777').isValid, true);
  assert.equal(GeoCore.validateIBAN('GE29TB7777777777777777').isValid, false);
  assert.equal(GeoCore.validateIBAN('GE29TB7777777777777777').suggestedCheckDigits, '61');
});
test('4. QR ვერსია 7+ შეიცავს ვერსიის ინფორმაციის ბლოკს (ISO/IEC 18004)', () => {
  const qr = GeoCore.generateQrMatrix('x'.repeat(140));
  assert.equal(qr.version, 7);
  // ვერსია 7-ის 18-ბიტიანი ვერსიის კოდი: 0x07C94
  let bitsTopRight = 0;
  let bitsBottomLeft = 0;
  for (let i = 17; i >= 0; i--) {
    const a = qr.size - 11 + (i % 3);
    const b = Math.floor(i / 3);
    bitsTopRight = (bitsTopRight << 1) | qr.modules[b][a];
    bitsBottomLeft = (bitsBottomLeft << 1) | qr.modules[a][b];
  }
  assert.equal(bitsTopRight, 0x07c94);
  assert.equal(bitsBottomLeft, 0x07c94);
});

test('5. ლათინური ტრანსლიტერაცია (კონვერტერის ჩატის რეჟიმი)', () => {
  const res = GeoCore.transliterateGeorgian('gamarjoba shen', 'smart');
  assert.equal(res.output, 'გამარჯობა შენ');
  assert.ok(Array.isArray(res.ambiguities));
});

test('6. მართლმადიდებლური აღდგომა და უქმეები', () => {
  const iso = (d) => d.toISOString().slice(0, 10);
  assert.equal(iso(GeoCore.getOrthodoxEaster(2023)), '2023-04-16');
  assert.equal(iso(GeoCore.getOrthodoxEaster(2024)), '2024-05-05');
  assert.equal(iso(GeoCore.getOrthodoxEaster(2025)), '2025-04-20');
  assert.equal(iso(GeoCore.getOrthodoxEaster(2026)), '2026-04-12');
  const h2026 = GeoCore.getGeorgianHolidaysForYear(2026).map((h) => h.date);
  ['2026-04-10', '2026-04-11', '2026-04-12', '2026-04-13'].forEach((d) => assert.ok(h2026.includes(d), d));
  // 2026-04-06..2026-04-17 (ორშ-პარ ორი კვირა): 10 სამუშაო დღიდან აკლდება 9 (ერთიანობის დღე), 10 და 13 აპრილი
  const diff = GeoCore.calculateDateDifference('2026-04-06', '2026-04-17', { includeEndDate: true, includeGeoHolidays: true });
  assert.equal(diff.workingDays, 7);
});

test('7. ვალუტა, ანაბარი, საურავი, ბიზნესის გადასახადი, ინვოისი', () => {
  const rates = { USD: { rate: 2.7, quantity: 1 }, JPY: { rate: 1.8, quantity: 100 } };
  assert.equal(GeoCore.convertCurrency(100, 'USD', 'GEL', rates).result, 270);
  assert.equal(Math.round(GeoCore.convertCurrency(270, 'GEL', 'JPY', rates).result), 15000);

  const dep = GeoCore.calculateDeposit(10000, 12, 12, { capitalization: 'monthly', taxRate: 0 });
  assert.equal(dep.finalBalance, 11268.25);
  const depEnd = GeoCore.calculateDeposit(10000, 12, 12, { capitalization: 'end', taxRate: 5 });
  assert.equal(depEnd.grossInterest, 1200);
  assert.equal(depEnd.tax, 60);
  assert.equal(depEnd.finalBalance, 11140);

  const pen = GeoCore.calculateTaxPenalty(1000, '2026-01-15', '2026-01-25', 0.05);
  assert.equal(pen.days, 10);
  assert.equal(pen.penalty, 5);

  assert.equal(GeoCore.calculateBusinessTax(100000, { mode: 'small' }).tax, 1000);
  assert.equal(GeoCore.calculateBusinessTax(600000, { mode: 'small' }).tax, 8000);
  assert.equal(GeoCore.calculateBusinessTax(50000, { mode: 'standard', expenses: 20000 }).tax, 6000);

  const inv = GeoCore.calculateInvoiceTotals([{ name: 'a', qty: 2, price: 50 }], { vatRate: 18 });
  assert.deepEqual([inv.net, inv.vat, inv.gross], [100, 18, 118]);
  const invIncl = GeoCore.calculateInvoiceTotals([{ name: 'a', qty: 1, price: 118 }], { vatRate: 18, pricesIncludeVat: true });
  assert.deepEqual([invIncl.net, invIncl.vat], [100, 18]);
});

test('8. პაროლის გენერატორი', () => {
  for (let i = 0; i < 50; i++) {
    const r = GeoCore.generatePassword({ length: 12, excludeAmbiguous: true });
    assert.equal(r.password.length, 12);
    assert.match(r.password, /[a-z]/);
    assert.match(r.password, /[A-Z]/);
    assert.match(r.password, /[0-9]/);
    assert.doesNotMatch(r.password, /[Il1O0o]/);
  }
  assert.equal(GeoCore.generatePassword({ length: 8, upper: false, digits: false, symbols: false }).password.match(/[a-z]/g).length, 8);
  assert.throws(() => GeoCore.generatePassword({ lower: false, upper: false, digits: false, symbols: false }));
});
