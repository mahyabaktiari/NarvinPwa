import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes } from "../../api/api";
import ProductMap from "./ProductMap";
import CircularProgress from "@material-ui/core/CircularProgress";
const ProductGroups = (props) => {
  const [products, setProducts] = React.useState([]);

  let { productGroupInfo, token } = props;
  useEffect(() => {
    axios
      .get(`${Routes.getAllProductsofGroup}/${productGroupInfo.id}`, {
        headers: { token: token },
      })
      .then((res) => {
        let data = res.data.value.response.Product;
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <>
      {products.length !== 0 ? (
        products.map((prod, index) => {
          return (
            <div style={{ width: "80%" }} key={index}>
              <ProductMap productInfo={prod} token={token} />
            </div>
          );
        })
      ) : (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <CircularProgress color="secondary" style={{ marginTop: "13%" }} />
        </div>
      )}
    </>
  );
};

export default ProductGroups;
