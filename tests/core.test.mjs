import test from 'node:test';
import assert from 'node:assert/strict';
import GeoCore from '../js/core.js';

test('1. ყოფილი პარლამენტის 8-ბიტიანი სტანდარტი (àáâã...¸ <-> აბგდ...ჰ)', () => {
  const sampleUnicode = 'საქართველო, ჰაერი';
  const toParl = GeoCore.convertGeorgianText(sampleUnicode, 'unicode', 'parliament');
  assert.equal(toParl.output, 'ñàõàðçåäêí, ¸àäðè');

  const backToUni = GeoCore.convertGeorgianText('ñàõàðçåäêí, ¸àäðè', 'parliament', 'unicode');
  assert.equal(backToUni.output, sampleUnicode);
});

test('2. სესხის და იპოთეკის კალკულატორი - ანუიტეტური და წინსწრება', () => {
  const baseLoan = GeoCore.calculateLoan(12000, 12, 12, { scheduleType: 'annuity' });
  assert.equal(baseLoan.actualMonths, 12);
  assert.ok(baseLoan.firstPayment > 1060 && baseLoan.firstPayment < 1070);

  const prepaidLoan = GeoCore.calculateLoan(12000, 12, 12, {
    scheduleType: 'annuity',
    extraMonthly: 500,
    extraMode: 'reduce_term'
  });
  assert.ok(prepaidLoan.actualMonths < 12);
  assert.ok(prepaidLoan.savedInterest > 0);
});

test('3. თანხა სიტყვიერად, ხელფასი, დღგ და IBAN', () => {
  assert.equal(GeoCore.numberToGeorgianWords(1250), 'ათას ორას ორმოცდაათი');
  assert.equal(GeoCore.calculateSalary(1000, { direction: 'gross_to_net', incomeTaxRate: 20, includePension: true }).net, 784);
  assert.equal(GeoCore.calculateVAT(100, 'add', 18).gross, 118);
  assert.equal(GeoCore.validateIBAN('GE29TB7777777777777777').isValid, true);
});