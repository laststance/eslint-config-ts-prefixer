
async function validAwait() {
  const promise = Promise.resolve('value');
  const result = await promise; // Valid - promise is thenable
  return result;
}

async function invalidAwait() {
  const nonThenable = 42;
  const result = await nonThenable; // Error - number is not thenable
  return result;
}

async function invalidStringAwait() {
  const str = 'hello';
  const result = await str; // Error - string is not thenable
  return result;
}
