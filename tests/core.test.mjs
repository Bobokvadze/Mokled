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
  assert.equal(GeoCore.validateIBAN('GE29TB7777777777777777').isValid, true);
});