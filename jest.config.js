// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     roots: ['<rootDir>/tests'],
//     setupFiles: ['<rootDir>/tests/setup.ts'],
//     collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**'],
//   };

module.exports = {
	roots: ['<rootDir>'],
	moduleFileExtensions: [
		'ts',
		'js',
		'json'
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: [
		'**/**/*.(spec|test).(ts|js)'
	],
	testEnvironment: 'node',
    testTimeout: 100000,
	globalSetup: "./test/jestSetup.ts",
	globalTeardown: "./test/jestTearDown.ts"
	//runner: "groups",
};