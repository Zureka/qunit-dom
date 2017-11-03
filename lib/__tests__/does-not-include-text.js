/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).doesNotIncludeText()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').doesNotIncludeText('baz', 'bing');

    expect(assert.results).toEqual([{
      actual: 'foo',
      expected: 'baz',
      message: 'bing',
      result: true,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
      element = document.querySelector('h1');
    });

    test('succeeds for correct content', () => {
      assert.dom(element).doesNotIncludeText('baz');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'baz',
        message: 'Element h1.baz does not have text containing "baz"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).doesNotIncludeText('foo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'foo',
        message: 'Element h1.baz does not have text containing "foo"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).doesNotIncludeText('foo');

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
    });

    test('succeeds for correct content', () => {
      assert.dom('h1').doesNotIncludeText('bar');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'bar',
        message: 'Element h1 does not have text containing "bar"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').doesNotIncludeText('foo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'foo',
        message: 'Element h1 does not have text containing "foo"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('h2').doesNotIncludeText('foo');

      expect(assert.results).toEqual([{
        message: 'Element h2 exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).doesNotIncludeText('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).doesNotIncludeText('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).doesNotIncludeText('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).doesNotIncludeText('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).doesNotIncludeText('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});