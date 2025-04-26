
function validConstUsage() {
  const name = 'John';
  const age = 30;
  
  return { name, age };
}

function validLetUsage() {
  let count = 0;
  count += 1;
  
  let total = 10;
  total *= 2;
  
  return { count, total };
}

function validLoopLetUsage() {
  const results = [];
  
  for (let i = 0; i < 5; i++) {
    results.push(i);
  }
  
  return results;
}

function invalidLetUsage() {
  let name = 'John'; // Error: should be const
  let age = 30;      // Error: should be const
  
  return { name, age };
}

function invalidDestructuringLetUsage() {
  let { id, email } = { id: 1, email: 'test@example.com' }; // Error: should be const
  
  let [first, second] = [1, 2]; // Error: should be const
  
  return { id, email, first, second };
}

function mixedLetUsage() {
  let count = 0;
  count += 1; // Valid: reassigned
  
  let name = 'John'; // Error: should be const
  
  return { count, name };
}
