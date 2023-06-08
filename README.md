<div align="center">
<h1>eslint-config-ts-prefixer 🌈</h1>

<p>ESLint rule set that integrated <a href="https://prettier.io/">prettier</a> as one of ESLint rule and specialized <a href="https://eslint.org/docs/latest/user-guide/command-line-interface#--fix">fixable</a> rule set :-)</p>
</div>

---

### This config is:
- 📦 Zero extend [**explicit**](https://github.com/laststance/eslint-config-ts-prefixer/blob/main/index.js) rules.
- 💅 [Prettier](https://prettier.io/) integration, specialized fixable `import` rules.
- ✅ Meamingful rules code behavior.

----

<div align="center">
<!--     <img src="./assets/demo.gif" alt="demo"/> -->
</div>

----

![carbon](https://github.com/laststance/eslint-config-ts-prefixer/assets/5501268/ecd9b954-adf3-48ab-a406-5506070aafd1)


----

## Installation via node_module(general way)
If you want to manage `.eslintrc.js` file on your codebase, please choose [Barebone Install](#bareborn-install).

### 1. install necessary packages.

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
###  Create config files

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

## Bareborn Install
Bareborn Install is creates the eslint-config-ts-prefixer's `.eslintconfig.js` file directly in your code base.  
You can manage the rules yourself.

### 1. install necessary packages.

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```
or using yarn

```bash
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

or using pnpm

```bash
pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-prettier eslint-plugin-sort-keys-fix prettier
```

### 2. run `npx eslint-config-ts-prefixer barebone`

run  

```bash
npx eslint-config-ts-prefixer barebone
```

And then generated `.eslintrc.js`, `.eslintignore`, `.prettierrc`.

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


## LICENSE

MIT

