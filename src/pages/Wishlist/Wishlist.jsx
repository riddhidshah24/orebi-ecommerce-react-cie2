import React from "react";
import { Link } from "react-router-dom";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useOrebiStore } from "../../store/useOrebiStore";
import { toast } from "react-toastify";

const Wishlist = () => {
  const wishlist = useOrebiStore((state) => state.wishlist);
  const removeFromWishlist = useOrebiStore(
    (state) => state.removeFromWishlist
  );
  const addToCartStore = useOrebiStore((state) => state.addToCart);

  const handleRemove = (id, name) => {
    removeFromWishlist(id);

    toast.info(`${name} removed from wishlist`, {
      icon: "💔",
    });
  };

  const handleAddToCart = (item) => {
    addToCartStore({
      ...item,
      quantity: 1,
    });

    toast.success(`${item.productName} added to cart!`, {
      icon: "🛒",
    });
  };

  return (
    <div className="max-w-container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primeColor flex items-center gap-3">
          My Wishlist
          <BsSuitHeartFill className="text-red-400" />
        </h1>

        <p className="text-secondary mt-2">
          Your saved products in one place.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 border border-gray-200 rounded-xl">
          <BsSuitHeartFill className="text-5xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-semibold text-primeColor">
            Your wishlist is empty
          </h2>

          <p className="text-secondary mt-2 mb-6">
            Save products you love and find them here later.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-primeColor text-white px-6 py-3 rounded-md hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white"
            >
              <div className="h-64 bg-gray-50">
                <img
                  src={item.img}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="font-bold text-primeColor truncate">
                  {item.productName}
                </h2>

                <p className="text-secondary text-sm mt-1">
                  {item.color}
                </p>

                <p className="font-bold text-primeColor mt-2">
                  ${item.price}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-primeColor text-white py-2 rounded-md text-sm flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    <FaShoppingCart />
                    Cart
                  </button>

                  <button
                    onClick={() =>
                      handleRemove(item._id, item.productName)
                    }
                    className="px-3 py-2 border border-gray-200 rounded-md text-red-400 hover:bg-gray-50"
                    title="Remove from wishlist"
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;