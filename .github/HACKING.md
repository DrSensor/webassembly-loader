# Want to Hack❔

Thanks for your interest to improve this project. Let's make it great!! 😎

## Basic Overview

This project use rollup to bundle the final result while maintain the code format and it's comments block. Overall, the technology stack that this project uses are (you don't need to install this tools beforehand because it's already in dependecy list):

- static-type checker: [typescript][]
- code-style checker (linter): [tslint][] + [prettier][]
- bundler: [rollup][] + [babel][]
- git hooks: [husky][] + [commitlint][] + [lint-staged][] + [standard-version][]
- test framework: [jest][]

## Start Hacking

### Setup

First, install all dependencies by running

```console
npm install
```

and if you got message about security vulnurability, you can use this command to fix it

```console
npm audit fix
```

### Test

This project has only unit-tests. The unit-tests will use [jest][] which basically will run in `node.js` environment. Run this command to start the unit-tests (choose which one):

```sh
npm test                  # watch mode
npm run test:once         # run only once (just like `jest --notify`)
npm run test:coverage     # run once and output the coverage
```

### Build

To compile/bundle this project, you can choose between this 2 command

To build once

```console
npm run build
```

To run live build

```console
npm start
```

That command is suitable if you want to live experiment the cli (src/main.ts)

## Project Structure

In general, the folder structure of this project follow:

```console
.
├── src                   # scripts that will be build/bundled
│   ├────────────────────────
│   │ Bunch of helper scripts
│   ├────────────────────────
│   └── index.ts          # exported module
│
├── test
│   ├── fixtures
│   │   ├──────────────────────────────
│   │   │ Bunch of sample to be tested
│   │   ├──────────────────────────────
│   │   └── utils.js # helper script used in various fixtures
│   │
│   │
│   ├────────────────────────────────────────────────
│   │ Few test-cases with file-extension *.test.ts
│   ├────────────────────────────────────────────────
│   └── utils.ts # helper script used in various test-cases
│
├─────────────────────
│ Bunch of config files
└─────────────────────
```

---

[lint-staged]: https://github.com/okonet/lint-staged
[rollup-plugin]: https://github.com/rollup/rollup/wiki/Plugins#creating-plugins
[rollup]: https://rollupjs.org/guide/en
[typescript]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
[tslint]: https://palantir.github.io/tslint/
[prettier]: https://prettier.io/docs/en/install.html
[babel]: https://babeljs.io/docs/en
[husky]: https://github.com/typicode/husky
[commitlint]: https://github.com/marionebl/commitlint
[standard-version]: https://github.com/conventional-changelog/standard-version
[conventionalcommits]: https://conventionalcommits.org/
[jest]: https://jestjs.io/docs/en/getting-started.html
