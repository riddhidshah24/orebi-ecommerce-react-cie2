import { describe, it, expect, beforeEach } from "vitest";
import { useOrebiStore } from "./useOrebiStore";

describe("useOrebiStore Cart & Auth State", () => {
  beforeEach(() => {
    useOrebiStore.getState().resetCart();
    useOrebiStore.getState().logoutUser();
  });

  it("should handle user login and logout", () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
    };

    useOrebiStore.getState().loginUser(user);
    expect(useOrebiStore.getState().user).toEqual(user);

    useOrebiStore.getState().logoutUser();
    expect(useOrebiStore.getState().user).toBeNull();
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
