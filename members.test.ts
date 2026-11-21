import { describe, expect, test } from "vitest";
import { canBorrow } from "./library";

describe("Member Unit Tests", () => {
  test("basic member can borrow 1 book", () => {
    expect(
      canBorrow({
        id: 1,
        name: "John",
        membership: "basic",
        booksOnLoan: 1,
      }),
    ).toBe(true);
  });

  test("basic member cannot borrow 2 books", () => {
    expect(
      canBorrow({
        id: 1,
        name: "John",
        membership: "basic",
        booksOnLoan: 2,
      }),
    ).toBe(false);
  });

  test("premium member can borrow 4 books", () => {
    expect(
      canBorrow({
        id: 2,
        name: "Mary",
        membership: "premium",
        booksOnLoan: 4,
      }),
    ).toBe(true);
  });

  test("premium member cannot borrow 5 books", () => {
    expect(
      canBorrow({
        id: 2,
        name: "Mary",
        membership: "premium",
        booksOnLoan: 5,
      }),
    ).toBe(false);
  });

  test("member with an empty name is rejected", () => {
    expect(() =>
      canBorrow({
        id: 1,
        name: "",
        membership: "basic",
        booksOnLoan: 0,
      }),
    ).toThrow();
  });
});