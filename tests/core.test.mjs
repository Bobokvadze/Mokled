import test from 'node:test';
import assert from 'node:assert/strict';
import GeoCore from '../js/core.js';

test('1. ქართული ტრანსლიტერაცია', () => {
  const res = GeoCore.transliterateGeorgian('gamarjoba, tbilisi!', 'smart');
  assert.equal(res.output, 'გამარჯობა, ტბილისი!');
});

test('2. ტექსტის დამმუშავებელი', () => {
  assert.equal(GeoCore.transformTextCase('საქართველო', 'mtavruli'), 'ᲡᲐᲥᲐᲠᲗᲕᲔᲚᲝ');
});

test('3. დღგ-ის კალკულატორი 18%', () => {
  assert.equal(GeoCore.calculateVAT(100, 'add', 18).gross, 118);
  assert.equal(GeoCore.calculateVAT(118, 'extract', 18).net, 100);
});

test('4. CSV / JSON გარდამქმნელი', () => {
  const csv = 'სახელი,კომპანია\nგიორგი,"შპს ""ქართული პროდუქტი"", თბილისი"';
  const parsed = GeoCore.csvToJson(csv, ',', true);
  assert.equal(parsed.json[0]['კომპანია'], 'შპს "ქართული პროდუქტი", თბილისი');
});

test('5. თარიღების კალკულატორი', () => {
  const leapDiff = GeoCore.calculateDateDifference('2024-02-28', '2024-03-01', { includeEndDate: false });
  assert.equal(leapDiff.totalDays, 2);
});

test('6. ქართული ტექსტის კონვერტერი (პარლამენტის სტანდარტი და ასომთავრული)', () => {
  const all33Unicode = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
  const all33Parliament = 'abgdevzTiklmnopJrstufqRySCcZwWxjh';
  assert.equal(GeoCore.convertGeorgianText(all33Unicode, 'unicode', 'parliament').output, all33Parliament);
  assert.equal(GeoCore.convertGeorgianText('საქართველო', 'unicode', 'asomtavruli').output, 'ႱႠႵႠႰႧႥႤႪႭ');
});

test('7. თანხის და რიცხვის სიტყვიერად ჩაწერა', () => {
  assert.equal(GeoCore.numberToGeorgianWords(1250), 'ათას ორას ორმოცდაათი');
  const amt = GeoCore.amountToGeorgianWords('14250.85', { currency: 'GEL', subUnitAsWords: false });
  assert.equal(amt.wordsText, 'თოთხმეტი ათას ორას ორმოცდაათი ლარი და 85 თეთრი');
});

test('8. ხელფასის კალკულატორი (Net და Gross)', () => {
  const fromGross = GeoCore.calculateSalary(1000, { direction: 'gross_to_net', incomeTaxRate: 20, includePension: true });
  assert.equal(fromGross.net, 784);
  const fromNet = GeoCore.calculateSalary(784, { direction: 'net_to_gross', incomeTaxRate: 20, includePension: true });
  assert.equal(fromNet.gross, 1000);
});

test('9. ქართული IBAN შემმოწმებელი', () => {
  const validTbc = GeoCore.validateIBAN('GE29TB7777777777777777');
  assert.equal(validTbc.isValid, true);
  assert.equal(validTbc.bankCode, 'TB');
});

test('10. QR კოდის გენერატორი', () => {
  const qr = GeoCore.generateQrMatrix('https://geotools.pages.dev');
  assert.equal(qr.size, qr.version * 4 + 17);
});