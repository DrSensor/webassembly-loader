// tslint:disable:no-eval
import { resolve } from 'path';
import webpack = require('@webpack-contrib/test-utils');
import on from './helpers/on';
import { exportOptions } from './test-list';

describe('When used as a webpack-loader', () => {
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
    'export as %s should produce polyfill for Buffer.from()',
    async opts => {
      config.rules[0].use.options = { export: opts };
      const stats = await webpack('fixture.js', config);

      on(stats)
        .withIssuer('*.wasm')
        .id.toContain('buffer/index.js');
    }
  );

  test.each(exportOptions.all)(
    'export as %s should NOT produce errors',
    async opts => {
      config.rules[0].use.options = { export: opts };
      const stats = await webpack('fixture.js', config);

      on(stats).errors.not.toBeGreaterThan(0);
    }
  );
});
