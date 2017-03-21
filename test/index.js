const test = require('tape');
const {Ice} = require('ice');

const {objectToBuffer, bufferToObject} = require('../index');
const {Test} = require('./Test');

test('dump', assert => {
  const obj = new Test.TestObj(
    42,
    'foo',
    ['bar', 'baz'],
    new Test.Base(24),
    new Test.SomeStruct(true)
  );

  const ic = Ice.initialize();

  const buffer = objectToBuffer(obj, ic);

  const readObject = bufferToObject(buffer, ic);

  obj.__address = 0;
  obj.nestedObject.__address = 0;
  readObject.__address = 0;
  readObject.nestedObject.__address = 0;

  assert.deepEquals(obj, readObject);
  assert.end();
});