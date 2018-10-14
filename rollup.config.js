import pkg from "./package.json"
import prc from "./.prettierrc.json"

import commonjs from "rollup-plugin-commonjs"
import moduleResolve from "rollup-plugin-node-resolve"
import json from "rollup-plugin-json"
import autoExternal from "rollup-plugin-auto-external"
import babel from "rollup-plugin-babel"
import prettier from "rollup-plugin-prettier"
import typescript from "rollup-plugin-typescript2"

// #region helper
let {overrides, ...options} = prc
const prettierrc = {
	options: options,
	files: files => overrides.find(p => p.files === files).options
}
// #endregion

// Rollup Configuration
export default [
	{
		input: "src/index.ts",
		output: {
			file: pkg.main,
			format: "cjs"
		},
		plugins: [
			typescript({
				exclude: ["test/**"],
				useTsconfigDeclarationDir: true,
				tsconfigOverride: {
					compilerOptions: {
						module: "esnext",
						allowJs: false,
						declaration: true,
						declarationDir: "types"
					}
				}
			}),
			json(),
			commonjs(),
			moduleResolve(),
			babel(),
			autoExternal(),
			prettier(prettierrc.files("*.js"))
		]
	}
]
