
function validExpressions() {
  let x = 0;
  x++; // Valid: has side effect
  console.log('hello'); // Valid: function call has side effect
  return x;
}

function invalidExpressions() {
  let x = 0;
  
  x; // Error: unused expression
  'hello'; // Error: unused string literal
  true; // Error: unused boolean literal
  
  return x + 1;
}

function invalidBinaryExpression() {
  let x = 0;
  let y = 1;
  
  x + y; // Error: unused binary expression
  
  return x * y;
}
