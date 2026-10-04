import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';

const contract = await readFile(new URL('../contracts/counter.compact', import.meta.url), 'utf8');

function increment(count: number, privateSecret: number, expectedSecret: number): number {
  assert.equal(privateSecret, expectedSecret);
  return count + 1;
}

test('circuit accepts the expected private witness and increments state', () => {
  assert.equal(increment(0, 7, 7), 1);
});

test('state transitions increase the public counter', () => {
  let count = 0;
  count = increment(count, 7, 7);
  count = increment(count, 7, 7);
  assert.equal(count, 2);
});

test('the witness is declared privately and is not disclosed', () => {
  assert.match(contract, /witness secretValue\(\)/);
  assert.doesNotMatch(contract, /disclose\(privateSecret\)/);
  assert.match(contract, /count = disclose\(count \+ 1\)/);
});
