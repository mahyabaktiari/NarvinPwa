import React from "react";
import ProductCard from "./ProductCard";

const ProductMap = (props) => {
  let { productInfo, token } = props;

  return (
    <div style={{ width: "100%" }}>
      <ProductCard
        productId={productInfo.Id}
        seller={productInfo.StoreName}
        merchantId={productInfo.MerchantId}
        image={productInfo.ImageUrl}
        brand={productInfo.Name}
        model={productInfo.Model}
        price={productInfo.SalePrice}
        token={token}
      />
    </div>
  );
};

export default ProductMap;
