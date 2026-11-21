import { describe, expect, test } from "vitest";
import { canBorrow, borrowWithLimit, borrowLimit } from "./library";

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

  test("basic member with no books can borrow dune", () => {
    const loan = borrowWithLimit("dune", {
      id: 1,
      name: "John",
      membership: "basic",
      booksOnLoan: 0,
    });

    expect(loan.title).toBe("dune");
  });

  test("basic member who reached the limit cannot borrow", () => {
    expect(() =>
      borrowWithLimit("dune", {
        id: 1,
        name: "John",
        membership: "basic",
        booksOnLoan: 1,
      }),
    ).toThrow("Borrowing limit reached");
  });

  test("premium member gets no copies available error for foundation", () => {
    expect(() =>
      borrowWithLimit("foundation", {
        id: 2,
        name: "Mary",
        membership: "premium",
        booksOnLoan: 2,
      }),
    ).toThrow("No copies available");
  });
});

describe("Borrow Limit Unit Tests", () => {
  test("basic membership has a borrowing limit of 2", () => {
    expect(borrowLimit("basic")).toBe(2);
  });

  test("premium membership has a borrowing limit of 5", () => {
    expect(borrowLimit("premium")).toBe(5);
  });
});