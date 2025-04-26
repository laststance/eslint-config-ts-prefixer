
function validBinaryExpressions() {
  const a = Math.random() > 0.5;
  const b = Math.random() > 0.5;
  
  if (a && b) {
    return 'Both true';
  }
  
  return a || b ? 'At least one true' : 'Both false';
}

function invalidBinaryExpressions() {
  const a = Math.random() > 0.5;
  
  if ('non-empty string' && a) { // Error: 'non-empty string' is always truthy
    return true;
  }
  
  if (0 && a) { // Error: 0 is always falsy
    return true;
  }
  
  return [] || a; // Error: [] is always truthy
}

function invalidComparisonExpressions() {
  if ({} == true) { // Error: Object compared with boolean is always false
    return true;
  }
  
  return [] == false; // Error: Array compared with boolean is always false
}
