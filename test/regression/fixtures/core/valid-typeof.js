
function validTypeofComparisons() {
  const str = 'hello';
  const num = 42;
  const bool = true;
  const obj = {};
  const arr = [];
  const func = () => {};
  const nullValue = null;
  const undefinedValue = undefined;
  
  if (typeof str === 'string') {
    console.log('str is a string');
  }
  
  if (typeof num === 'number') {
    console.log('num is a number');
  }
  
  if (typeof bool === 'boolean') {
    console.log('bool is a boolean');
  }
  
  if (typeof obj === 'object') {
    console.log('obj is an object');
  }
  
  if (typeof arr === 'object') {
    console.log('arr is an object');
  }
  
  if (typeof func === 'function') {
    console.log('func is a function');
  }
  
  if (typeof nullValue === 'object') {
    console.log('nullValue is an object');
  }
  
  if (typeof undefinedValue === 'undefined') {
    console.log('undefinedValue is undefined');
  }
  
  return 'All types checked';
}

function validTypeofWithVariables() {
  const expectedType = 'string';
  const value = 'hello';
  
  if (typeof value === expectedType) {
    return true;
  }
  
  return false;
}

function invalidTypeofComparisons() {
  const str = 'hello';
  const num = 42;
  
  if (typeof str === 'sring') { // Error: Misspelled 'string'
    console.log('str is a string');
  }
  
  if (typeof num === 'nubmer') { // Error: Misspelled 'number'
    console.log('num is a number');
  }
  
  if (typeof str === 'String') { // Error: Case sensitive, should be lowercase 'string'
    console.log('str is a String');
  }
  
  return 'Invalid types checked';
}

function invalidNonStringComparisons() {
  const value = 'hello';
  
  if (typeof value === 42) { // Error: Right side should be a string
    console.log('value is 42');
  }
  
  if (typeof value === true) { // Error: Right side should be a string
    console.log('value is true');
  }
  
  return 'Invalid comparisons checked';
}
