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
