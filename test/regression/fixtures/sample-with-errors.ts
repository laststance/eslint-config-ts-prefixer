import { b } from 'b-module'
import { a } from 'a-module'
import fs from 'fs'
import path from 'path'

const message = 'Hello, world'
const unusedVar = 42

const mixedQuotes = 'double' + 'single'

const trailingSpaces = 'This line has trailing spaces'

let shouldBeConst = 'This should be const'

function noReturnType() {
  return 42
}

const obj = {
  unquoted: false,
  quoted: true,
}

const array = [1, 2, 3]

function unnecessaryElse(condition: boolean) {
  if (condition) {
    return true
  } else {
    return false
  }
}
