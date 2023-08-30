<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [eslint-config-ts-prefixer 🌈](#eslint-config-ts-prefixer-)
  - [This config is:](#this-config-is)
- [Installation](#installation)
  - [1. install necessary packages.](#1-install-necessary-packages)
  - [2. Setup config files with `npx eslint-config-ts-prefixer config` or Setup config files manualy.](#2-setup-config-files-with-npx-eslint-config-ts-prefixer-config-or-setup-config-files-manualy)
    - [`npx eslint-config-ts-prefixer config`](#npx-eslint-config-ts-prefixer-config)
    - [Manual Setup](#manual-setup)
  - [OK, you are ready to use!](#ok-you-are-ready-to-use)
- [Bareborn Install](#bareborn-install)
  - [1. install necessary packages.](#1-install-necessary-packages-1)
  - [2. run `npx eslint-config-ts-prefixer barebone`](#2-run-npx-eslint-config-ts-prefixer-barebone)
  - [LICENSE](#license)
  - [Contributors ✨](#contributors-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<div align="center">
<h1>eslint-config-ts-prefixer 🌈</h1>

<p>ESLint rule set that integrated <a href="https://prettier.io/">prettier</a> as one of ESLint rule and specialized <a href="https://eslint.org/docs/latest/user-guide/command-line-interface#--fix">fixable</a> rule set :-)</p>
</div>

---

### This config is:

- 📦 Zero extend for [**explicit**](https://github.com/laststance/eslint-config-ts-prefixer/blob/main/index.js) rules.
- 💅 [Prettier](https://prettier.io/) integration, specialized fixable `import` rules.
- ✅ Meamingful rules code behavior.

---

![carbon](https://github.com/laststance/eslint-config-ts-prefixer/assets/5501268/ecd9b954-adf3-48ab-a406-5506070aafd1)

---

# Installation

If you want to manage `.eslintrc.js` file on your codebase, please choose [Barebone Install](#bareborn-install).

## 1. install necessary packages.

- **npm**

```bash
npm install --save-dev eslint-config-ts-prefixer eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

- **yarn**

```bash
yarn add -D eslint-config-ts-prefixer eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

- **pnpm**

```bash
pnpm add -D eslint-config-ts-prefixer eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

---

## 2. Setup config files with `npx eslint-config-ts-prefixer config` or Setup config files manualy.

### `npx eslint-config-ts-prefixer config`

Run this command on a project root directory then create config files `.eslintrc.js` `.prettierrc` `.eslintignore`

```bash
npx eslint-config-ts-prefixer config
```

### Manual Setup

If you have already use to ESLint/Prettier,
Or you can use existing your `.eslintrc.js`, adding "ts-prefixer" in "extends" field manually.

- `.eslintrc.js`

```js
{
  extends: ["ts-prefixer"]
}
```

And you need `.prettierrc` file because `ts-prefixer` get Prettier config from `.prettierrc`.  
If you configure Prettier other way, `touch .prettierrc` and move your config within JSON format.

- `.prettierrc`

```json
{
  "singleQuote": true,
  "semi": false
}
```

## OK, you are ready to use!

I generally run from npm script like this.  
If you'll copy & paste this, ckeck target directly and target file extension are fitting your project.

```json
{
  "scripts": {
    "lint:fix": "eslint src --ext .ts,.tsx,.js,jsx --fix"
  }
}
```

Then you can run via `npm run lint:fix` ESLint & Prettier.  
And if you use VSCode and [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint),  
you can get great developer experience with the shortcut.  
And [Webstorm native support ESLint](https://www.jetbrains.com/help/webstorm/eslint.html#ws_eslint_configure_run_eslint_on_save).

<div align="left">
  <img src="./assets/extension.png" alt="config"/>
</div>

<br>
<br>

<div align="leftr">
  <p>Perform on Webstorm</p>
    <img src="./assets/autofix.gif" alt="autofix" />
</div>

---

# Bareborn Install

Bareborn Install is creates the eslint-config-ts-prefixer's `.eslintrc.js` file directly in your code base.  
You can manage the rules yourself.

### 1. install necessary packages.

- **npm**

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

- **yarn**

```bash
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

- **pnpm**

```bash
pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

### 2. run `npx eslint-config-ts-prefixer barebone`

- **run**

```bash
npx eslint-config-ts-prefixer barebone
```

And then generated `.eslintrc.js`, `.eslintignore`, `.prettierrc`.

Now it's ready for use.  
**Add script your package.json** like this

```json
{
  "scripts": {
    "lint:fix": "eslint . --ext .ts,.tsx,.js,jsx --fix"
  }
}
```

Finally run that `npm run lint:fix`

## LICENSE

[MIT](https://opensource.org/license/mit/)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://ryota-murakami.github.io/"><img src="https://avatars1.githubusercontent.com/u/5501268?s=400&u=7bf6b1580b95930980af2588ef0057f3e9ec1ff8&v=4?s=100" width="100px;" alt=""/><br /><sub><b>ryota-murakami</b></sub></a><br /><a href="https://github.com/laststance/create-react-app-vite/commits?author=ryota-murakami" title="Code">💻</a> <a href="https://github.com/laststance/create-react-app-vite/commits?author=ryota-murakami" title="Documentation">📖</a> <a href="https://github.com/laststance/create-react-app-vite/commits?author=ryota-murakami" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
