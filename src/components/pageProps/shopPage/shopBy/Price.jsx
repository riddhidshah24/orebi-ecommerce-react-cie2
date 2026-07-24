import React from "react";
import NavTitle from "./NavTitle";

const Price = ({ selectedPrice, onSelectPrice }) => {
  const priceList = [
    { _id: 950, priceOne: 0.0, priceTwo: 49.99 },
    { _id: 951, priceOne: 50.0, priceTwo: 99.99 },
    { _id: 952, priceOne: 100.0, priceTwo: 199.99 },
    { _id: 953, priceOne: 200.0, priceTwo: 399.99 },
  ];

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-2 text-sm lg:text-base">
          {priceList.map((item) => {
            const isSelected =
              selectedPrice &&
              selectedPrice.priceOne === item.priceOne &&
              selectedPrice.priceTwo === item.priceTwo;

            return (
              <li
                key={item._id}
                onClick={() => onSelectPrice && onSelectPrice(isSelected ? null : item)}
                className={`border-b-[1px] border-b-border pb-2 flex items-center justify-between cursor-pointer duration-200 transition-colors ${
                  isSelected
                    ? "font-bold text-primeColor border-b-primeColor"
                    : "text-secondary hover:text-primeColor hover:border-gray-400"
                }`}
              >
                <span>
                  ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
                </span>
                {isSelected && (
                  <span className="text-xs bg-primeColor text-white px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Price;
