
function validObjectKeys() {
  const user = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    role: 'admin',
  };
  
  return user;
}

function validComputedProperties() {
  const prefix = 'user';
  
  const data = {
    [`${prefix}_id`]: 1,
    [`${prefix}_name`]: 'John',
    [`${prefix}_email`]: 'john@example.com',
  };
  
  return data;
}

function invalidDuplicateKeys() {
  const user = {
    id: 1,
    name: 'John',
    id: 2, // Error: Duplicate key 'id'
    role: 'admin',
  };
  
  return user;
}

function invalidDuplicateStringKeys() {
  const data = {
    'id': 1,
    'name': 'John',
    id: 2, // Error: Duplicate key 'id' (string vs identifier)
    role: 'admin',
  };
  
  return data;
}

function invalidDuplicateComputedKeys() {
  const prefix = 'user';
  
  const data = {
    [`${prefix}_id`]: 1,
    [`${prefix}_name`]: 'John',
    'user_id': 2, // Error: Duplicate key (computed vs string)
  };
  
  return data;
}
