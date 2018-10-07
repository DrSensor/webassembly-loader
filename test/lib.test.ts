// tslint:disable:no-eval
import { wasm2js } from '../src';
import 'jest-extended';

describe('When used as a Library', () => {
  /** @see https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format#The_simplest_module */
  const wasmBuffer = Buffer.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0]);

  test('export as Buffer class', () => {
    const code = wasm2js(wasmBuffer, 'buffer');
    const exportedModule = eval(code);

    expect(exportedModule).toBeInstanceOf(Buffer);
  });

  test('export as WebAssembly.Module', () => {
    const code = wasm2js(wasmBuffer, 'module');
    const exportedModule = eval(code);

    expect(exportedModule).toBeInstanceOf(WebAssembly.Module);
  });

  test('export as WebAssembly.Instance', () => {
    const code = wasm2js(wasmBuffer, 'instance');
    const exportedModule = eval(code);

    expect(exportedModule).toBeInstanceOf(WebAssembly.Instance);
  });

  test('export of WebAssembly.compile', () => {
    const code = wasm2js(wasmBuffer, 'async-module');
    const exportedModule = eval(code);

    expect(exportedModule).toBeFunction();
    expect(exportedModule()).resolves.toBeInstanceOf(WebAssembly.Module);
  });

  test('export of export of WebAssembly.instantiate(WebAssembly.Module)', () => {
    const code = wasm2js(wasmBuffer, 'async-instance');
    const exportedModule = eval(code);

    expect(exportedModule).toBeFunction();
    expect(exportedModule()).resolves.toBeInstanceOf(WebAssembly.Instance);
  });

  test('export of WebAssembly.instantiate(Buffer))', () => {
    const code = wasm2js(wasmBuffer, 'async');
    const exportedModule = eval(code);

    expect(exportedModule).toBeFunction();
    expect(exportedModule()).resolves.toEqual(
      expect.objectContaining({
        instance: expect.any(WebAssembly.Instance),
        module: expect.any(WebAssembly.Module)
      })
    );
  });
});
