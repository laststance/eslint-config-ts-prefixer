<div align="center">
<h1>eslint-config-ts-prefixer 🌈</h1>

<p>ESLint rule set that integrated <a href="https://prettier.io/">prettier</a> as one of ESLint rule and specialized <a href="https://eslint.org/docs/latest/user-guide/command-line-interface#--fix">fixable</a> rule set :-)</p>
</div>

---

### This config is:
- ✅ Specialized fixable formatting rules.
- ✅ No meaningless rules.
- ✅ All containing rules are [**explicit**](https://github.com/laststance/eslint-config-ts-prefixer/blob/main/index.js).

----

<div align="center">
    <img src="./assets/demo.gif" alt="demo"/>
</div>

----

## Installation

```bash
npm install --save-dev eslint-config-ts-prefixer eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```
or using yarn

```bash
yarn add -D eslint-config-ts-prefixer eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

or using pnpm

```bash
pnpm add -D eslint-config-ts-prefixer eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

---------------------------------------------------------------------------------
## Create config files

And then create config files `.eslintrc.js`  `.prettierrc` `.eslintignore` with following command.

```bash
npx eslint-config-ts-prefixer config
```

Now it's ready for use.  
Add script your package.json like this

```json
{
  "scripts": {
    "lint:fix": "eslint . --ext .ts,.tsx,.js,jsx --fix"
  }
}
```

Finally run that `npm run lint:fix`


--------------------------------------------------------------------------------
Or create, adding "ts-prefixer" in "extends" field manually.  

### 1. Add the extends to your `.eslintrc.js` or `.eslintrc.json` or `.eslintrc`.

- ```.eslintrc.json```
```json
{
  "extends": "ts-prefixer"
}
```

### 2. Need `.prettierrc` file because this package refers your `.prettierrc` and use directly.  
If you don't have `.prettierrc`, please `touch .prettierrc` and set prettier rules depends on your preferece like this.

- ```.prettierrc```
```json
{
  "singleQuote": true,
  "semi": false
}
```

## LICENSE

MIT

