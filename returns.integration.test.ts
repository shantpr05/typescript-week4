import { describe, expect, test } from "vitest";
import { returnBook } from "./returns";

describe("Return Integration Tests", () => {
  test("returnBook successfully returns a loan", () => {
    const result = returnBook(1001);

    expect(result.returned).toBe(true);
    expect(result.title).toBe("dune");
  });
});