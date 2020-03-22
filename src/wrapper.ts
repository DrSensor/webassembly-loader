import { ModuleType } from './transform';

function bufferAsString(buffer: Buffer) {
  return `[${buffer.toJSON().data.join(',')}]`;
}

/** Wrap binary data as commonjs module so it can be imported by doing require(module)
 * @param buffer raw binary data to be wrapped as es6 module
 * @return chainable object which represent `wrap this data as...`
 * @example return wrap(arrayBuffer).asWebAssembly.Module
 */
export default function(buffer: Buffer, module?: ModuleType) {
  let exportString = 'module.exports ='; // if (module === 'cjs')

  if (module === 'esm') exportString = 'export default';

  const bufferString = `Buffer.from(${bufferAsString(buffer)})`;

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
