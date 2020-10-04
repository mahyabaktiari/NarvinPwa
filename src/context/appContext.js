import React, { useReducer, createContext, useContext } from "react";

const appContext = createContext();
const appDispatch = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "REFUND_AMOUT_SET":
      return { ...state, refundAmount: action.payload };
    case "GET_WALLET":
      return { ...state, refundAmount: "", wallet: action.payload };
    case "DETAIL_MODAL_OPEN":
      return {
        ...state,
        productDetailModal: true,
        productDetail: action.payload,
      };
    case "DETAIL_MODAL_CLOSE":
      return { ...state, productDetailModal: false };
    case "CALCULATE_PRICE_PLUS":
      return {
        ...state,
        productQuantity: state.productQuantity + 1,
        // totalPrice: state.productQuantity * state.productPrice,
      };
    case "CALCULATE_PRICE_MINUS":
      return {
        ...state,
        productQuantity: state.productQuantity - 1,
        // totalPrice: state.productQuantity * state.productPrice,
      };
    case "CALCULATE_PRICE_FINAL":
      return {
        ...state,
        totalPrice: state.productQuantity * state.productPrice,
      };
    case "BUY_PRODUCT_START":
      return {
        ...state,
        productBuyModal: true,
        productMerchantId: action.merchantId,
        productSeller: action.seller,
        productId: action.id,
        productQuantity: action.quantity,
        productPrice: action.price,
        productBrand: action.brand,
        productModel: action.model,
      };
    case "BUY_PRODUCT_SUCCESS":
      return {
        ...state,
        showProductReceipt: true,
        productBuyModal: false,
      };
    case "BUY_PRODUCT_REJECT":
      return {
        ...state,
        productBuyModal: false,
      };
    case "SET_DISCOUNT":
      if (state.productQuantity <= action.discountInfo.maxNumber) {
        return {
          ...state,
          totalPrice:
            state.totalPrice -
            action.discountInfo.discountPrice * state.productQuantity,
        };
      } else {
        return {
          ...state,
          totalPrice:
            state.productPrice * state.productQuantity -
            action.discountInfo.discountPrice * action.discountInfo.maxNumber,
        };
      }
    case "BACK_TO_INIT":
      return {
        ...state,
        showProductReceipt: false,
      };
    case "STORE_GALLERY":
      return {
        ...state,
        productGallery: action.payload,
      };
    default:
      return state;
  }
}
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    refundAmount: 0,
    wallet: 0,
    productDetailModal: false,
    productBuyModal: false,
    productDetail: {},
    productGallery: [],
    productId: null,
    productQuantity: 0,
    productPrice: 0,
    totalPrice: 0,
    showProductReceipt: false,
    productModel: "",
    productBrand: "",
    productSeller: "",
    productMerchantId: "",
  });
  return (
    <appContext.Provider value={state}>
      <appDispatch.Provider value={dispatch}>{children}</appDispatch.Provider>
    </appContext.Provider>
  );
}
function useAppContext() {
  const context = useContext(appContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
function useAppDispatch() {
  const context = useContext(appDispatch);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }
  return context;
}

export { AppProvider, useAppContext, useAppDispatch };
