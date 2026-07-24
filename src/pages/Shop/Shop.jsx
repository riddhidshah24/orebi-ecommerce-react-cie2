import React, { useState, useMemo } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { paginationItems } from "../../constants";

const Shop = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedColor) ||
    Boolean(selectedBrand) ||
    Boolean(selectedPrice);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedColor(null);
    setSelectedBrand(null);
    setSelectedPrice(null);
    setSortBy("default");
  };

  // Filter and sort items dynamically
  const filteredProducts = useMemo(() => {
    let result = [...paginationItems];

    if (selectedCategory) {
      result = result.filter((item) => item.cat === selectedCategory);
    }

    if (selectedColor) {
      result = result.filter((item) => item.color === selectedColor);
    }

    if (selectedBrand) {
      result = result.filter((item) => item.brand === selectedBrand);
    }

    if (selectedPrice) {
      result = result.filter((item) => {
        const p = parseFloat(item.price);
        return p >= selectedPrice.priceOne && p <= selectedPrice.priceTwo;
      });
    }

    // Sort items
    if (sortBy === "price-low") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, selectedColor, selectedBrand, selectedPrice, sortBy]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />

      {/* Main Shop Container */}
      <div className="w-full h-full flex flex-col mdl:flex-row pb-20 gap-8">
        {/* Left Sidebar Navigation */}
        <div className="w-full mdl:w-[25%] lgl:w-[22%] flex-shrink-0">
          <ShopSideNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            selectedPrice={selectedPrice}
            onSelectPrice={setSelectedPrice}
            onResetFilters={resetAllFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Right Main Content */}
        <div className="w-full mdl:w-[75%] lgl:w-[78%] flex flex-col gap-6">
          <ProductBanner
            isGridView={isGridView}
            setIsGridView={setIsGridView}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalProductsCount={filteredProducts.length}
          />

          <Pagination
            items={filteredProducts}
            itemsPerPage={itemsPerPage}
            isGridView={isGridView}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
