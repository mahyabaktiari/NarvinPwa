import React, { useEffect, useState } from "react";
import { moneySplitter } from "../../util/validators";
import { useAppDispatch, useAppContext } from "../../context/appContext";
import axios from "axios";
import { Routes } from "../../api/api";
import Submit from "../SubmitButton/SubmitButton";

const ProductCard = (props) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();

  const getDetail = () => {
    axios
      .get(`${Routes.getProdById}/${props.productId}`, {
        headers: { token: props.token },
      })
      .then((res) => {
        let status = res.data.responseCode;
        if (status === 200) {
          let details = res.data.value.response;
          let images = res.data.value.response.productGallery;
          let gallery = images.map(({ imageUrl }) => imageUrl);
          dispatch({ type: "DETAIL_MODAL_OPEN", payload: details });
          dispatch({ type: "STORE_GALLERY", payload: gallery });
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.data.message);
      });
  };
  return (
    <div style={styles.container}>
      <img
        style={{
          width: "50%",
          alignSelf: "center",
          marginBottom: "5%",
        }}
        src={props.image}
      />
      <span style={styles.txt}>برند: {props.brand}</span>
      <span style={styles.txt}>مدل: {props.model}</span>
      <span style={styles.txt}>قیمت: {moneySplitter(props.price)} ریال</span>
      <span onClick={getDetail}>
        <span
          style={{
            fontFamily: "IRANSansMobile",
            color: "#610c34",
            fontSize: 16,
            marginTop: 5,
          }}
        >
          جزییات بیشتر...
        </span>
      </span>
      <div
        style={{
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: 5,
        }}
      >
        <div style={{ marginRight: "auto", marginLeft: "auto", marginTop: 20 }}>
          <Submit
            text="ادامه"
            click={() => {
              dispatch({
                type: "BUY_PRODUCT_START",
                id: props.productId,
                seller: props.seller,
                quantity: quantity,
                price: props.price,
                brand: props.brand,
                model: props.model,
                merchantId: props.merchantId,
                startPay: true,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    // alignItems: "center",
    direction: "rtl",
    padding: "5%",
    //  width: "60%",
    // height: hp(50),
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    // borderRightColor: '#D8DAD3',
    // borderRightWidth: 1.5,
    borderRight: "1.5px solid #D8DAD3",
    boxSizing: "border-box",
  },
  txt: {
    fontFamily: "IRANSansMobile",
    paddingHorizontal: "1%",
    // fontSize: Dimensions.get('window').width.toFixed() ? wp(3) : null,
    color: "#CD0448",
    fontSize: 14,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    alignSelf: "center",
    padding: 5,
    justifyContent: "space-between",
    marginTop: "5%",
    marginBottom: "5%",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
  },
};

export default ProductCard;
