import { describe, expect, test } from "vitest";
import { borrowWithLimit } from "./library";

describe("Member Integration Tests", () => {
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
        booksOnLoan: 2,
      }),
    ).toThrow("Borrowing limit reached");
  });

  test("premium member gets no copies available error", () => {
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
