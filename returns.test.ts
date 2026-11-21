import { describe, expect, test } from "vitest";
import { findLoan, markReturned } from "./returns";

describe("Return Unit Tests", () => {
  test("findLoan returns the correct loan", () => {
    expect(findLoan(1001)).toEqual({
      id: 1001,
      title: "dune",
      memberId: 7,
    });
  });

  test("findLoan rejects an invalid loan ID", () => {
    expect(() => findLoan(-1)).toThrow();
  });

  test("findLoan rejects a loan that does not exist", () => {
    expect(() => findLoan(9999)).toThrow("Loan not found");
  });

  test("markReturned marks a loan as returned", () => {
    expect(
      markReturned({
        loanId: 1001,
        title: "dune",
        memberId: 7,
      }),
    ).toEqual({
      loanId: 1001,
      title: "dune",
      memberId: 7,
      returned: true,
    });
  });

  test("markReturned rejects an invalid loan", () => {
    expect(() =>
      markReturned({
        loanId: 0,
        title: "dune",
        memberId: 7,
      }),
    ).toThrow();
  });
});