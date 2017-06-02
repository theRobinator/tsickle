/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {expect} from 'chai';

import * as jsdoc from '../src/jsdoc';

describe('jsdoc.parse', () => {
  it('does not get non-jsdoc values', () => {
    const source = '/* ordinary comment */';
    expect(jsdoc.parse(source)).to.equal(null);
  });
  it('grabs plain text from jsdoc', () => {
    const source = '/** jsdoc comment */';
    expect(jsdoc.parse(source)).to.deep.equal({tags: [{tagName: '', text: 'jsdoc comment'}]});
  });
  it('gathers @tags from jsdoc', () => {
    const source = `/**
  * @param foo
  * @param bar multiple
  *    line comment
  * @return foobar
  * @nosideeffects
  */`;
    expect(jsdoc.parse(source)).to.deep.equal({
      tags: [
        {tagName: 'param', parameterName: 'foo'},
        {tagName: 'param', parameterName: 'bar', text: 'multiple\n   line comment'},
        {tagName: 'return', text: 'foobar'},
        {tagName: 'nosideeffects'},
      ]
    });
  });
  it('warns on type annotations in parameters', () => {
    const source = `/**
  * @param {string} foo
*/`;
    expect(jsdoc.parse(source)).to.deep.equal({
      tags: [],
      warnings: [
        'the type annotation on @param is redundant with its TypeScript type, remove the {...} part'
      ]
    });
  });
  it('warns on @type annotations', () => {
    const source = `/** @type {string} foo */`;
    expect(jsdoc.parse(source)).to.deep.equal({
      tags: [],
      warnings: ['@type annotations are redundant with TypeScript equivalents']
    });
  });
  it('allows @suppress annotations', () => {
    const source = `/** @suppress {checkTypes} I hate types */`;
    expect(jsdoc.parse(source)).to.deep.equal({
      tags: [{tagName: 'suppress', type: 'checkTypes', text: ' I hate types'}]
    });
    const malformed = `/** @suppress malformed */`;
    expect(jsdoc.parse(malformed)).to.deep.equal({
      tags: [{tagName: 'suppress', text: 'malformed'}],
      warnings: ['malformed @suppress tag: "malformed"'],
    });
  });
});

describe('jsdoc.toString', () => {
  it('filters duplicated @deprecated tags', () => {
    expect(jsdoc.toString([
      {tagName: 'deprecated'}, {tagName: 'param', parameterName: 'hello', text: 'world'},
      {tagName: 'deprecated'}
    ])).to.equal(`/**
 * @deprecated
 * @param hello world
 */
`);
  });
});
