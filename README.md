<div align="center">
<h1>eslint-config-react-typescript-pro-beautiful</h1>

<p>ESLint rules for all of my React + TypesScript projects. Feel free to use these conventions :-)</p>
</div>

---

## Installation

This module is distributed via npm which is bundled with node and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev eslint-config-typescript-react-pro-beautiful eslint-plugin-prettier
```

This library has a required `peerDependencies` for TypeScirpt

## Usage

Add the extends to your `.eslintrc.js` or `.eslintrc.json` or `.eslintrc`:

```json
{
  "extends": "react-typescript-pro-beautiful"
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
