
/* eslint require-atomic-updates: error */

let globalCount = 0;

async function validAtomicUpdates() {
  let count = 0;
  
  const result = await Promise.resolve(42);
  count = result; // Valid: Direct assignment
  
  const newValue = await Promise.resolve(10);
  const updatedCount = count + newValue; // Valid: Not modifying count directly
  
  return { count, updatedCount };
}

async function validPropertyUpdates() {
  const obj = { count: 0 };
  
  const result = await Promise.resolve(42);
  obj.count = result; // Valid with allowProperties: true
  
  const newValue = await Promise.resolve(10);
  const updatedObj = { ...obj, count: obj.count + newValue }; // Valid: Not modifying obj directly
  
  return { obj, updatedObj };
}

async function invalidNonAtomicUpdates() {
  globalCount += await Promise.resolve(42); // Error: Non-atomic update
  
  let localCount = 0;
  localCount = localCount + await Promise.resolve(10); // Error: Non-atomic update
  
  return { globalCount, localCount };
}

async function invalidOperatorUpdates() {
  let count = 0;
  count += await Promise.resolve(2); // Error: Non-atomic update
  
  return count;
}
