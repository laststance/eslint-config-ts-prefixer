
function validTernary() {
  const isActive = true;
  
  const status = isActive ? 'active' : 'inactive';
  
  const message = isActive ? `Status is ${status}` : 'No status available';
  
  return { status, message };
}

function invalidTernary() {
  const isActive = true;
  
  const boolValue = isActive ? true : false;
  
  const negatedBool = isActive ? false : true;
  
  return { boolValue, negatedBool };
}

function nestedInvalidTernary() {
  const a = 1;
  const b = 2;
  
  const result = a > b ? (a === b ? true : false) : false;
  
  return result;
}
