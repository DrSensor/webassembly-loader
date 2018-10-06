import { loader } from 'webpack';

/** Explanation in case someone use it as a library
 * @param source - explain
 */
export default function loader(this: loader.LoaderContext, source: Buffer) {
  return 'exported default "WebAssembly Module/Instance"';
}

export const raw = true;
