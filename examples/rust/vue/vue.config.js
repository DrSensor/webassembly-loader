module.exports = {
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.rs$/,
					use: [
						{
							loader: "webassembly-loader",
							options: {
								export: "instance"
							}
						},
						{
							loader: "rust-native-wasm-loader",
							options: {
								release: true
							}
						}
					]
				}
			]
		}
	}
}
