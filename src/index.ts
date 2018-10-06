import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import validate from '@webpack-contrib/schema-utils';

import schema from './options.json';

/**
 * @param source
 */
export default function loader(this: loader.LoaderContext, source: Buffer) {
  const options: Partial<Options> = getOptions(this) || {}; // ⬅️ empty object to make it "if-able"

  validate({
    name: 'binaryen-loader',
    schema, // ⬅ ️validate options using JSON-schema in options.json
    target: options
  });

  return 'exported default "WebAssembly Module/Instance"';
}

export const raw = true;
