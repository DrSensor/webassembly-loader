// Copied from https://github.com/DrSensor/binaryen-loader/blob/master/test/helpers/on.js
import { statSync } from 'fs';
import { resolve, dirname, parse, basename } from 'path';
const globrex = require('globrex');

function inLoopExpect(array, prop, isNot = false) {
  // #region sphagetti helpers 😋 (I need Typescript!!!)
  // if (array.some(({failed}) => failed)) throw new Error(`Can't compile ${array.filter(({failed}) => failed).join('\n')}`)
  const an = (expected, stat) =>
    typeof expected === 'function' ? expected(stat) : expected;
  const call = (func, expected) => {
    if (expected !== undefined) {
      for (const element of array) {
        if (isNot) {
          if (prop) expect(element[prop]).not[func](an(expected, element));
          else expect(element).not[func](an(expected, element));
        } else if (prop) expect(element[prop])[func](an(expected, element));
        else expect(element)[func](an(expected, element));
      }
    } else {
      for (const element of array) {
        if (isNot) {
          if (prop) expect(element[prop]).not[func]();
          else expect(element).not[func]();
        } else if (prop) expect(element[prop])[func]();
        else expect(element)[func]();
      }
    }
  };
  // #endregion

  return {
    get not() {
      return inLoopExpect(array, prop, true);
    },
    toContain: expected => call('toContain', expected),
    toBeLessThan: expected => call('toBeLessThan', expected),
    toBeLessThanOrEqual: expected => call('toBeLessThanOrEqual', expected),
    toBeGreaterThan: expected => call('toBeGreaterThan', expected),
    toBeGreaterThanOrEqual: expected =>
      call('toBeGreaterThanOrEqual', expected),
    toMatchSnapshot: () => call('toMatchSnapshot'),
    toBeNull: () => call('toBeNull')
  };
}

/* eslint no-dupe-keys: "off", no-param-reassign: "off"*/
function chainer(statModules) {
  statModules.forEach(stat => {
    const { issuer, name } = stat;
    try {
      stat.originSize = issuer
        ? statSync(resolve(dirname(issuer), name)).size
        : null;
    } catch (e) {
      stat.originSize = issuer ? statSync(issuer).size : null;
    }
  });

  return {
    get get() {
      return statModules;
    },
    getProp: prop => inLoopExpect(statModules, prop),

    get source() {
      return inLoopExpect(statModules, 'source');
    },
    get id() {
      return inLoopExpect(statModules, 'id');
    },
    get errors() {
      return inLoopExpect(statModules, 'errors');
    },
    get providedExports() {
      return inLoopExpect(statModules, 'providedExports');
    },
    get size() {
      return inLoopExpect(statModules, 'size');
    },

    get originSize() {
      return inLoopExpect(
        statModules.map(
          ({ issuer, name }) => statSync(resolve(dirname(issuer), name)).size
        )
      );
    },

    with: filter => chainer(statModules.filter(filter)),
    withIssuer: filter =>
      chainer(
        statModules.filter(({ issuerName }) =>
          globrex(filter).regex.test(basename(issuerName || ''))
        )
      ),
    withoutIssuer: filter =>
      chainer(
        statModules.filter(
          ({ issuerName }) =>
            !globrex(filter).regex.test(basename(issuerName || ''))
        )
      ),
    withFile: filter =>
      chainer(
        statModules.filter(({ name }) =>
          globrex(filter).regex.test(basename(name || ''))
        )
      ),
    withExtension: extension =>
      chainer(statModules.filter(({ name }) => parse(name).ext === extension)),
    withoutExtension: extension =>
      chainer(statModules.filter(({ name }) => parse(name).ext !== extension))
  };
}

export default function(stats) {
  return chainer(stats.toJson().modules);
}
