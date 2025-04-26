
function validVariableUsage() {
  const a = 1;
  const b = 2;
  
  return a + b;
}

function validIgnoredVariables() {
  const _unused = 'ignored by rule';
  const used = 'this is used';
  
  return used.toUpperCase();
}

function validRestSiblings() {
  const { used, unused, ...rest } = { used: 1, unused: 2, extra: 3 };
  
  console.log(used, rest);
  return rest;
}

function invalidUnusedVariables() {
  const unused = 'never used'; // Error: unused variable
  const used = 'this is used';
  
  return used.toUpperCase();
}

function invalidUnusedParameters(used, unused) { // Error: unused parameter
  return used.toString();
}

function invalidNestedUnused() {
  const outer = 'outer';
  
  function inner() {
    const innerUnused = 'never used'; // Error: unused variable
    return outer;
  }
  
  return inner();
}
