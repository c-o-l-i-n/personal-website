---
title: 'Testing the Stream: Mastering the Art of Observable Testing'
description: Description
thumbnail: assets/images/default.jpg
published: false
publishedDate: 2023-11-15
featured: false
---

_A quick disclaimer:_ I am not affiliated with any libraries mentioned in this article. All opinions are based off of my real-world experience testing RxJS Observables.

## The role of RxJS Observables in Angular apps

If you have any experience with creating apps with Angular, you have likely run into the concept of `Observable`s. In a nutshell, `Observable`s are not pieces of data themselves, but rather, they are _streams_ of data.

The purpose of this post is not to convince you whether or not to embrace the awesome power of RxJS Observables (you can read that post here). Rather, we want to know how to unit test Observables in a way that is both effective and doesn't make us cry.

## Why is testing Observables difficult?

There are 3 basic steps to every unit test:

1. Mock the inputs
2. Run the code
3. Assert that the output is what we expect, given our inputs

Pretty simple, right? Let's take a look at how we might unit test a simple function.

```ts
// add.ts

export function add(a: number, b: number): number {
  return a + b;
}
```

This is about as basic as it gets. The `add` function takes in 2 numbers as inputs, adds them together, and returns the sum as an output. Let's take our 3 steps and apply them to create some test for this function. We'll use Jest.

```ts
// add.spec.ts

import { add } from './add.ts';

describe('add', () => {
  it('should return 4 when given 1 and 3', () => {
    expect(add(1, 3)).toBe(4);
  });
});
```

## Why testing Observables is simpler than you think

## The observer-spy library to the rescue!
