// Ref:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type
let itemUnknown: unknown;
let itemString: string;
let itemNumber: number;
let itemObject: object;

// we can assign type unknown to any type.
itemUnknown = 'ikkeh';
itemUnknown = 69;
itemUnknown = null;
itemUnknown = undefined;

let anotherUnknown: unknown;
let itemAny: any;

// we can **only** assign type unknown to another type unknown or type any.
anotherUnknown = itemUnknown;
itemAny = itemUnknown;

// this will throw an error.
itemString = itemUnknown;
itemNumber = itemUnknown;
itemObject = itemUnknown;
