# Frontend Master Making Typescript Stick

## Typescript Basic Quiz

### Question 1

Let's say we have a class like this:
```typescript
export class Person {
  #name = '';
  private age = 1;
}
```

What is the difference between `#name` and `private age`?

#### Answer Question 1

`#name` is a javascript private field, we can't access this field outside of
the class.

`private age` is a typescript private field. It is called Access Modifier
Keyword which contains `private`, `public`, and `protected`, and we get the
benefit of type checking if we try to use this field where we should not have
access to the field. But, at runtime this field still exist.

So, `#name` is enforced during build time and runtime meanwhile `private age`
only at build time.

### Question 2

Let's say we have variables like this:
```typescript
const a = 'something big';
let b = 'something big'

const c = { learn: 'something big' };
let d = { learn: 'something big' };

const e = Object.freeze({ learn: 'something big' ]);
```

From the five variables above, which variables hold immutable values?
Immutable here means we can't change the value the variable holds.

#### Answer Question 2

In javascript, string is immutable value types. `const` and `let` are ways we
can declare variables but that has more to do with **reassignability**.

So, the things that `b` points to, which is string, we can't change because
strings are immutable in javascript. That is why when we split a string, we
get an array of new strings, we are not altering the original string.

`c` and `d` holds mutable values because `c` and `b` is an object and we can
place a new properties inside of an object.

Meanwhile `e` holds immutable values because `Object.freeze()` prevents new
properties from being added to an object and it prevents the existing
properties on that object from being assigned to new values. **But,
`Object.freeze()` does not recursively make things immutable**, what this
means is that if we have a nested object, only the properties of the outer
most object will be immutable. It is kind of like one-level immutability

### Question 3

Let's say we have this snippet code:
```typescript
const str = 'hello';
let val = /* ??? */;
console.log(val); // ['h', 'e', 'l', 'l', 'o']
```

What is missing if we need to make `val` into an array of string like
`['h', 'e', 'l', 'l', 'o']`?

#### Answer Question 3

```typescript
const str = 'hello';
let val = str.split('');
```

### Question 4

Let's say we have this snippet code:
```typescript
const str = 'hello';
let val = /* ??? */;
console.log(val);
/**
 * {
 *   '0': 'h',
 *   '1': 'e',
 *   '2': 'l',
 *   '3': 'l',
 *   '4': 'o'
 * }
 */
```

What is missing if we need to make `val` into something like this:
```typescript
{
  '0': 'h',
  '1': 'e',
  '2': 'l',
  '3': 'l',
  '4': 'o'
}
```

#### Answer Question 4

```typescript
const str = 'hello';
let val = { ...str.split('') };
```

### Question 5

Let's say we have this code snippet:
```typescript
let first: string & number;
let second: String & Number;

first = 'abc';
second = 'abc';
second = new String('abc');
```

What is the difference between `string` (with lowercase s) and `String` (with
uppercase S), `number` (with lowercase n) and `Number` (with uppercase N)?

#### Answer Question 5

When using the primitive types `string & number`, the result would be `never`
because there is nothing that both a string and a number.

When using the interface types `String & Number`, we don't get `never` type,
we get something like the combination of the two interfaces that contains the
method on `String` and the method on `Number`

> Question 6 is similar to question 5, which is explaining about primitive
> types and interface types. So this notes will skip over question 6.

### Question 7

Let's say we have this snippet code:
```typescript
function getData() {
  console.log("elephant");
  const p = new Promise((resolve) => {
    console.log("giraffe");
    resolve("lion");
    console.log("zebra");
  })
  console.log("koala");
  return p;
}

async function main() {
  console.log("cat");
  const result = await getData();
  console.log(result);
}

console.log("dog");

main().then(() => {
  console.log("moose");
})
```

What is the order we will see things written to the console?

#### Answer Question 7

The first console.log that executed is `dog`.

