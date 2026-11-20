
import { describe, expect, test } from "vitest";
import {
  PizzaTypeSchema,
  PizzaSchema,
  AmountSchema,
  OrderIdSchema,
} from "./pizzashop";

describe("Pizza Shop Schema Tests", () => {
  test("PizzaTypeSchema accepts margherita", () => {
    expect(PizzaTypeSchema.parse("margherita")).toBe("margherita");
  });

  test("PizzaTypeSchema rejects capital M", () => {
    expect(() => PizzaTypeSchema.parse("Margherita")).toThrow();
  });

  test("PizzaSchema validates a correct pizza", () => {
    const pizza = {
      type: "margherita",
      price: 100,
    };

    expect(PizzaSchema.parse(pizza)).toEqual(pizza);
  });

  test("PizzaSchema rejects a pizza without price", () => {
    expect(() =>
      PizzaSchema.parse({ type: "margherita" }),
    ).toThrow();
  });

  test("AmountSchema rejects a string amount", () => {
    expect(() => AmountSchema.parse("100")).toThrow();
  });

  test("OrderIdSchema accepts zero", () => {
    expect(OrderIdSchema.parse(0)).toBe(0);
  });
});
