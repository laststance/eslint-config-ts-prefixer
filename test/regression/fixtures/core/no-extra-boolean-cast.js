
function validBooleanCasts() {
  const value = Math.random() > 0.5;
  
  const boolValue = Boolean(value);
  
  return Boolean('string');
}

function validDoubleNegation() {
  const value = Math.random() > 0.5;
  
  const boolValue = !!value;
  
  return !!('string');
}

function invalidIfBooleanCast() {
  const value = Math.random() > 0.5;
  
  if (Boolean(value)) { // Error: unnecessary boolean cast
    return true;
  }
  
  return false;
}

function invalidIfDoubleNegation() {
  const value = Math.random() > 0.5;
  
  if (!!value) { // Error: unnecessary boolean cast
    return true;
  }
  
  return false;
}

function invalidConditionalBooleanCast() {
  const value = Math.random() > 0.5;
  
  const result = Boolean(value) ? 'true' : 'false'; // Error: unnecessary boolean cast
  
  return result;
}
