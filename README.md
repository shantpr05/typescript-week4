# Week 10 – Unit Tests, Integration Tests and Zod

## Overview

This assignment focuses on writing reliable TypeScript applications using Test-Driven Development (TDD), unit testing, integration testing and runtime validation with Zod.

The exercises use a pizza shop example and a library borrowing system to practise writing tests, implementing functionality, handling errors and improving code quality.

## Technologies Used

- TypeScript
- JavaScript
- Zod – runtime data validation and schema definitions
- Vitest – unit and integration testing
- Vite
- Node.js
- npm

## Learning Objectives

- Understand the Red-Green-Refactor TDD workflow.
- Write unit tests for individual functions.
- Write integration tests to verify how functions work together.
- Validate unknown input using Zod schemas.
- Infer TypeScript types from Zod schemas using `z.infer`.
- Test successful results, invalid inputs and error messages.
- Refactor shared logic without breaking existing functionality.
- Measure code coverage using Vitest.

## Exercises Completed

### Exercise 1 – Vegetarian Pizza
- Added vegetarian pizza support.
- Updated the pizza type schema and menu.
- Created unit and integration tests.

### Exercise 2 – Customer Payment
- Tested `chargeCustomer()` with valid and invalid inputs.
- Checked error handling and exact error messages.
- Fixed the customer error message typo.

### Exercise 3 – Zod Schema Tests
- Created tests for pizza, pizza type and amount schemas.
- Tested valid and invalid values.
- Practised object comparison using `toEqual()`.

### Exercise 4 – Find a Book
- Created `BookTitleSchema` and `BookSchema`.
- Implemented `findBook()`.
- Tested existing books and invalid titles.

### Exercise 5 – Check Out a Book
- Implemented `checkOutBook()`.
- Validated book information.
- Generated a random loan ID between 1000 and 9999.
- Tested books with no available copies.

### Exercise 6 – Loan Management
- Created `LoanSchema` and the `Loan` TypeScript type.
- Implemented `registerLoan()` and `borrowBook()`.
- Added unit and integration tests.

### Exercise 7 – Member Borrowing Limits
- Created `MemberSchema` and the `Member` type.
- Implemented `canBorrow()` and `borrowWithLimit()`.
- Tested basic and premium membership limits.

### Exercise 8 – Returning Books
- Implemented `findLoan()`, `markReturned()` and `returnBook()`.
- Added unit and integration tests.
- Fixed a loan property mismatch discovered by integration testing.

### Exercise 9 – Borrowing Multiple Books
- Implemented `borrowLimit()` to share borrowing-limit logic.
- Refactored `canBorrow()`.
- Implemented `borrowBooks()` with validation for book count and membership limits.
- Added integration tests for multiple-book borrowing.

### Bonus – Code Coverage
- Ran Vitest coverage reports.
- Added a test for a valid book title missing from the catalogue.
- Achieved 100% statement, branch, function and line coverage.

## Project Structure

```text
typescript-week4/
│
├── pizzashop.ts
├── pizzashop.test.ts
├── pizzashop.integration.test.ts
│
├── schemas.test.ts
│
├── library.ts
├── library.test.ts
├── loans.test.ts
├── loans.integration.test.ts
├── members.test.ts
├── members.integration.test.ts
│
├── returns.ts
├── returns.test.ts
├── returns.integration.test.ts
│
├── ANSWERS.md
├── package.json
├── package-lock.json
└── README.md
```

## How to Run the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Run all tests

```bash
npm test
```

### 3. Run TypeScript type checking

```bash
npm run typecheck
```

### 4. Run ESLint

```bash
npm run lint
```

### 5. Run tests with coverage

```bash
npm run test:coverage
```

### 6. Run tests in watch mode

```bash
npm run test:watch
```

## Test Results

Final verification:

| Check | Result |
|---|---:|
| Test files | 10 passed |
| Total tests | 61 passed |
| Statements | 100% |
| Branches | 100% |
| Functions | 100% |
| Lines | 100% |
| TypeScript typecheck | Passed |

## TDD Workflow

The assignment followed the Red-Green-Refactor approach:

1. **Red:** Write a test and confirm that it fails.
2. **Green:** Implement the minimum code needed to pass the test.
3. **Refactor:** Improve the implementation while keeping all tests passing.

Git commits were created throughout the exercises to preserve the development process and demonstrate the TDD workflow.

## Git Branch

```text
week10/TDD
```

## Conclusion

Through this assignment, I gained practical experience with unit testing, integration testing, Zod validation and Test-Driven Development in TypeScript.

I also learned how integration tests can reveal issues that individual unit tests may miss, how to refactor shared functionality safely, and how code coverage helps identify untested code paths.