
function invalidPromiseFunction(): Promise<string> {
  return Promise.resolve('value'); // Error: should be async
}

async function validAsyncFunction(): Promise<string> {
  return 'value';
}

const invalidArrowFunction = (): Promise<number> => {
  return Promise.resolve(42); // Error: should be async
};

const validAsyncArrow = async (): Promise<number> => {
  return 42;
};

class ApiClient {
  fetchData(): Promise<object> {
    return Promise.resolve({}); // Error: should be async
  }

  async fetchUser(): Promise<object> {
    return {};
  }
}
