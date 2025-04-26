const message = 'Hello, world'

const unusedVar = 42

const mixedQuotes = 'double' + 'single'

const trailingSpaces = 'This line has trailing spaces'

import { z } from 'zod'
import { a } from 'a-module'

let shouldBeConst = 'This should be const'

function noReturnType() {
  return 42
}

const obj = {
  quoted: true,
  unquoted: false,
}

const array = [1, 2, 3]

function unnecessaryElse(condition: boolean) {
  if (condition) {
    return true
  } else {
    return false
  }
}
