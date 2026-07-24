import React from "react";
import NavTitle from "./NavTitle";

const Category = ({ selectedCategory, onSelectCategory }) => {
  const items = [
    { _id: 990, title: "Accessories" },
    { _id: 991, title: "Electronics" },
    { _id: 992, title: "Clothes" },
    { _id: 993, title: "Bags" },
    { _id: 994, title: "Home appliances" },
    { _id: 995, title: "Gadgets" },
  ];

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-2 text-sm lg:text-base">
          {items.map(({ _id, title }) => {
            const isSelected = selectedCategory === title;
            return (
              <li
                key={_id}
                onClick={() => onSelectCategory && onSelectCategory(isSelected ? null : title)}
                className={`border-b-[1px] border-b-border pb-2 flex items-center justify-between cursor-pointer duration-200 transition-colors ${
                  isSelected
                    ? "font-bold text-primeColor border-b-primeColor"
                    : "text-secondary hover:text-primeColor hover:border-gray-400"
                }`}
              >
                <span>{title}</span>
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

export default Category;
