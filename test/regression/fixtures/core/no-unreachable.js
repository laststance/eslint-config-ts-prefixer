
function validReachableCode() {
  const value = Math.random();
  
  if (value > 0.5) {
    return 'high value';
  }
  
  return 'low value'; // Valid: This is reachable
}

function validEarlyReturns(value) {
  if (value === null) {
    return null;
  }
  
  if (value === undefined) {
    return undefined;
  }
  
  return value.toString(); // Valid: This is reachable
}

function invalidAfterReturn() {
  return 'result';
  
  const value = 42; // Error: Unreachable code
  return value;     // Error: Unreachable code
}

function invalidAfterBreak(value) {
  switch (value) {
    case 1:
      console.log('one');
      break;
      console.log('unreachable'); // Error: Unreachable code
    case 2:
      return 'two';
      console.log('also unreachable'); // Error: Unreachable code
    default:
      return 'default';
  }
}

function invalidAfterThrow() {
  throw new Error('Something went wrong');
  
  console.log('cleanup'); // Error: Unreachable code
  return 'result';       // Error: Unreachable code
}
