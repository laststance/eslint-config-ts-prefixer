
function validPromiseRejections() {
  const promise1 = Promise.reject(new Error('Something went wrong'));
  
  class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = 'CustomError';
    }
  }
  const promise2 = Promise.reject(new CustomError('Custom error occurred'));
  
  const promise3 = new Promise((resolve, reject) => {
    reject(new Error('Executor rejection'));
  });
  
  return { promise1, promise2, promise3 };
}

function validEmptyRejection() {
  const promise = Promise.reject();
  
  const promiseExecutor = new Promise((resolve, reject) => {
    reject();
  });
  
  return { promise, promiseExecutor };
}

function invalidPromiseRejections() {
  const promise1 = Promise.reject('Something went wrong'); // Error: should reject with Error object
  
  const promise2 = Promise.reject(404); // Error: should reject with Error object
  
  const promise3 = Promise.reject({ message: 'Error occurred' }); // Error: should reject with Error object
  
  return { promise1, promise2, promise3 };
}

function invalidExecutorRejections() {
  const promise1 = new Promise((resolve, reject) => {
    reject('Executor error'); // Error: should reject with Error object
  });
  
  const promise2 = new Promise((resolve, reject) => {
    reject(false); // Error: should reject with Error object
  });
  
  return { promise1, promise2 };
}
