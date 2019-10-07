import { ModuleType } from './transform';

/** Wrap binary data as commonjs module so it can be imported by doing require(module)
 * @param buffer raw binary data to be wrapped as es6 module
 * @return chainable object which represent `wrap this data as...`
 * @example return wrap(arrayBuffer).asWebAssembly.Module
 */
export default function(buffer: Buffer, module?: ModuleType) {
  const data = buffer.toJSON().data.toString();
  let exportString = 'module.exports ='; // if (module === 'cjs')

  if (module === 'esm') exportString = 'export default';

  return {
    asBuffer: `${exportString} Buffer.from([${data}])`,
    asWebAssembly: {
      Module: `${exportString} new WebAssembly.Module(
          Buffer.from([${data}])
        )`,
      Instance: `${exportString} new WebAssembly.Instance(
          new WebAssembly.Module(
            Buffer.from([${data}])
          )
        )`
    },
    promiseWebAssembly: {
      Module: `${exportString} () => WebAssembly.compile(
          Buffer.from([${data}])
        )`,
      Instance: `${exportString} importObject => WebAssembly.instantiate(
          new WebAssembly.Module(Buffer.from([${data}])),
          importObject
        )`,
      Both: `${exportString} importObject => WebAssembly.instantiate(
            Buffer.from([${data}]), importObject
        )`
    }
  };
}
