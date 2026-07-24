import { describe, it, expect, beforeEach } from "vitest";
import { useOrebiStore } from "./useOrebiStore";

describe("useOrebiStore Cart State", () => {
  beforeEach(() => {
    useOrebiStore.getState().resetCart();
  });

  it("should add a new product to the cart", () => {
    const product = {
      _id: "test-1",
      productName: "Test Product",
      price: 99.99,
      img: "test.jpg",
      quantity: 1,
    };

    useOrebiStore.getState().addToCart(product);
    expect(useOrebiStore.getState().products).toHaveLength(1);
    expect(useOrebiStore.getState().products[0].productName).toBe("Test Product");
  });

  it("should increase quantity when adding existing product", () => {
    const product = {
      _id: "test-1",
      productName: "Test Product",
      price: 99.99,
      img: "test.jpg",
      quantity: 1,
    };

    useOrebiStore.getState().addToCart(product);
    useOrebiStore.getState().addToCart(product);

    expect(useOrebiStore.getState().products).toHaveLength(1);
    expect(useOrebiStore.getState().products[0].quantity).toBe(2);
  });

  it("should increase and decrease product quantity", () => {
    const product = {
      _id: "test-1",
      productName: "Test Product",
      price: 99.99,
      img: "test.jpg",
      quantity: 2,
    };

    useOrebiStore.getState().addToCart(product);
    useOrebiStore.getState().decreaseQuantity({ _id: "test-1" });
    expect(useOrebiStore.getState().products[0].quantity).toBe(1);

    useOrebiStore.getState().increaseQuantity({ _id: "test-1" });
    expect(useOrebiStore.getState().products[0].quantity).toBe(2);
  });

  it("should delete item and reset cart", () => {
    const product = {
      _id: "test-1",
      productName: "Test Product",
      price: 99.99,
      img: "test.jpg",
      quantity: 1,
    };

    useOrebiStore.getState().addToCart(product);
    useOrebiStore.getState().deleteItem("test-1");
    expect(useOrebiStore.getState().products).toHaveLength(0);
  });
});
