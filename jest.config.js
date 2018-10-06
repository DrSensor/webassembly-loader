module.exports = {
	testEnvironment: "node",
	globals: {
		"ts-jest": {
			babelConfig: true
		}
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	testPathIgnorePatterns: [
		"<rootDir>/test/fixtures",
		"<rootDir>/node_modules/",
		"<rootDir>/packages/"
	],
	coveragePathIgnorePatterns: [
		".*\\.d\\.ts",
		"<rootDir>/node_modules/",
		"<rootDir>/packages/"
	],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	preset: "ts-jest",
	testMatch: null
}
