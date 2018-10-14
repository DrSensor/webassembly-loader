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

### With options

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