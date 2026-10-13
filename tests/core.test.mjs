import test from 'node:test';
import assert from 'node:assert/strict';
import GeoCore from '../js/core.js';

test('1. SPParliamentMedium (1997 Soma Press) 33+5 ასოიანი სტანდარტი (À..à <-> ა..ჰ)', () => {
  const sampleUnicode = 'საქართველო, ჰაერი';
  const toParl = GeoCore.convertGeorgianText(sampleUnicode, 'unicode', 'parliament');
  assert.equal(toParl.output, 'ÑÀÕÀÐÇÅÄÊÍ, àÀÄÐÈ');

  const backToUni = GeoCore.convertGeorgianText('ÑÀÕÀÐÇÅÄÊÍ, àÀÄÐÈ', 'parliament', 'unicode');
  assert.equal(backToUni.output, sampleUnicode);

  const all33Unicode = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
  const all33SpParl = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßà';
  assert.equal(GeoCore.convertGeorgianText(all33Unicode, 'unicode', 'parliament').output, all33SpParl);
  assert.equal(GeoCore.convertGeorgianText(all33SpParl, 'parliament', 'unicode').output, all33Unicode);
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