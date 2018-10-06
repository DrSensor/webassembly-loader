import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import validate from '@webpack-contrib/schema-utils';

import schema from './options.json';
import wasm2js from './transform';

const defaultOptions = {
  export: 'async'
} as Export.Options;

export default function(this: loader.LoaderContext, source: Buffer) {
  const options: Partial<Export.Options> = getOptions(this) || defaultOptions;

  validate({
    name: 'binaryen-loader',
    schema,
    target: options
  });

  return wasm2js(source, options.export!);
}

export { default as wasm2js } from './transform';
export const raw = true;