And then, we enter `main()`, and it is an async function but we begin
executing it immediately until we have something that is need `await`. With
that in mind, we begin execute `cat` after entering the `main()`.

After that, we get into `getData()`, although `getData()` is an async
function, we don't really create that promise and then come back to it later
until something async actually happens. With that in mind, the next would be
`elephant`.

And then we will invoke the promise inside `getData()`, and because nothing
async happen yet, the next would be `giraffe`.

After that, there is `resolve('lion')`, we can think of it as the promise now
become resolved. It is just holding the value until someone give out `.then()`
later. So what happens here is queue the `lion` value and do anything with it
yet.

Because we did not print out `lion`, we proceed to print out `zebra`.

After `zebra`, we print out `koala`.

After the `getData()` resolved, we give value to `result` and print out
`result` which has `lion` as a value from `getData()`.

Finally, we print out `moose`.

So, the order would be:
```sh
dog
cat
elephant
giraffe
zebra
koala
lion
moose
```

## Variadic Tuple Types

Tuple types is like a fixed length array where we know the type at a given
position. Here is an example:
```typescript
type Color = [
  number, // red (0-255)
  number, // green (0-255)
  number, // blue (0-255)
]
```

For a while, it is possible to use spread operator as the last element of
tuple like this:
```typescript
enum Sandwich {
  Hamburger,
  VeggieBurger,
  GrilledCheese,
  BLT
};

type SandwichOrder = [
  number, // total price order
  Sandwich, // sandwich
  ...string[] // toppings
]

const orderOne: SandwichOrder = [69.69, Sandwich.Hamburger, 'lettuce'];
const orderTwo: SandwichOrder = [
  69.420,
  Sandwich.Hamburger,
  'lettuce',
  'cheese',
];
```

We can also use spread operator with generic like this:
```typescript
type MyTuple<T> = [number, ...T[]];

const x1: MyTuple<string> = [6, 'hello'];
const x2: MyTuple<boolean> = [9, false, true];
```

Now, let's say we want to pass the sandwich order to the kitchen. The kitchen
only need the type of sandwich and the toppings, they does not really need the
total price order. We can do something like this:
```typescript
enum Sandwich {
  Hamburger,
  VeggieBurger,
  GrilledCheese,
  BLT
};

type SandwichOrder = [
  number, // total price order
  Sandwich, // sandwich
  ...string[] // toppings
]

const orderOne: SandwichOrder = [69.69, Sandwich.Hamburger, 'lettuce'];

/**
 * return an array containing everything except the first element
 */
function tail<T extends any[]>(arg: readonly [number, ...T]) {
  const [_ignored, ...rest] = arg;
  return rest;
}

const orderWithoutTotal = tail(orderOne);
```

> Is the type an array or is the type a member an array?

Where this implementation might be useful?

Function argument types are often going through the type system as tuples. So
if we are trying to get the arguments of a particular constructor, this is
where we could preserve the order if there is a spread operator at the end,
and we still get the correct type for that.

> We might not see this very often on our application code, but libraries we
> use might use this. And this will have an impact on what works in our code
> and what does not.

We can also use multiple spread operator in type like this:
```typescript
type MyTuple = [
  ...[number, number],
  ...[string, string, string],
];

const x: MyTuple = [6, 9, 'something', 'is', 'big'];
```

Keep in mind that we can only use one `...rest[]` element in a single tuple,
like this:
```typescript
type Yes = [
  ...[number, number],
  ...string[],
];

// this will throw an error.
type No = [
  ...string[],
  ...number[],
];
```

We can also put the `...rest[]` element in the middle of tuple, like this:
```typescript
type MiddleRest = [
  boolean,
  ...number[],
  string,
];
```

## Class Property Inference

Class property inference from contractor means that we no longer have to add
type to every class field.

Before typescript 4.0, we need to do this:
```typescript
class Color {
  red: number;
  green: number;
  blue: number;

  constructor(c: [number, number, number]) {
    this.red = c[0];
    this.green = c[1];
    this.blue = c[2];
  }
}
```

