import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import validate from 'schema-utils';
import { schema } from './options';
import wasm2js from './transform';

const defaultOptions = {
  export: 'async'
} as Export.Options;

module.exports = function(this: loader.LoaderContext, source: Buffer) {
  const options: Partial<Export.Options> = getOptions(this) || defaultOptions;

  validate(schema, options, 'webassembly-loader');

  // if (options.export === 'buffer') return source; /*🤔*/
  return wasm2js(source, {
    export: options.export!,
    module: 'cjs',
    errorHandler: errMsg => this.emitError(errMsg)
  });
};

module.exports.raw = true;
export default wasm2js;

export {
  WebAssemblyLoaderExportType,
  WebAssemblyLoaderOptions
} from './options';
