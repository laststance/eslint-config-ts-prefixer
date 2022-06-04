<div align="center">
<h1>eslint-config-typescript-react-pro-beautiful</h1>

<p>ESLint rules for all of my React + TypesScript projects. Without <a href="https://stackoverflow.com/questions/58866796/understanding-the-react-hooks-exhaustive-deps-lint-rule">exhaustive-deps</a> rule :-)</p>
</div>

---

## Installation

This module is distributed via npm which is bundled with node and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev eslint-config-typescript-react-pro-beautiful eslint-plugin-prettier

```
or using yarn

```
yarn add -D eslint-config-typescript-react-pro-beautiful eslint-plugin-prettier
```

And install Typescript if you have not installed Typescript.  
Because This package has a `peerDependencies` for TypeScirpt.[^1]  

```
npm install --save-dev typescript
```

or using yarn

```
yarn add -D typescript
```

## Usage

Add the extends to your `.eslintrc.js` or `.eslintrc.json` or `.eslintrc`:

```json
{
  "extends": "typescript-react-pro-beautiful"
}
```

And need `.prettierrc` file because this package refers your `.prettierrc` and use directly.  
If you don't have `.prettierrc`, please `touch .prettierrc` and set prettier rules depends on your preferece like this.

```json
{
  "singleQuote": true,
  "semi": false
}
```

## LICENSE

MIT


[^1]: The same thing The same thing can be said for React. General install guide skiped because author assumed almost peaople who trying getting start the library are already installed React and developing React application.)
