import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useOrebiStore } from "../../../store/useOrebiStore";
import { toast } from "react-toastify";

const Product = (props) => {
  const addToCartStore = useOrebiStore((state) => state.addToCart);
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleAddToCart = () => {
    addToCartStore({
      _id: props._id,
      productName: props.productName,
      quantity: 1,
      img: props.img,
      badge: props.badge,
      price: props.price,
      color: props.color,
    });
    toast.success(`${props.productName} added to cart!`, {
      icon: "🛒",
    });
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden rounded-t-xl border border-gray-200 border-b-0 bg-gray-50">
        <div>
          <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" imgSrc={props.img} />
        </div>
        <div className="absolute top-4 left-4">
          {props.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white/95 backdrop-blur-xs -bottom-[130px] group-hover:bottom-0 transition-all duration-300 shadow-lg">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-4">
            <li
              onClick={() => toast.info("Product comparison feature coming soon!")}
              className="text-secondary hover:text-primeColor text-xs font-semibold border-b-[1px] border-b-gray-100 flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-200 w-full"
            >
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li
              onClick={handleAddToCart}
              className="text-secondary hover:text-primeColor text-xs font-semibold border-b-[1px] border-b-gray-100 flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-200 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-secondary hover:text-primeColor text-xs font-semibold border-b-[1px] border-b-gray-100 flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-200 w-full"
            >
              View Details
              <span className="text-sm">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li
              onClick={() => toast.success(`${props.productName} added to wishlist!`, { icon: "❤️" })}
              className="text-secondary hover:text-primeColor text-xs font-semibold flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-200 w-full"
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill className="text-red-400" />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-4 flex flex-col gap-1 border border-gray-200 border-t-0 px-4 rounded-b-xl bg-white">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-base text-primeColor font-bold truncate pr-2">
            {props.productName}
          </h2>
          <p className="text-primeColor font-bold text-sm">${props.price}</p>
        </div>
        <div>
          <p className="text-secondary text-xs">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
