import { ModuleType } from './transform';

function bufferAsString(buffer: Buffer, useJSONParse: boolean) {
  const bufferArray = `[${buffer.toJSON().data.join(',')}]`;
  if (!useJSONParse) return bufferArray;

  // this array will only contain numbers, so no need to worry about escaping quotes
  return `JSON.parse('${bufferArray}')`;
}

/** Wrap binary data as commonjs module so it can be imported by doing require(module)
 * @param buffer raw binary data to be wrapped as es6 module
 * @return chainable object which represent `wrap this data as...`
 * @example return wrap(arrayBuffer).asWebAssembly.Module
 */
export default function(
  buffer: Buffer,
  module?: ModuleType,
  useJSONParse: boolean = false
) {
  let exportString = 'module.exports ='; // if (module === 'cjs')

  if (module === 'esm') exportString = 'export default';

  const bufferString = `Buffer.from(${bufferAsString(buffer, useJSONParse)})`;

  return {
    asBuffer: () => `${exportString} ${bufferString}`,
    asWebAssembly: {
      Module: () => `${exportString} new WebAssembly.Module(
        ${bufferString}
        )`,
      Instance: () => `${exportString} new WebAssembly.Instance(
          new WebAssembly.Module(
            ${bufferString}
          )
        )`
    },
    promiseWebAssembly: {
      Module: () => `${exportString} () => WebAssembly.compile(
        ${bufferString}
        )`,
      Instance: () => `${exportString} importObject => WebAssembly.instantiate(
          new WebAssembly.Module(${bufferString}),
          importObject
        )`,
      Both: () => `${exportString} importObject => WebAssembly.instantiate(
            ${bufferString}, importObject
        )`
    }
  };
}
