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
 * @param options - what type of export you want to generate
 * @return string of the code
 * @example const code = wasm2js(Buffer.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0]), 'instance')
 */
export default function(
  source: Buffer,
  options: Module.Options
): string | never {
  if (WebAssembly.validate(source) === false)
    panic('Invalid WebAssembly file', options.errorHandler);

  if (
    is(options.export).oneOf(['instance', 'module']) &&
    source.byteLength > 4000
  )
    panic(
      `The buffer size is larger than 4KB. Consider using async-${
        options.export
      }`,
      options.errorHandler
    );

  switch (options.export) {
    case 'buffer':
      return wrap(source, options.module).asBuffer;
    case 'instance':
      return wrap(source, options.module).asWebAssembly.Instance;
    case 'module':
      return wrap(source, options.module).asWebAssembly.Module;
    case 'async':
      return wrap(source, options.module).promiseWebAssembly.Both;
    case 'async-instance':
      return wrap(source, options.module).promiseWebAssembly.Instance;
    case 'async-module':
      return wrap(source, options.module).promiseWebAssembly.Module;
    default:
      throw new Error(`exporting as "${options.export}" not available`);
  }
}
