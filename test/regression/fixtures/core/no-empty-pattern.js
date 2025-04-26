
function validDestructuring() {
  const { name, age } = { name: 'John', age: 30 };
  const [first, second] = [1, 2];
  
  function processUser({ id, email }) {
    return `${id}: ${email}`;
  }
  
  const processItems = ([item, ...rest]) => {
    return { item, rest };
  };
  
  return { name, age, first, second };
}

function validRestDestructuring() {
  const { name, ...rest } = { name: 'John', age: 30, role: 'admin' };
  const [first, ...remaining] = [1, 2, 3, 4];
  
  return { name, rest, first, remaining };
}

function invalidEmptyObjectPattern() {
  const {} = { name: 'John', age: 30 }; // Error: Empty destructuring pattern
  
  return 'result';
}

function invalidEmptyArrayPattern() {
  const [] = [1, 2, 3]; // Error: Empty destructuring pattern
  
  return 'result';
}

function invalidNestedEmptyPattern() {
  const { user: {} } = { user: { name: 'John', age: 30 } }; // Error: Empty destructuring pattern
  
  function processData({ items: [] }) { // Error: Empty destructuring pattern
    return 'processed';
  }
  
  return 'result';
}
