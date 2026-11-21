import { describe, expect, test } from "vitest";
import { borrowBook } from "./library";

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
});