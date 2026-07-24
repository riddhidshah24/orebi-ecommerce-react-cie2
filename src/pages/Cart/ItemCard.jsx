import React from "react";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useOrebiStore } from "../../store/useOrebiStore";
import { toast } from "react-toastify";

const ItemCard = ({ item }) => {
  const deleteItemStore = useOrebiStore((state) => state.deleteItem);
  const increaseQuantityStore = useOrebiStore((state) => state.increaseQuantity);
  const decreaseQuantityStore = useOrebiStore((state) => state.decreaseQuantity);

  const priceNum = parseFloat(item.price) || 0;
  const subtotal = (item.quantity * priceNum).toFixed(2);

  const handleDelete = () => {
    deleteItemStore(item._id);
    toast.info(`${item.productName || item.name} removed from cart.`, { icon: "🗑️" });
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-xs transition-shadow duration-300">
      
      {/* Product Image & Title */}
      <div className="flex items-center gap-4 w-full sm:w-2/5">
        <button
          type="button"
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Remove Item"
        >
          <FiTrash2 className="text-lg" />
        </button>
        
        <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <img className="w-full h-full object-cover" src={item.img || item.image} alt={item.productName || item.name} />
        </div>

        <div>
          <h3 className="font-titleFont font-bold text-base text-primeColor line-clamp-1">
            {item.productName || item.name}
          </h3>
          {item.color && (
            <p className="text-xs text-secondary mt-0.5">Color: {item.color}</p>
          )}
          <p className="text-xs text-green-600 font-medium mt-1">In Stock</p>
        </div>
      </div>

      {/* Price, Quantity & Subtotal Segment */}
      <div className="flex items-center justify-between w-full sm:w-3/5 gap-4">
        {/* Unit Price */}
        <div className="text-sm font-semibold text-primeColor w-1/3 text-center sm:text-left">
          ${priceNum.toFixed(2)}
        </div>

        {/* Quantity Controls */}
        <div className="w-1/3 flex items-center justify-center">
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
            <button
              type="button"
              onClick={() => decreaseQuantityStore({ _id: item._id })}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-primeColor transition-colors cursor-pointer"
            >
              <FiMinus className="text-xs" />
            </button>
            <span className="w-10 text-center font-bold text-sm text-primeColor font-titleFont">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => increaseQuantityStore({ _id: item._id })}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-primeColor transition-colors cursor-pointer"
            >
              <FiPlus className="text-xs" />
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="w-1/3 text-right">
          <span className="font-titleFont font-bold text-base text-primeColor">
            ${subtotal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
