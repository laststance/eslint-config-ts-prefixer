
function validFunction(a, b, c) {
  return a + b + c;
}

const validArrowFunction = (x, y, z) => {
  return x * y * z;
};

function invalidFunction(a, b, a) { // Error: Duplicate parameter name 'a'
  return a + b;
}

const invalidArrowFunction = (x, y, x) => { // Error: Duplicate parameter name 'x'
  return x * y;
};

function multipleInvalidFunction(a, b, a, c, b) { // Error: Duplicate parameter names 'a' and 'b'
  return a + b + c;
}