In the typescript 4.0 and above, we can do something like this:
```typescript
class Color {
  red;
  green;
  blue;

  constructor(c: [number, number, number]) {
    this.red = c[0];
    this.green = c[1];
    this.blue = c[2];
  }
}
```

> For simple annotation, we don't really need an explicit type annotation.
> But, for anything that get a little hard to immediately to look at and
> understand, use type annotation.

## Thrown Value as Unknown

Before typescript 4.0, anything that we encounter in a `catch` block would be
of type `any`.

Dealing with thrown values in a consistent way is important because errors are
nice and throwing things that are not errors can leave us missing information.

We can make error type as `unknown` like this:
```typescript
function somethingThrowing(message: string): string {
  throw message;
}

try {
  somethingThrowing('anu');
} catch (error: unknown) {
  if (error instanceof Error) throw error;
  else throw new Error(`${error}`);
}
```

## Template Literal Types

We can think of template literal types like the usual template literal with
backtick, but this is for type. The syntax is also the same.

Here is an example:
```typescript
type Statistics = {
  [Key in `${ 'median' | 'mean' }Value`]?: number;
};

// the type would be { medianValue: number, meanValue: number }.
const stats: Statistics = {
  medianValue: 0,
  meanValue: 0,
};
```

Another example is that, let's say we want to get any properties of `Window`
that start with `set`. We can do something like this:
```typescript
// the type would be 'setInterval' | 'setTimeout'.
const winSet: Extract<keyof Window, `set${any}`> = 'setInterval';
```

## Checked Index Access

In typescript 4.0 we have compiler option `noUncheckedIndexAccess` which make
an assumption that there might be `undefined` for anything that has an index
signature, such as array and object.

Here is an example if we do what `noUncheckedIndexAccess` option manually:
```typescript
type Dict<T> = { [k: string ]: T | undefined };

const d: Dict<string[]> = {};
// this will throw an error because there is no nonsense.
d.nonsense.join(', ')
```

## Extra Notes

### Promise

**Control flow is important because that is how we narrow types**. When we
have something that could be a couple of different values, we can say "If it
is a number, we do this. If it is string, we do that".

It is also important to know what synchronous and what asynchronous. **Which
branch to follow now versus what happens later after things are changed**.
That has implication on what types of things will end up being, whether
something is defined or not.

**Just because a `Promise` has resolved does not mean the corresponding
`.then` or `await` is called immediately**.

### Type

**We are free to use a more specific type, but not a more general type**. We
can impose additional constraints, but we can not relax the constraints.

### User Defined Type Guard

Here is an example of user defined type guard:
```typescript
function isDefined<Type>(item: Type | undefined): item is Type {
  return typeof item !== 'undefined';
}
```

The above snippet is a type guard because it is not simply return a boolean,
but return a boolean with a specific meaning, **a boolean that should tell the
type system something special**.

In this case, if the return type is `true`, that means the type of `item` is
`Type`, if the return type is `false`, that means the type of `item` is not
`Type`.

### The Difference Between Interface and Type Alias

Interface is open, so we can do something like this:
```typescript
interface FruitProps {
  name: string;
}

interface FruitProps {
  color: string;
}
```

Meanwhile, type aliases is not, which mean if there are two type with the same
name, type checker in typescript will throw an error. For example:
```typescript
// this will throw an error.
interface FruitProps {
  name: string;
}

type FruitProps = {
  color: string;
}

// this will also throw an error.
type Apple = {
  name: string;
}

type Apple = {
  color: string;
}
```

## References

- [Frontend master course](https://frontendmasters.com/courses/typescript-practice/).
- [Course website](https://www.typescript-training.com/course/making-typescript-stick).
- [Course repo](https://github.com/mike-north/making-typescript-stick/).
- [A blog post about error handling](https://www.honeybadger.io/blog/errors-nodejs/).
- [Typescript never type documentation](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type).
