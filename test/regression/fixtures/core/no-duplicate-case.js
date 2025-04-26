
function validSwitchStatement(value) {
  switch (value) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    default:
      return 'other';
  }
}

function validExpressionCases(value) {
  switch (value) {
    case 1 + 1:
      return 'two';
    case 2 + 1:
      return 'three';
    case 3 + 1:
      return 'four';
    default:
      return 'other';
  }
}

function invalidSwitchStatement(value) {
  switch (value) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 1: // Error: Duplicate case label
      return 'another one';
    default:
      return 'other';
  }
}

function invalidExpressionCases(value) {
  switch (value) {
    case 1 + 1:
      return 'two';
    case 2:
      return 'two again';
    case 2: // Error: Duplicate case label
      return 'another two';
    default:
      return 'other';
  }
}
