<div align="center">
<h1>eslint-config-ts-prefixer 🌈</h1>

![npm](https://img.shields.io/npm/dm/eslint-config-ts-prefixer)
[![Lint](https://github.com/laststance/eslint-config-ts-prefixer/actions/workflows/lint.yml/badge.svg)](https://github.com/laststance/eslint-config-ts-prefixer/actions/workflows/lint.yml)

<p>Ruleset of meaningful Lint rules on runtime and beautiful formatters. (<a href="https://prettier.io/">prettier</a> & <a href="https://www.npmjs.com/package/eslint-plugin-import">eslint-plugin-import</a>)
</div>

---

### This setup is:

- 📦 **Zero** extend for [**explicit**](https://github.com/laststance/eslint-config-ts-prefixer/blob/main/index.js) rules.
- 💅 [Prettier](https://prettier.io/) integration, specialized fixable `import` rules.
- 🏠 Use user's existing `.prettierrc` directly.
- ✅ Meamingful rules code behavior than which syntax sugar is good.

---

![carbon](https://github.com/laststance/eslint-config-ts-prefixer/assets/5501268/ecd9b954-adf3-48ab-a406-5506070aafd1)

---

# Installation

If you are using ESLint v8, please follow [eslint-config-ts-prefixer@1.14.2](https://github.com/laststance/eslint-config-ts-prefixer/tree/1.14.2?tab=readme-ov-file#installation) Installation guide.

## 1. install necessary packages.

- **pnpm**

```bash
pnpm add -D eslint-config-ts-prefixer@latest eslint@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest typescript@latest eslint-plugin-import@latest eslint-import-resolver-typescript@latest eslint-plugin-prettier@latest prettier@latest
```

- **npm**

```bash
npm install --save-dev eslint-config-ts-prefixer@latest eslint@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest typescript@latest eslint-plugin-import@latest eslint-import-resolver-typescript@latest eslint-plugin-prettier@latest prettier@latest
```

- **yarn**

```bash
yarn add -D eslint-config-ts-prefixer eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier prettier
```

# 2. Add `eslint-config-ts-prefixer` to `eslint.config.mjs` in your project.

Create an `eslint.config.mjs` file in your project root with the following configuration:

**For ESM projects (with `"type": "module"` in package.json or using .mjs extension):**

---

## OK, you are ready to use!

just run `npm run lint:fix` to apply this package's configurations! 🎉

```json
{
  "scripts": {
    "lint": "eslint . -c eslint.config.mjs",
    "lint:fix": "eslint . -c eslint.config.mjs --fix"
  }
}
```

If you use VSCode,Cursor and [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint),  
you can get great developer experience with the shortcut.  
And [Webstorm native support ESLint](https://www.jetbrains.com/help/webstorm/eslint.html#ws_eslint_configure_run_eslint_on_save).

<div align="left">
  <img src="./assets/extension.png" alt="config"/>
</div>

<br>
<br>

<div align="leftr">
  <p>Perform on Webstorm(as same as VSCode, Cursor)</p>
    <img src="./assets/autofix.gif" alt="autofix" />
</div>

## Explore Our Lint Rules Website

We are excited to announce the launch of our new website, which provides a comprehensive list of all lint rules from the original documentation. This resource is designed to help you easily navigate and understand the various lint rules available for your projects.

Visit the website: [ESLint Config TS Prefixer Lint Rules](https://example.com/lint-rules)

The website features a user-friendly interface, allowing you to explore different categories of lint rules, search for specific rules, and learn more about each rule's purpose and usage. Whether you are a beginner or an experienced developer, this website will serve as a valuable tool for ensuring code quality and consistency in your projects.

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
