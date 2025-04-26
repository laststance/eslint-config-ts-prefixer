
function validNegation() {
  const a = 1;
  const b = 2;
  const arr = [1, 2, 3];
  
  if (!(a > b)) {
    return 'a is not greater than b';
  }
  
  if (!(a === 1 && b === 2)) {
    return 'condition is not met';
  }
  
  if (!arr.includes(4)) {
    return 'array does not include 4';
  }
  
  return 'default';
}

function invalidInNegation() {
  const obj = { a: 1, b: 2 };
  
  if (!('a' in obj)) { // Valid: Negating the result of 'in'
    return 'a is not in obj';
  }
  
  if (!('c' in obj)) { // Valid: Negating the result of 'in'
    return 'c is not in obj';
  }
  
  if (!'a' in obj) { // Error: Unsafe negation, should be !('a' in obj)
    return 'negated a is not in obj';
  }
  
  return 'default';
}

function invalidInstanceofNegation() {
  class MyClass {}
  const instance = new MyClass();
  
  if (!instance instanceof MyClass) { // Error: Unsafe negation, should be !(instance instanceof MyClass)
    return 'not an instance';
  }
  
  return 'is an instance';
}
