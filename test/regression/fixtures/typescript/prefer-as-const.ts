
const color1 = 'red' as 'red'; // Error: prefer 'as const'

const color2 = 'blue' as const;

const theme = {
  primary: 'green' as 'green', // Error: prefer 'as const'
  secondary: 'yellow' as const, // Valid
};

const colors = [
  'purple' as 'purple', // Error: prefer 'as const'
  'orange' as const, // Valid
];

const count = 42 as number;
