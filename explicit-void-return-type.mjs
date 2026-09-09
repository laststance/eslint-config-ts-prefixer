import ts from 'typescript'

const VOID_RETURN = 'void'
const PROMISE_VOID_RETURN = 'Promise<void>'

const messages = {
  missingVoid:
    'This function is inferred as `void`. Write an explicit `: void` return type.',
  missingPromiseVoid:
    'This function is inferred as `Promise<void>`. Write an explicit `: Promise<void>` return type.',
}

/**
 * Plugin-local rule: require `: void` / `: Promise<void>` only when that is the inferred return — called from {@link tsPrefixerPlugin}.
 * @example explicitVoidReturnType.create(context)
 */
export const explicitVoidReturnType = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require explicit `void` or `Promise<void>` return types when that is the inferred return type.',
      url: 'https://github.com/laststance/eslint-config-ts-prefixer/blob/main/explicit-void-return-type.mjs',
    },
    fixable: 'code',
    messages,
    schema: [],
  },

  /**
   * Walk function nodes and report when TS infers void / Promise<void> with no annotation — used by ESLint.
   * @example create(context)
   */
  create(context) {
    if (!isTypeScriptFile(context.filename)) {
      return {}
    }

    const services = context.sourceCode.parserServices
    const checker = services?.program?.getTypeChecker()
    if (!checker || !services.esTreeNodeToTSNodeMap) {
      return {}
    }

    /**
     * Report + autofix one function when inference is void-like and no skip applies — visitor for Function* nodes.
     * @example checkFunction(node)
     */
    function checkFunction(node) {
      if (shouldSkipFunction(node)) {
        return
      }

      const tsNode = services.esTreeNodeToTSNodeMap.get(node)
      if (!tsNode) {
        return
      }

      const signature = checker.getSignatureFromDeclaration(tsNode)
      if (!signature) {
        return
      }

      const inferred = classifyVoidReturn(
        checker,
        checker.getReturnTypeOfSignature(signature),
      )
      if (!inferred) {
        return
      }

      context.report({
        node: node.id ?? node,
        messageId:
          inferred === PROMISE_VOID_RETURN
            ? 'missingPromiseVoid'
            : 'missingVoid',
        fix: buildReturnTypeFix(context.sourceCode, node, inferred),
      })
    }

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
    }
  },
}

/**
 * First-party plugin that ships {@link explicitVoidReturnType} with this config package.
 * @example plugins: { 'ts-prefixer': tsPrefixerPlugin }
 */
export const tsPrefixerPlugin = {
  meta: {
    name: 'ts-prefixer',
  },
  rules: {
    'explicit-void-return-type': explicitVoidReturnType,
  },
}

/**
 * True for `.ts` / `.tsx` / `.mts` / `.cts` so JS files never get type annotations they cannot write.
 * @example isTypeScriptFile('src/app.ts')
 */
function isTypeScriptFile(filename) {
  return /\.[cm]?tsx?$/.test(filename)
}

/**
 * Skip constructors, typed callbacks, IIFEs, and already-annotated functions — called by {@link explicitVoidReturnType}.
 * @example shouldSkipFunction(arrowNode)
 */
function shouldSkipFunction(node) {
  if (node.returnType || !node.body || node.declare || node.generator) {
    return true
  }

  if (isConstructorOrAccessor(node) || isIIFE(node)) {
    return true
  }

  // Callbacks / typed variables already publish the contract — don't demand a second `: void`.
  if (node.type !== 'FunctionDeclaration' && isTypedFunctionExpression(node)) {
    return true
  }

  return false
}

/**
 * Insert `: void` / `: Promise<void>` after the parameter list — used as `context.report` fix.
 * @example buildReturnTypeFix(sourceCode, node, 'void')
 */
function buildReturnTypeFix(sourceCode, node, typeText) {
  return (fixer) => {
    const closeParen = findParamListClose(sourceCode, node)
    if (closeParen) {
      return fixer.insertTextAfter(closeParen, `: ${typeText}`)
    }

    // `x => {}` has no parens; `: void` is only legal as `(x): void =>`.
    const [param] = node.params
    // Declaration/empty-param nodes must not fall through to paren wrapping.
    if (!param) {
      return null
    }

    return fixer.replaceText(
      param,
      `(${sourceCode.getText(param)}): ${typeText}`,
    )
  }
}

/**
 * Closing `)` of the parameter list, or null for a paren-less arrow — used by {@link buildReturnTypeFix}.
 * @example findParamListClose(sourceCode, node)
 */
