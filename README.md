<div align="center">
  <a href="https://github.com/WebAssembly">
    <img height="190" alt="binaryen logo" src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Web_Assembly_Logo.svg">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img height="200" alt="webpack logo" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![npm][npm-download]][npm-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
<!-- [![node][node]][node-url] -->
<!-- [![cover][cover]][cover-url] -->

# webassembly-loader

> this loader can also be used as a library <sup>↙ see [who use this?](#who-use-this)</sup>

<sup><sup>tl;dr -- see [examples](#examples)</sup></sup>

## Motivation

![future plans](https://user-images.githubusercontent.com/4953069/46924068-cbca7300-d04a-11e8-96e0-91aaa9161687.png)

## Minimum Requirements
- Node v8
- Webpack v4

## Installation

```console
npm install webassembly-loader --save-dev
```
or
```console
yarn add webassembly-loader --dev
```

## Options

### `export`
How wasm code would be exported. (see [examples](#examples))
- Type: `string`
- Default: `async`
- Expected value:
  - `buffer` will export wasm code as [Buffer][]
  - `module` will export wasm code as [WebAssembly.Module][]
  - `instance` will export wasm code as [WebAssembly.Instance][]
  - `async` will [instantiate][webassembly.instantiate] wasm code asynchronously, return promise of both [WebAssembly.Module][] and [WebAssembly.Instance][]
  - `async-module` will [compile][webassembly.compile] wasm code asynchronously, return promise of [WebAssembly.Module][]
  - `async-instance` will [instantiate][webassembly.instantiate] wasm code asynchronously, return promise of [WebAssembly.Instance][]

<details><summary><i>webpack.config.js</i></summary>

```js
module.exports = {
    rules: [{
          test: /\.wasm$/,
          type: "javascript/auto",
          use: [{
              loader: "webassembly-loader",
              options: {
                  export: "async"
              }
          }]
    }]
}
```
</details>

> tips: you can use [query parameter][inline] to change export mode on demand

[inline]: https://webpack.js.org/concepts/loaders/#inline
[buffer]: https://nodejs.org/api/buffer.html
[webassembly.module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module
[webassembly.instance]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance
[webassembly.instantiate]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate
[webassembly.compile]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/compile

## Examples

See the test cases and example projects in [*.test.ts](./test) and [examples](./examples/) for more insight.

---

#### `{export: 'buffer'}`

```js
import wasmCode from "./lib.wasm";

WebAssembly.compile(wasmCode).then(module => {
  const instance = new WebAssembly.Instance(module);
  console(instance.exports.add(1, 2)); // 3
});
```

---

#### `{export: 'module'}`

```js
import wasmModule from "./lib.wasm";

const instance = new WebAssembly.Instance(wasmModule);
console(instance.exports.add(1, 2)); // 3
```

---

#### `{export: 'instance'}`

```js
import wasm from "./lib.wasm";

console(wasm.exports.add(1, 2)); // 3
```

---

#### `{export: 'async'}`

```js
import wasmInstantiate from "./lib.wasm";

wasmInstantiate(importObject | undefined).then(({ instance, module }) => {
  console(instance.exports.add(1, 2)); // 3

  // create different instance, extra will be called in different environment
  const differentInstance = new WebAssembly.Instance(module);
  console(differentInstance.exports.add(1, 2)); // 6
});
```

---

#### `{export: 'async-instance'}`

```js
import wasmInstantiate from "./lib.wasm";

wasmInstantiate(importObject | undefined).then(instance => {
  console(instance.exports.add(1, 2)); // 3
});
```

---

#### `{export: 'async-module'}`

```js
import wasmInstantiate from "./lib.wasm";

wasmCompile(importObject | undefined).then(module => {
  const differentInstance = new WebAssembly.Instance(module);
  console(differentInstance.exports.add(1, 2)); // 3
});
```

---

## Who use this?

- [rs-jest](https://github.com/DrSensor/rs-jest)
- [rollup-plugin-rust](https://github.com/DrSensor/rollup-plugin-rust)
- [add yours 😉]

## Contributing

- [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for how you can make contribution
- [HACKING.md](./.github/HACKING.md) for technical details

## Credits

- [rust-native-wasm-loader](https://github.com/dflemstr/rust-native-wasm-loader)
- [webpack-defaults](https://github.com/webpack-contrib/webpack-defaults)

---

## License
[MIT](./LICENSE.md)

[npm]: https://img.shields.io/npm/v/webassembly-loader.svg
[npm-url]: https://npmjs.com/package/webassembly-loader
[npm-download]: https://img.shields.io/npm/dm/webassembly-loader.svg
[node]: https://img.shields.io/node/v/webassembly-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/DrSensor/webassembly-loader.svg
[deps-url]: https://david-dm.org/DrSensor/webassembly-loader
[tests]: https://img.shields.io/circleci/project/github/DrSensor/webassembly-loader.svg
[tests-url]: https://circleci.com/gh/DrSensor/webassembly-loader
[cover]: https://codecov.io/gh/DrSensor/webassembly-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/DrSensor/webassembly-loader
[size]: https://packagephobia.now.sh/badge?p=webassembly-loader
[size-url]: https://packagephobia.now.sh/result?p=webassembly-loader
