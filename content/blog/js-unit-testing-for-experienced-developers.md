---
title: JavaScript Unit Testing for Experienced Developers
description: You already know how unit tests work. You just want to know how to do it in JavaScript.
thumbnail: assets/images/default.jpg
published: false
publishedDate: 2023-11-15
featured: false
---

Ths article assumes you already know how to write unit tests in other programming languages, and you just want to know how to do it in JavaScript (or TypeScript). If you've never written unit tests before, check out [Unit Testing 101](/blog/unit-testing-101) to learn everything you need to know!

> Since TypeScript is just a superset of JavaScript, TypeScript tests are written using the same libraries and syntax as JavaScript tests. For the purposes of this article, "JavaScript" means both JavaScript and TypeScript.

# Choosing a JavaScript Testing Library

I will assume you are using Node.js as your JavaScript runtime environment, as it is the industry standard. Other runtime environments like Deno have their own testing libraries.

The 3 big players in the JavaScript testing space are Jest, Mocha, and Jasmine. You can't go wrong with any of these. For the most part, the 3 libraries are quite similar. Given 3 great options, I usually choose the most popular library simply because it will have the most community support and resources. Jest is the clear winner in terms of popularity. **For the rest of this article, we will focus on Jest.**

https://npmtrends.com/jasmine-core-vs-jest-vs-mocha

Some JavaScript frameworks make the decision for you. For example, at the time of writing, new Angular projects come preinstalled with Jasmine ([but this may soon change](https://blog.angular.io/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca)). You can still swap out testing libraries if you want, but the further you stray from the default path, the more you will find yourself "on your own" when solving annoying configuration problems, among other issues.

## Testing Library vs. Test Runner

This topic confused me at the start of my JavaScript testing journey. There is sometimes (but not always) a distinction between the library you use to write your tests (the testing library) and the program you use to run your tests (the test runner).

Jest is both a testing library and its own test runner. Jest runs all tests within Node.js.

Jasmine is a testing library, and _sometimes_ a test runner. [Here's how to run Jasmine directly](https://jasmine.github.io/pages/getting_started.html). [Angular uses Karma or Web Test Runner to run tests directly in a browser](https://blog.angular.io/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca).