function findParamListClose(sourceCode, node) {
  const searchFrom =
    node.type === 'ArrowFunctionExpression'
      ? sourceCode.getTokenBefore(node.body, (token) => token.value === '=>')
      : sourceCode.getFirstToken(node.body)
  if (!searchFrom) {
    return null
  }

  const candidate = sourceCode.getTokenBefore(
    searchFrom,
    (token) => token.value === ')',
  )
  // Paren-less `x =>` has no `)`; do not steal a `)` from earlier code.
  return belongsToFunction(candidate, node) ? candidate : null
}

/**
 * True when `token` sits inside {@link node}'s source range — used by {@link findParamListClose}.
 * @example belongsToFunction(closeParen, arrowNode)
 */
function belongsToFunction(token, node) {
  return Boolean(token && token.range[0] >= node.range[0])
}

/**
 * Map a TS return type to `void` / `Promise<void>` or null when value inference should stay free.
 * @example classifyVoidReturn(checker, returnType)
 */
function classifyVoidReturn(checker, type) {
  if (isExactlyVoid(type)) {
    return VOID_RETURN
  }

  const promised = checker.getPromisedTypeOfPromise(type)
  if (promised && isExactlyVoid(promised)) {
    return PROMISE_VOID_RETURN
  }

  return null
}

/**
 * True when every union member is `void` (not `undefined` / `never`) — used by {@link classifyVoidReturn}.
 * @example isExactlyVoid(returnType)
 */
function isExactlyVoid(type) {
  if ((type.flags & ts.TypeFlags.Union) !== 0) {
    return type.types.every(isAtomicVoid)
  }

  return isAtomicVoid(type)
}

/**
 * True when this type flag is exactly `void` — used by {@link isExactlyVoid}.
 * @example isAtomicVoid(type)
 */
function isAtomicVoid(type) {
  return (type.flags & ts.TypeFlags.Void) !== 0
}

/**
 * Skip constructors / getters / setters — they cannot take a `void` return annotation the same way.
 * @example isConstructorOrAccessor(functionExpression)
 */
function isConstructorOrAccessor(node) {
  const parent = node.parent
  if (
    parent?.type !== 'MethodDefinition' &&
    parent?.type !== 'Property' &&
    parent?.type !== 'TSAbstractMethodDefinition'
  ) {
    return false
  }

  return (
    parent.kind === 'constructor' ||
    parent.kind === 'get' ||
    parent.kind === 'set'
  )
}

/**
 * Skip IIFEs — a return type on `(function () {})()` is noise.
 * @example isIIFE(functionExpression)
 */
function isIIFE(node) {
  return node.parent?.type === 'CallExpression' && node.parent.callee === node
}

/**
 * Mirror typescript-eslint `allowTypedFunctionExpressions` — used by {@link shouldSkipFunction}.
 * @example isTypedFunctionExpression(arrowNode)
 */
function isTypedFunctionExpression(node) {
  return (
    isTypedParent(node.parent, node) || isPropertyOfTypedObject(node.parent)
  )
}

/**
 * True when the parent already types this function (variable annotation, callback, JSX, `as` / `satisfies`).
 * @example isTypedParent(node.parent, node)
 */
function isTypedParent(parent, callee) {
  if (!parent) {
    return false
  }

  if (
    parent.type === 'TSAsExpression' ||
    parent.type === 'TSTypeAssertion' ||
    parent.type === 'TSSatisfiesExpression'
  ) {
    return true
  }

  if (parent.type === 'VariableDeclarator' && parent.id.typeAnnotation) {
    return true
  }

  if (parent.type === 'PropertyDefinition' && parent.typeAnnotation) {
    return true
  }

  if (parent.type === 'AssignmentPattern' && parent.left.typeAnnotation) {
    return true
  }

  // `foo(() => {})` is contextually typed by the callee; IIFEs are handled separately.
  if (parent.type === 'CallExpression' && parent.callee !== callee) {
    return true
  }

  if (parent.type === 'NewExpression') {
    return true
  }

  if (
    parent.type === 'JSXExpressionContainer' ||
    parent.type === 'JSXSpreadAttribute'
  ) {
    return true
  }

  return false
}

/**
 * True when this property sits in a typed object literal (`const x: Foo = { log() {} }`).
 * @example isPropertyOfTypedObject(propertyNode)
 */
function isPropertyOfTypedObject(property) {
  if (property?.type !== 'Property') {
    return false
  }

  const objectExpr = property.parent
  if (objectExpr?.type !== 'ObjectExpression') {
    return false
  }

  const parent = objectExpr.parent
  return isTypedParent(parent) || isPropertyOfTypedObject(parent)
}
