import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import style from "./styles";
import Iframe from "react-iframe";
import {
  ToRial,
  getWalletBalanceAsync,
  splitInfo,
  moneySplitter,
  addMerchant,
} from "../../util/validators";
import axios from "axios";
import { Routes } from "../../api/api";
import Snackbar from "@material-ui/core/Snackbar";
import RefundInfoUser from "../../components/RefundInfoUser/RefundInfoUser";
import RefundInfoStore from "../../components/RefundInfoStore/RefundInfoStore";

const Refound = (props) => {
  const classes = style();
  const [token, setToken] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [loading, setLoading] = useState(true);
  const [storeRefund, setStoreRefund] = useState("");
  const [userRefund, setUserRefund] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  console.log(walletBalance);
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    getWalletBalanceAsync(tokenStorage).then((res) => {
      setWalletBalance(res);
    });
    getRefunds(tokenStorage);
  }, []);
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
      console.log("Back Button Prevented");
      backButtonPrevented = true;
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  window.addEventListener("popstate", popStateListener);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };
  const getRefunds = (token) => {
    setLoading(true);
    axios
      .get(`${Routes.getRefunds}`, { headers: { token: token } })
      .then((res) => {
        console.log(res);
        let data = res.data.value.response;
        let personal = res.data.value.personal;
        console.log("data", data, "personal : ", personal);
        setStoreRefund(data);
        setUserRefund(personal);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        setTextSnack("خطا در بازیابی اطلاعات فروشگاه!");
        setSnackBar(true);
      });
  };
  return (
    <div style={{ paddingTop: 80 }}>
      <Header text="دریافت وجه" click={() => props.history.push("/profile")} />
      <div className={classes.balance}>موجودی فعلی: {walletBalance} ریال</div>
      {userRefund.length !== 0 &&
        userRefund.map((refund) => {
          return (
            <div key={refund.merchantId}>
              <RefundInfoUser
                name={refund.storeName}
                merchantId={refund.merchantId}
                amount={refund.amount}
                iban={refund.ibanNumber}
                token={token}
                getRefunds={getRefunds}
                //nav={props.navigation}
              />
            </div>
          );
        })}
      {storeRefund.length !== 0 &&
        storeRefund.map((store) => {
          return (
            <div key={store.merchantId}>
              <RefundInfoStore
                storeName={store.storeName}
                storeLogo={store.storeLogo}
                merchantId={store.merchantId}
                iban={store.ibanNumber}
                refundAmount={store.amount}
                token={token}
                getRefunds={getRefunds}
              />
            </div>
          );
        })}
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
      <NavigationBottom item="PROFILE" />
    </div>
  );
};

export default Refound;
