
import { describe, expect, test } from "vitest";
import { registerLoan, borrowBook } from "./library";

describe("Loan Unit Tests", () => {
  test("registerLoan returns a valid loan", () => {
    const loan = registerLoan(1234, "dune", 7);

    expect(loan).toEqual({
      loanId: 1234,
      title: "dune",
      memberId: 7,
    });
  });

  test("registerLoan rejects an invalid member ID", () => {
    expect(() => registerLoan(1234, "dune", 0)).toThrow();
  });

  test("registerLoan rejects an invalid book title", () => {
    expect(() => registerLoan(1234, "harry potter", 7)).toThrow();
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



