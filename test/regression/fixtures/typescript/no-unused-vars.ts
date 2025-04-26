
function unusedVariable() {
  const unused = 'This variable is never used'; // Error: unused variable
  return 'result';
}

function ignoredVariable() {
  const _ignored = 'This variable is ignored by the rule'; // Valid: starts with _
  return 'result';
}

function restSiblings() {
  const { used, unused, ...rest } = { used: 1, unused: 2, extra: 3 }; // Valid: unused is ignored in rest siblings
  console.log(used, rest);
  return 'result';
}

function unusedParameter(used: string, unused: string) { // Error: unused parameter
  return used.toUpperCase();
}

function ignoredParameter(used: string, _unused: string) { // Valid: starts with _
  return used.toUpperCase();
}

function usedAfterUsed(first: string, second: string, third: string) {
  console.log(first, third); // Valid: second is after first and before third
  return 'result';
}
