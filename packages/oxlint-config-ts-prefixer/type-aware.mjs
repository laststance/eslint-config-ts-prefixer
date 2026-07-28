import defaultConfig from './index.mjs'

/** @satisfies {import('oxlint').OxlintConfig} */
const typeAwareConfig = {
  ...defaultConfig,
  rules: {
    ...defaultConfig.rules,

    // Warn when await receives a value that cannot behave like a promise.
    'typescript/await-thenable': 'warn',

    // Reject promises used where synchronous values are expected, while retaining pragmatic callback allowances.
    'typescript/no-misused-promises': [
      'error',
      {
        checksConditionals: false,
        checksVoidReturn: false,
      },
    ],

    // Reject type assertions that do not change the inferred type and only add noise.
    'typescript/no-unnecessary-type-assertion': 'error',

    // Warn when a promise-returning function omits async and obscures its asynchronous contract.
    'typescript/promise-function-async': 'warn',
  },
}

export default typeAwareConfig
