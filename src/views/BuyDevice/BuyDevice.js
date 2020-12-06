import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import axios from "axios";
import { Routes } from "../../api/api";
import Snackbar from "@material-ui/core/Snackbar";
import useStyle from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProductGroups from "../../components/Product/ProductGroups";
import { useAppContext, useAppDispatch } from "../../context/appContext";
import ProductDetail from "../../components/Product/ProductDetail";
import Modal from "react-modal";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { moneySplitter, fil_zro } from "../../util/validators";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import Input from "../../components/Input/input";
import Submit from "../../components/SubmitButton/SubmitButton";
import PopUp from "../../components/PopUpModal/PopUpModal";
import ChargeWallet from "../../components/ChargeWallet/ChargeWallet";
import Reciept from "../../components/Reciept/ProductReciept";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

const customStyles = {
  content: {
    width: "100%",
    height: "100vh",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
  },
};
const modalStyle = {
  content: {
    width: "90%",
    height: "fit-content",
    top: "23vh",
    bottom: 0,
    right: 0,
    left: "5%",
    padding: 0,
    border: "none",
    backgroundColor: "#eee",
  },
};
const BuyDevice = (props) => {
  const {
    productDetailModal,
    productSeller,
    productDetail,
    productBuyModal,
    productQuantity,
    productPrice,
    productId,
    showProductReceipt,
    productBrand,
    productModel,
    productMerchantId,
    totalPrice,
  } = useAppContext();
  console.log("totalPrice", totalPrice);
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const [token, setToken] = useState("");
  const [uniqId, setUniqId] = useState("");
  const [prodGroups, setProdGroups] = useState([]);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [discountIsValid, setDiscountIsValid] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [marketerId, setMarketerId] = useState("");
  const [payClick, setPayClick] = useState(false);
  const [checkWallet, setCheckWallet] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [tranDate, setTranDate] = useState("");
  const [backDrop, setBackDrop] = useState(false);

  console.log(discountCode, marketerId);
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    getProdGroups(tokenStorage);
    setUniqId(localStorage.getItem("DeviceUniqId"));
  }, []);

  useEffect(() => {
    dispatch({ type: "CALCULATE_PRICE_FINAL" });
    if (discountCode !== "") {
      applyDiscount();
    }
  }, [productQuantity]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const applyDiscount = () => {
    // setLoading(true);
    axios
      .get(`${Routes.Discount}/${discountCode}/${productId}`, {
        headers: { token: token },
      })
      .then((res) => {
        console.log(res);
        let status = res.data.responseCode;
        let dscinfo = res.data.value.response;
        if (status === 200) {
          //   setLoading(false);
          //  setLoading(false);
          setDiscountIsValid(true);
          return dispatch({ type: "SET_DISCOUNT", discountInfo: dscinfo });
        } else if (status === 424) {
          //  setLoading(false);
          setDiscountCode("");
          let error = res.data.message;
          setTextSnack(error);
          setSnackBar(true);
        } else if (status === 404) {
          // setLoading(false);
          setDiscountCode("");
          let error = res.data.message;
          setTextSnack(error);
          setSnackBar(true);
          // Toast.show(error, {
          //   position: Toast.position.center,
          //   containerStyle: {backgroundColor: 'red'},
          //   textStyle: {fontFamily: 'IRANSansMobile'},
          // });
        }
      })
      .catch((err) => {
        console.log(err.response);
        //  setLoading(false);
        setDiscountCode("");
        let error = err.response.data.message;
        setTextSnack(error);
        setSnackBar(true);
        // Toast.show(error, {
        //   position: Toast.position.center,
        //   containerStyle: { backgroundColor: "red" },
        //   textStyle: { fontFamily: "IRANSansMobile" },
        // });
      });
  };

  const PaymentHandle = () => {
    //  setLoading(true);
    console.log("paymentHandel");
    axios
      .post(
        `${Routes.purchaseProduct}`,
        {
          DeviceUniqId: uniqId,
          ProductId: productId,
          Count: productQuantity,
          MarketerId: marketerId === "" ? 0 : Number(marketerId),
          DiscountCode: discountCode,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log(res);
        let status = res.data.responseCode;
        if (status === 200) {
          setPayClick(false);
          setTrackingCode(res.data.value.trackingCode);
          setTranDate(res.data.value.response.creationJalaliDateTime);
          dispatch({ type: "BUY_PRODUCT_SUCCESS" });
          setCheckWallet(false);
          setBackDrop(false);
        } else if (status === 404) {
          setPayClick(false);
          setCheckWallet(false);
          setDiscountCode("");
          setDiscountIsValid(false);
          dispatch({ type: "BUY_PRODUCT_REJECT" });
          setTextSnack(res.data.message);
          setSnackBar(true);
          setBackDrop(false);
        } else {
          setPayClick(false);
          setDiscountCode("");
          setCheckWallet(false);
          setDiscountIsValid(false);
          dispatch({ type: "BUY_PRODUCT_REJECT" });
          setTextSnack(res.data.message);
          setSnackBar(true);
          setBackDrop(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setPayClick(false);
        setCheckWallet(false);
        setBackDrop(false);
        setDiscountCode("");
        setDiscountIsValid(false);
        dispatch({ type: "BUY_PRODUCT_REJECT" });
        setTextSnack(err.response.data.message);
        setSnackBar(true);
      });
  };

  const backPayment = () => {
    axios
      .get(`${Routes.walletBalance}`, { headers: { token: token } })
      .then((res) => {
        console.log(res);
        let status = res.data.responseCode;
        let walAmount = res.data.value.response;
        if (status === 200 && walAmount >= totalPrice) {
          PaymentHandle();
        } else {
          console.log("mojoodi kame");
          setBackDrop(false);
        }
      })
      .catch((err) => {
        setCheckWallet(false);
        setTextSnack("خطای سیستمی!");
        setSnackBar(true);
        setBackDrop(false);
      });
  };

  const getProdGroups = async (token) => {
    axios
      .get(`${Routes.getProductGroups}`, { headers: { token: token } })
      .then((res) => {
        console.log(res);
        let status = res.data.responseCode;
        if (status === 200) {
          let productGroups = res.data.value.response;
          setProdGroups(productGroups);
        }
        if (status === 424) {
          let error = res.data.message;
          // Toast.show(error, {
          //   position: Toast.position.center,
          //   containerStyle: {backgroundColor: 'red'},
          //   textStyle: {fontFamily: 'IRANSansMobile'},
          // });
        }
      })
      .catch((err) => {
        console.log(err.response);
        // Toast.show('خطای سیستمی', {
        //   position: Toast.position.center,
        //   containerStyle: {backgroundColor: 'red'},
        //   textStyle: {fontFamily: 'IRANSansMobile'},
        // });
      });
  };

  useEffect(() => {
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, []);
  var backButtonPrevented = false;
  function popStateListener(event) {
    if (backButtonPrevented === false) {
      window.history.pushState(null, "gfgfg", window.location.href);
      console.log("Back Button Prevented");
      backButtonPrevented = true;
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  window.addEventListener("popstate", popStateListener);
  return (
    <React.Fragment>
      <Header text="محصولات" click={() => props.history.push("/services")} />
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
      <div style={{ paddingTop: 57, paddingBottom: "11vh" }}>
        {prodGroups.length !== 0 ? (
          prodGroups.map((prodGp) => {
            return (
              <div style={{ width: "100%", overflowX: "hidden" }}>
                <div key={Math.random()} className={classes.headingMask}>
                  <span>{prodGp.title}</span>
                </div>
                <div
                  key={prodGp.id}
                  horizontal={true}
                  style={{
                    display: "-webkit-inline-box",
                    overflowX: "scroll",
                    fontFamily: "IRANSansMobile",
                    width: "100%",
                  }}
                >
                  <ProductGroups
                    key={prodGp.id}
                    productGroupInfo={prodGp}
                    token={token}
                  />
                </div>
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
      </div>
      <Modal
        style={customStyles}
        isOpen={productDetailModal}
        onRequestClose={() => dispatch({ type: "DETAIL_MODAL_CLOSE" })}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <Header
          text="جزئیات محصول"
          click={() => dispatch({ type: "DETAIL_MODAL_CLOSE" })}
        />
        <div style={{ paddingTop: 70 }}>
          {" "}
          <ProductDetail details={productDetail} />
        </div>
      </Modal>
      <Modal
        style={modalStyle}
        isOpen={productBuyModal}
        onRequestClose={() => {
          dispatch({ type: "BUY_PRODUCT_REJECT" });
          setDiscountCode("");
          setDiscountIsValid(false);
        }}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            direction: "rtl",
            padding: 10,
            boxSizing: "border-box",
            alignItems: "center",
          }}
        >
          <HighlightOffRoundedIcon
            style={{ color: "#CD0448", alignSelf: "flex-start" }}
            onClick={() => {
              dispatch({ type: "BUY_PRODUCT_REJECT" });
              setDiscountCode("");
              setDiscountIsValid(false);
            }}
          />
          <div
            style={{
              width: "90%",
              alignSelf: "center",
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 10,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "IRANSansMobile",
              fontSize: 14,
              marginTop: 10,
            }}
          >
            <span>قیمت پایه : {moneySplitter(productPrice)} ریال</span>
            <div
              style={{
                width: "50%",
                border: "1px solid gray",
                padding: 5,
                borderRadius: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "20px 0",
              }}
            >
              <button
                onClick={() => dispatch({ type: "CALCULATE_PRICE_PLUS" })}
                style={{ backgroundColor: "#fff", border: "none", padding: 0 }}
              >
                <AddCircleOutlineRoundedIcon />
              </button>
              <span>{productQuantity}</span>
              <button
                disabled={productQuantity <= 0}
                onClick={() => dispatch({ type: "CALCULATE_PRICE_MINUS" })}
                style={{ backgroundColor: "#fff", border: "none", padding: 0 }}
              >
                <RemoveCircleOutlineRoundedIcon />
                {/* <Icon name="minuscircleo" size={wp(6.5)} /> */}
              </button>
            </div>
            <span style={{ color: "green" }}>
              قابل پرداخت : {moneySplitter(totalPrice)} ریال
            </span>
          </div>
          <div style={{ width: "60%", alignSelf: "center", marginTop: 10 }}>
            <Input
              label="کد تخفیف (اختیاری)"
              disabled={productQuantity <= 0}
              value={discountCode}
              maxLength={8}
              change={(e) => setDiscountCode(e.target.value)}
            />
            <Input
              label="کد بازاریاب (اختیاری)"
              disabled={productQuantity <= 0}
              maxLength={8}
              type="tel"
              change={(e) => setMarketerId(e.target.value)}
            />
          </div>
          <Submit
            text="خرید"
            disable={productQuantity <= 0}
            click={() => setPayClick(true)}
          />
        </div>
      </Modal>
      <Modal
        style={customStyles}
        isOpen={showProductReceipt}
        onRequestClose={() => dispatch({ type: "BACK_TO_INIT" })}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <Reciept
            seller={productSeller}
            product={productBrand}
            model={productModel}
            quantity={productQuantity}
            merchantId={productMerchantId}
            amount={totalPrice}
            tranId={trackingCode}
            tranDate={tranDate}
          />

          <div
            style={{
              // position: "absolute",
              // top: "90vh",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",

              backgroundColor: "#610c34",
              padding: 10,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                padding: 10,
                color: "#fff",
                fontSize: "0.9rem",
                fontFamily: "IRANSansMobile",
                width: "40%",
                borderRadius: 8,
                textAlign: "center",
              }}
              onClick={() => dispatch({ type: "BACK_TO_INIT" })}
            >
              <span>بستن</span>
            </div>
            <div
              style={{
                backgroundColor: "lime",
                padding: 10,
                color: "#fff",
                fontSize: "0.9rem",
                fontFamily: "IRANSansMobile",
                width: "40%",
                borderRadius: 8,
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
              // onClick={() => shareReciept()}
            >
              <ShareOutlinedIcon style={{ color: "white" }} />
              <span>اشتراک گذاری</span>
            </div>
          </div>
        </div>
      </Modal>
      {checkWallet ? (
        <ChargeWallet
          token={token}
          amount={totalPrice}
          payment={() => PaymentHandle()}
          backPayment={backPayment}
          backDrop={backDrop}
          openBackDrop={() => setBackDrop(true)}
          closeBackDrop={() => setBackDrop(false)}
          close={() => {
            setCheckWallet(false);
          }}
        />
      ) : null}
      <PopUp
        iconType="QUESTION"
        show={payClick}
        closeModal={() => setPayClick(false)}
        text={`آیا جهت خرید محصول اطمینان دارید؟`}
        titleOne="انصراف"
        methodOne={() => setPayClick(false)}
        titleTwo="پرداخت"
        methodTwo={() => setCheckWallet(true)}
      />
      <NavigationBottom item="SERVISES" />
    </React.Fragment>
  );
};

export default BuyDevice;
