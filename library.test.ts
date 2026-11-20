
import { describe, expect, test } from "vitest";
import { findBook } from "./library";

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
});
