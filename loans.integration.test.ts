import { describe, expect, test } from "vitest";
import { borrowBook,borrowBooks, } from "./library";

describe("Loan Integration Tests", () => {
  test("borrowBook successfully borrows dune for member 7", () => {
    const loan = borrowBook("dune", 7);

    expect(loan).toMatchObject({
      title: "dune",
      memberId: 7,
    });

    expect(loan.loanId).toBeGreaterThanOrEqual(1000);
    expect(loan.loanId).toBeLessThanOrEqual(9999);
  });

  test("borrowBook throws when foundation has no copies", () => {
    expect(() => borrowBook("foundation", 7)).toThrow(
      "No copies available",
    );
  });

  test("borrowBook throws when member ID is invalid", () => {
    expect(() => borrowBook("dune", -1)).toThrow();
  });

  test("premium member can borrow two books", () => {
    const loans = borrowBooks(
      ["dune", "neuromancer"],
      {
        id: 3,
        name: "Alice",
        membership: "premium",
        booksOnLoan: 0,
      },
    );

    expect(loans).toHaveLength(2);
    expect(loans[0].title).toBe("dune");
    expect(loans[1].title).toBe("neuromancer");
  });

  test("borrowBooks rejects an empty array", () => {
    expect(() =>
      borrowBooks([], {
        id: 3,
        name: "Alice",
        membership: "premium",
        booksOnLoan: 0,
      }),
    ).toThrow();
  });

  test("borrowBooks rejects more than three books", () => {
    expect(() =>
      borrowBooks(
        ["dune", "neuromancer", "dune", "neuromancer"],
        {
          id: 3,
          name: "Alice",
          membership: "premium",
          booksOnLoan: 0,
        },
      ),
    ).toThrow();
  });

  test("basic member cannot borrow two more books when already has one", () => {
    expect(() =>
      borrowBooks(
        ["dune", "neuromancer"],
        {
          id: 4,
          name: "Bob",
          membership: "basic",
          booksOnLoan: 1,
        },
      ),
    ).toThrow("Borrowing limit reached");
  });
});