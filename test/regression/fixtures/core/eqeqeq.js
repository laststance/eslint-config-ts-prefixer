
function validEquality() {
  const x = 5;
  const y = '5';
  
  if (x === parseInt(y)) { // Valid: strict equality
    return true;
  }
  
  return x !== y; // Valid: strict inequality
}

function invalidEquality() {
  const x = 5;
  const y = '5';
  
  if (x == y) { // Error: loose equality
    return true;
  }
  
  return x != y; // Error: loose inequality
}

function invalidNullComparison() {
  const x = null;
  const y = undefined;
  
  if (x == null) { // Error: loose equality with null
    return true;
  }
  
  return y != null; // Error: loose inequality with null
}
