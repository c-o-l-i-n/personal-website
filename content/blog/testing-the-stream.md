---
title: 'Testing the Stream: Mastering the Art of Observable Testing'
description: Description
thumbnail: /assets/images/placeholder.webp
published: false
publishedDate: 2023-11-15T00:00:00.000Z
featured: false
slugs:
  - ___UNPUBLISHED___lp0p6l3n_YJZsd95bPhvSlFsygLrNOzP9jOHhaeQS
---

## APP: Agree, Promise, Preview

_A quick disclaimer:_ I am not affiliated with any libraries mentioned in this article. All opinions are based off of my real-world experience testing RxJS Observables.

## The role of RxJS Observables in Angular apps

If you have any experience with Angular, you have likely run into the concept of `Observables`. In a nutshell, an `Observable` is not a piece of data, but a _stream_ of data emitted over time.

The purpose of this post is not to convince you whether or not to embrace the awesome power of RxJS Observables. Rather, we want to know how to unit test Observables in a way that is both effective and doesn't make us cry.

## Why is testing Observables difficult?

Let's ignore `Observables` for a moment. There are 3 basic steps to every unit test:

1. Mock the inputs
2. Run the code
3. Assert that the result is what we expect

Pretty simple, right? Let's take a look at how we might unit test a simple function.

```ts
// add.ts

export function add(a: number, b: number): number {
  return a + b;
}
```

This is about as basic as it gets. The `add` function takes in 2 numbers as inputs, adds them together, and returns the sum as an output.

Let's take our 3 steps and use them to write a test for this function with Jest.

```ts
// add.spec.ts

import { add } from './add.ts';

describe('add', () => {
  it('should return 4 when given 1 and 3', () => {
    // 1. Mock the inputs
    const a = 1;
    const b = 3;

    // 2. Run the code
    const result = add(a, b);

    // 3. Assert that the result is what we expect
    expect(result).toBe(4);
  });
});
```

That's all fine and good for a pure function with simple inputs and outputs. But what about a function that relies on outside information? For example, an Angular component that has an "Add" button that adds a number to the number in the component state.

```ts
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Total: {{ total }}</h1>

    <input type="number" #numberToAdd />
    <button (click)="addToTotal(numberToAdd.value)">Add to Total</button>
  `,
})
export class AppComponent {
  total = 0;

  add(numberToAddString: string): void {
    const numberToAdd = Number(numberToAddString);
    total += numberToAdd;
  }
}
```

## Why testing Observables is simpler than you think

## The observer-spy library to the rescue!
