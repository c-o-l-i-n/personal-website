---
title: 'Unit Testing 101 (through a JavaScript lens)'
description: Description
thumbnail: /assets/images/placeholder.webp
published: false
publishedDate: 2023-11-15
featured: false
slugs:
  - ___UNPUBLISHED___lp0k32a0_wEJpBg9n4ANVafHR7d9cpTfclYwCbmoY
---

## What are unit tests?

Unit tests are the most basic form of test we have in the world of software development. They test a single "unit" of code. Generally, 1 "unit" equates to 1 function.

Unit tests answer this question: _Given these parameters, does this function behave how I expect?_

## Why do we write unit tests?

Reason #1: Your boss makes you.

Some other good reasons:

We write unit tests to verify that our code works as expected.

Unit tests give us confidence that our code will function reliably over time, under various circumstances.

Perhaps the most valuable reason to write thorough tests (unit tests or otherwise) is we gain confidence that changing one part of the code base does not unexpectedly break another part. When multiple developers work on a single project, it is difficult for everyone to understand every aspect of the code base. One of the scariest things about changing code in a large code base is the potential to unexpectedly break a seemingly unrelated feature. With automated tests, we are alerted of these defects before they ever reach users.

> Notice how I never said unit tests _prove_ that our code works.
>
> The more unique unit tests we write, the more confident we can be that our code is reliable. However, it is often impossible to write enough tests to prove that our code will work without fail 100% of the time. The real world is full of surprises. Users act in unexpected ways. Network connections fail. [Cosmic rays flip bits in RAM](https://en.wikipedia.org/wiki/Soft_error#Cosmic_rays_creating_energetic_neutrons_and_protons).

## How do we write unit tests in JavaScript?

The concepts of unit testing are programming language-agnostic. Once you know about unit testing in JavaScript, that knowledge will transfer to any other programming language.

## How do we keep unit tests true unit tests?

If you're new to the testing world, this question might not make much sense. When I say "keep unit tests **true** unit tests," what I mean is that we should be careful not to write our unit tests in such a way that they stop being unit tests and _become_ other types of tests: namely, integration tests or end-to-end tests.

Without going into too much detail: integration tests confirm that different parts of an app work together as expected. End-to-end tests confirm that an entire app workflow works as expected. It's pretty difficult to accidentally write an end-to-end test when you're trying to write a unit test. The thing we need to be careful of is not accidentally writing _integration_ tests when we mean to write unit tests.

As you may have guessed, the primary difference between a unit test and an integration test is that unit tests **must** only test 1 unit of code, while integration tests test multiple units working together.
