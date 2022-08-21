enum Sandwich {
  Hamburger,
  VeggieBurger,
  GrilledChese,
  BLT
};

type SandwichOrder = [
  number,
  Sandwich,
  ...string[],
];

const order: SandwichOrder = [69.420, Sandwich.Hamburger, 'lettuce'];

// generic type `T` will take every type that we are passing through, and then
// make it an array with `T[]`.
function tail<T>(arg: readonly [number, ...T[]]) {
  const [_ignored, ...rest] = arg;
  return rest;
}

// because `order` has type `number`, `Sandwich`, and `string`, the type for
// the variable below would be `(string | Sandwich)[]`.
// we take all the available type and then make it an array.
// so the member of the array will have either type `string` or `Sandwich`.
const orderWithoutTotal = tail(order);

// generic type `T` is a subset of array with any types, and then we passing
// through the generic type `T`.
function tailWithExtends<T extends any[]>(arg: readonly [number, ...T]) {
  const [_ignored, ...rest] = arg;
  return rest;
}

// because we did not make generic type `T` an array but declare it as a
// subset from array with any types, the type for the variable below would be
// `[Sandwich, ...string[]]`.
const orderWithoutTotalTwo = tailWithExtends(order);

// another example of `T` subset of array type.
function arrayOfString<T extends string[]>(arg: T): T {
  return arg;
}

// this is fine.
const var1 = arrayOfString<['nani', 'yamero']>(['nani', 'yamero']);
const var2 = arrayOfString(['yamete']);

// this will throw an error.
const expectedError = arrayOfString<[1, 2, 3]>([1, 2, 3]);

// another example of `T` turned into an array.
function chaoticArray<T>(arg: T[]): T[] {
  return arg;
}

// the type of var3 would be `(string | number)[]`.
const var3 = chaoticArray(['ikkeh', 69]);
