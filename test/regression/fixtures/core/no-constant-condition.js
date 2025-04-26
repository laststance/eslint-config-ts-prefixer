
function validConditions() {
  const a = Math.random() > 0.5;
  
  if (a) {
    return 'a is true';
  }
  
  while (a) {
    return 'a is true';
  }
  
  for (let i = 0; a && i < 10; i++) {
    console.log(i);
  }
  
  return 'a is false';
}

function invalidIfConditions() {
  if (true) { // Error: Constant condition
    return 'always true';
  }
  
  if (false) { // Error: Constant condition
    return 'never reached';
  }
  
  if ('always truthy') { // Error: Constant condition
    return 'always truthy';
  }
  
  return 'default';
}

function invalidLoopConditions() {
  while (true) { // Error: Constant condition
    if (Math.random() > 0.9) break;
  }
  
  for (let i = 0; true; i++) { // Error: Constant condition
    if (i > 10) break;
  }
  
  do {
    if (Math.random() > 0.9) break;
  } while (1); // Error: Constant condition
  
  return 'done';
}
