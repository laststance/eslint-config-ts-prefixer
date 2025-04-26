
function validParseInt() {
  const decimal = parseInt('10', 10);
  
  const hex = parseInt('FF', 16);
  
  const binary = parseInt('1010', 2);
  
  return { decimal, hex, binary };
}

function validNumberConversion() {
  const num1 = Number('42');
  
  const num2 = +'42';
  
  return { num1, num2 };
}

function invalidParseInt() {
  const decimal = parseInt('10'); // Error: Missing radix parameter
  
  const value = '42';
  const num = parseInt(value); // Error: Missing radix parameter
  
  return { decimal, num };
}

function invalidParseIntExpressions() {
  const result = parseInt('10') + 5; // Error: Missing radix parameter
  
  const isGreaterThan50 = parseInt('100') > 50; // Error: Missing radix parameter
  
  return { result, isGreaterThan50 };
}
