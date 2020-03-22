// tslint:disable:no-eval
import { resolve } from 'path';
import webpack = require('@webpack-contrib/test-utils');
import on from './helpers/on';
import { exportOptions } from './test-list';

describe('When useJSONParse: true', () => {
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

  test.each(exportOptions.all)(
    'export as %s should use JSON.parse to improve parsing speed',
    async opts => {
      config.rules[0].use.options = { export: opts, useJSONParse: true };
      const stats = await webpack('fixture.js', config);

      const source = stats.compilation.assets['main.js'].source();

      expect(source).toMatch("Buffer.from(JSON.parse('[");
    }
  );
});
