import './__global';
import wrap from './wrapper';

/** Transform WebAssembly binary into JS module
 * @param source - WebAssembly Buffer
 * @return string of the code
 * @example const code = wasm2js(Buffer.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0]), 'instance')
 */
export default function(
  source: Buffer,
  exportType: Export.Type
): string | never {
  switch (exportType) {
    case 'buffer':
      return wrap(source).asBuffer;
    case 'instance':
      return wrap(source).asWebAssembly.Instance;
    case 'module':
      return wrap(source).asWebAssembly.Module;
    case 'async':
      return wrap(source).promiseWebAssembly.Both;
    case 'async-instance':
      return wrap(source).promiseWebAssembly.Instance;
    case 'async-module':
      return wrap(source).promiseWebAssembly.Module;
    default:
      throw new Error(`exporting as "${exportType}" not available`);
  }
}
