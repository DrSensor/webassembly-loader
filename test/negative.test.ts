// tslint:disable:no-eval
import 'jest-extended';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import webpack = require('@webpack-contrib/test-utils');
import on from './helpers/on';
import { exportOptions } from './test-list';
import { wasm2js } from '../dist';

describe('All possible error when using invalid wasm file', () => {
  let config: any;
  beforeEach(() =>
    (config = {
      rules: [
        {
          test: /\.wasm$/,
          type: 'javascript/auto',
          use: {
            loader: resolve(process.cwd(), 'dist')
          }
        }
      ]
    }));

  describe('Use as a library', () => {
    const wasmBuffer = readFileSync(
      resolve(__dirname, 'fixtures/invalid/foo.wasm')
    );

    test.each(exportOptions.all)('export as %s should throw an error', opts =>
      expect(() => wasm2js(wasmBuffer, opts)).toThrowError()
    );

    describe('Use empty callback error', () => {
      test.each(['instance', 'module'])(
        'export as %s should throw an error when imported',
        async opts => {
          const code = wasm2js(wasmBuffer, opts, () => ({}));

          expect(() => eval(code)).toThrowError();
        }
      );

      test('export as async-instance should throw an error when called', async () => {
        const code = wasm2js(wasmBuffer, 'async-instance', () => ({}));
        const exportedModule = eval(code);

        expect(() => exportedModule()).toThrowError();
      });

      test('export as buffer should be not a valid WebAssembly', async () => {
        const code = wasm2js(wasmBuffer, 'buffer', () => ({}));
        const exportedModule = eval(code);

        expect(WebAssembly.validate(exportedModule)).toBeFalse();
      });

      test.each(['async', 'async-module'])(
        'export as %s should Promise.reject when called',
        async opts => {
          const code = wasm2js(wasmBuffer, opts, () => ({}));
          const exportedModule = eval(code);

          expect(exportedModule()).toReject();
        }
      );
    });
  });

  describe('Use as a webpack-loader', () => {
    test.each(exportOptions.all)(
      'export as %s should produce an error',
      async opts => {
        config.rules[0].use.options = { export: opts };
        const stats = await webpack('invalid/fixture.js', config);

        on(stats)
          .withExtension('.wasm')
          .errors.toBeGreaterThan(0);
      }
    );

    test.each(exportOptions.wasm.lessThan_4KB)(
      'export as %s should produce an error when wasm code over 4KB',
      async opts => {
        config.rules[0].use.options = { export: opts };
        const stats = await webpack('over4KB.wasm', config);

        on(stats)
          .withFile('over4KB.wasm')
          .errors.toBeGreaterThan(0);
      }
    );
  });
});
