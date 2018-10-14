<template>
  <div id="app">
    {{add(1,2)}}
  </div>
</template>

<script>
import wasmInstance from "./lib.rs";

export default {
  name: "app",
  methods: {
    //#region TODO: use 👇 to create svelte-preprocessor for rustwasm (hint: register that as a {helpers})
    ...Object.keys(wasmInstance.exports).reduce((r, e) => {
      if (typeof wasmInstance.exports[e] === "function")
        r[e] = wasmInstance.exports[e];
      return r;
    }, {})
    //#endregion

    // add: wasmInstance.exports.add /*👈🙅 because it's to mainstream 😆*/
  }
};
</script>
