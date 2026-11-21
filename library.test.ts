
import { describe, expect, test } from "vitest";
import { findBook, checkOutBook, registerLoan, borrowBook } from "./library";

describe("Library Unit Tests", () => {
  test("findBook returns 3 copies for dune", () => {
    expect(findBook("dune")).toEqual({
      title: "dune",
      copiesAvailable: 3,
    });
  });

  test("findBook returns 0 copies for foundation", () => {
    expect(findBook("foundation")).toEqual({
      title: "foundation",
      copiesAvailable: 0,
    });
  });

  test("findBook rejects an unknown book", () => {
    expect(() => findBook("harry potter")).toThrow();
  });

  test("findBook rejects a non-string title", () => {
    expect(() => findBook(42)).toThrow();
  });

  test("findBook throws when a valid title is not in the catalogue", () => {
    expect(() => findBook("the-alchemist")).toThrow("Book not found");
  });
  test("checkOutBook returns a number", () => {
    expect(typeof checkOutBook({
      title: "dune",
      copiesAvailable: 3,
    })).toBe("number");
  });

  test("checkOutBook returns an integer", () => {
    const result = checkOutBook({
      title: "dune",
      copiesAvailable: 3,
    });

    expect(Number.isInteger(result)).toBe(true);
  });

  test("checkOutBook returns a number between 1000 and 9999", () => {
    const result = checkOutBook({
      title: "dune",
      copiesAvailable: 3,
    });

    expect(result).toBeGreaterThanOrEqual(1000);
    expect(result).toBeLessThanOrEqual(9999);
  });

  test("checkOutBook throws when no copies are available", () => {
    expect(() =>
      checkOutBook({
        title: "foundation",
        copiesAvailable: 0,
      }),
    ).toThrow("No copies available");
  });

  test("checkOutBook rejects an invalid book", () => {
    expect(() =>
      checkOutBook({
        title: "dune",
      }),
    ).toThrow();
  });


  test("borrowBook successfully borrows dune", () => {
    const loan = borrowBook("dune", 7);

    expect(loan).toMatchObject({
      title: "dune",
      memberId: 7,
    });
  });

  test("borrowBook generates a loan ID between 1000 and 9999", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.loanId).toBeGreaterThanOrEqual(1000);
    expect(loan.loanId).toBeLessThanOrEqual(9999);
  });
  
});
