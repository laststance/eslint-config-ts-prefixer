/** @satisfies {import('oxfmt').OxfmtConfig} */
const oxfmtConfig = {
  sortImports: {
    // Preserve the existing module-kind hierarchy while leaving type imports in their own trailing group.
    groups: [
      'value-builtin',
      'value-external',
      'value-internal',
      'value-parent',
      'value-sibling',
      'value-index',
      'type-import',
      'unknown',
    ],
    ignoreCase: true,
    newlinesBetween: true,
    order: 'asc',
    // Keep side-effect imports in source order because moving them can change runtime behavior.
    sortSideEffects: false,
  },
}

export default oxfmtConfig
