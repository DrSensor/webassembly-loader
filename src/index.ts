import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import validate from 'schema-utils';
import { WebAssemblyLoaderOptions, schema } from './options';
import wasm2js from './transform';

const defaultOptions: WebAssemblyLoaderOptions = {
  export: 'async'
};

module.exports = function(this: loader.LoaderContext, source: Buffer) {
  const options: WebAssemblyLoaderOptions = getOptions(this) || defaultOptions;

  validate(schema, options, 'webassembly-loader');

  // if (options.export === 'buffer') return source; /*🤔*/
  return wasm2js(source, {
    export: options.export!,
    useJSONParse: options.useJSONParse!,
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
