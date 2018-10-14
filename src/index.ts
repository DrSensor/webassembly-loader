import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import validate from '@webpack-contrib/schema-utils';

import schema from './options.json';
import wasm2js from './transform';

const defaultOptions = {
  export: 'async'
} as Export.Options;

module.exports = function(this: loader.LoaderContext, source: Buffer) {
  const options: Partial<Export.Options> = getOptions(this) || defaultOptions;

  validate({
    name: 'binaryen-loader',
    schema,
    target: options
  });

  // if (options.export === 'buffer') return source; /*🤔*/
  return wasm2js(source, options.export!, errMsg => this.emitError(errMsg));
};

module.exports.raw = true;
module.exports.wasm2js = wasm2js;
