// Copied from https://github.com/DrSensor/binaryen-loader/blob/master/test/helpers/on.js
import { statSync } from 'fs';
import { resolve, dirname } from 'path';

function inLoopExpect(array, prop, isNot = false) {
  // #region sphagetti helpers 😋 (I need Typescript!!!)
  const an = (expected, stat) =>
    typeof expected === 'function' ? expected(stat) : expected;
  const call = (func, expected) => {
    if (expected) {
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
    stat.originSize = issuer
      ? statSync(resolve(dirname(issuer), name)).size
      : null;
  });

  return {
    get get() {
      return statModules;
    },

    get: prop => inLoopExpect(statModules, prop),
    get source() {
      return inLoopExpect(statModules, 'source');
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
    withExtension: extension =>
      chainer(statModules.filter(({ name }) => name.includes(extension))),
    withoutExtension: extension =>
      chainer(statModules.filter(({ name }) => !name.includes(extension)))
  };
}

export default function(stats) {
  return chainer(stats.toJson().modules);
}
