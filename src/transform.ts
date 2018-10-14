import './__global';
import wrap from './wrapper';

//#region helpers
const is = (type: string) => ({
  oneOf: (types: string[]) => types.some(_ => _ === type)
});
function panic(message: string, cb?: (msg: string) => void) {
  if (cb) cb(message);
  else throw new Error(message);
}
//#endregion

/** Transform WebAssembly binary into JS module
 * @param source - WebAssembly Buffer
 * @param exportType - what type of export you want to generate
 * @param {Function} [errorCallback] - callback error in case you want to use your own error reporting
 * @return string of the code
 * @example const code = wasm2js(Buffer.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0]), 'instance')
 */
export default function(
  source: Buffer,
  exportType: Export.Type,
  errorCallback?: (errorMessage: string) => void
): string | never {
  if (WebAssembly.validate(source) === false)
    panic('Invalid WebAssembly file', errorCallback);

  if (is(exportType).oneOf(['instance', 'module']) && source.byteLength > 4000)
    panic(
      `The buffer size is larger than 4KB. Consider using async-${exportType}`,
      errorCallback
    );

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
