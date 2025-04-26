
async function validReturnPromise() {
  const promise = Promise.resolve('value');
  return promise; // Valid: no unnecessary await
}

async function validReturnExpression() {
  const value = 'hello';
  return value; // Valid: not a promise
}

async function validAwaitInTryCatch() {
  try {
    const promise = Promise.resolve('value');
    return await promise; // Valid: await in try block is allowed for proper error handling
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function invalidReturnAwait() {
  const promise = Promise.resolve('value');
  return await promise; // Error: unnecessary await
}

async function invalidReturnAwaitExpression() {
  return await Promise.resolve('value'); // Error: unnecessary await
}

const invalidArrowReturnAwait = async () => {
  const promise = Promise.resolve('value');
  return await promise; // Error: unnecessary await
};
