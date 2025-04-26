
const maybeString: string | null = Math.random() > 0.5 ? 'hello' : null;
const maybeNumber: number | undefined = Math.random() > 0.5 ? 42 : undefined;

const invalid1 = maybeString! ?? 'default'; // Error: unnecessary non-null assertion

const invalid2 = (maybeNumber! ?? 0) + 10; // Error: unnecessary non-null assertion

const valid1 = maybeString ?? 'default';

const valid2 = maybeNumber!;
