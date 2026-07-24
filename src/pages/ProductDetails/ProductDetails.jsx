import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { paginationItems } from "../../constants";

const ProductDetails = () => {
  const location = useLocation();
  const { title } = useParams();
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (location.state?.item) {
      setProductInfo(location.state.item);
    } else {
      // Fallback lookup by param or default to first product
      const found = paginationItems.find(
        (p) => String(p.productName).toLowerCase().split(" ").join("") === title
      );
      setProductInfo(found || paginationItems[0]);
    }
  }, [location, title]);

  if (!productInfo) {
    return (
      <div className="max-w-container mx-auto px-4 py-20 text-center text-primeColor font-semibold">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto border-b border-gray-200">
      <div className="max-w-container mx-auto px-4 pb-20">
        <Breadcrumbs title={productInfo.productName} />
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
          <div className="xl:col-span-1 border-r border-gray-100 pr-4 hidden xl:block">
            <ProductsOnSale />
          </div>

          <div className="xl:col-span-2 flex items-center justify-center bg-gray-50 rounded-xl p-6 border border-gray-100">
            <img
              className="max-h-96 object-contain rounded-lg shadow-xs hover:scale-105 transition-transform duration-500"
              src={productInfo.img}
              alt={productInfo.productName}
            />
          </div>

          <div className="md:col-span-2 xl:col-span-3 flex flex-col justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
