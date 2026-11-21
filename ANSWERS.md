# Week 10 – Unit Tests, Integration Tests and Zod Answers

## Exercise 1: A new pizza on the menu

### 1. Which schema stopped it, and what does this tell us about TypeScript types versus Zod checks?

The PizzaTypeSchema stopped the input because vegetarian was not included in the allowed pizza types. TypeScript checks types during development and compilation, whereas Zod validates actual values at runtime. Vitest can execute the code even when TypeScript displays a type error because Vitest transforms TypeScript without necessarily performing type checking.
### Write one more test: orderPizza("vegetarian") returns true. Which file does it belong in, and why?

It belongs in pizzashop.integration.test.ts because orderPizza combines multiple functions (createPizza, sendOrder and chargeCustomer). We are testing how they work together, not just one function.

## Exercise 2

### 3. The bug was a spelling mistake in the error message: "cutomer" instead of "customer".

Testing exact error messages is important because it verifies not only that the code detects invalid input, but also that it communicates the correct and consistent information to the caller. Even a small spelling mistake can cause a test to fail.

### Exercise 3 — Testing schemas

### 4. Why do we use toEqual instead of toBe when testing objects?

We use toEqual to compare objects because it checks whether their properties and values are the same. toBe checks whether two values are the exact same reference in memory. Since the parsed pizza object is a new object, toEqual is the correct matcher.

### Exercise 4

Zod validates the input at runtime and rejects invalid book titles. TypeScript provides static type checking during development. Using z.infer allows us to derive the TypeScript Book type directly from the Zod schema, keeping the validation rules and type definition consistent.

### Exercise 5 — Assignment question

### 5. Why could a test for a random number sometimes pass even if the implementation is incorrect?

A test that checks a random number may sometimes pass by chance, even if the implementation is incorrect. For example, an incorrect random-number generator might occasionally produce a value within the expected range. To make the test more reliable, we can test multiple properties, such as whether the result is a number, an integer, and within the required range. We can also mock the random function to control its output.

### Exercise 7 – Member Validation

**1. Which function decides which error is thrown first?**

`borrowWithLimit()` checks the member's borrowing limit first. If the member has reached the limit, it throws `"Borrowing limit reached"`. Otherwise, it calls `borrowBook()`, which checks whether the book is available.

**2. Is this the desired behaviour?**

Yes. The system should first check whether the member is allowed to borrow a book. If the member is eligible, it can then check book availability.

### Exercise 8 – Returning Books

**1. What is the difference between TypeScript, Zod and tests?**

- TypeScript checks types during development and helps catch coding mistakes.
- Zod validates data at runtime and ensures that incoming data has the correct structure.
- Tests check whether the functions behave as expected.

**2. Why did the unit tests miss the bug?**

The unit tests for `findLoan()` expected the incorrect property name `id`. The implementation and test agreed with each other, so the tests passed. The integration test checked the complete return process and exposed the mismatch when `markReturned()` expected `loanId`.

### Exercise 9 – Borrowing Multiple Books

**1. How do you know the refactoring did not break existing functionality?**

I ran the complete test suite after refactoring. All 60 tests passed, including the existing unit and integration tests.

**2. Why are tests important when refactoring?**

Tests provide a safety net. They help detect unexpected changes and confirm that existing functionality still works after modifying the code.

### Bonus exercise

**1. Does 100% test coverage mean your code has no bugs?**

No. It means all statements, branches, functions and lines were executed by tests. It does not guarantee that every possible input or situation has been tested.

**2. Would coverage have warned you about the Exercise 8 bug?**

No. Coverage measures which code was executed, not whether the code behaves correctly. The integration test found the bug because it checked the expected loan property.