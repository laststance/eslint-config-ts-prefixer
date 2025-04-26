
async function validPromiseUsage() {
  return Promise.resolve('value');
}

function invalidPromiseCondition() {
  const promise = Promise.resolve(true);
  if (promise) { // Error: Promise used as condition
    console.log('This is wrong');
  }
}

function invalidPromiseLogical() {
  const promise = Promise.resolve(true);
  const result = promise && true; // Error: Promise used in logical expression
  return result;
}

async function validAwaitedCondition() {
  const promise = Promise.resolve(true);
  if (await promise) { // Valid: Promise is awaited
    console.log('This is correct');
  }
}
