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
  const [back, setBack] = useState(false);

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
  window.onpopstate = () => {
    setBack(true);
  };
  useEffect(() => {
    back ? popStateListener() : console.log("false");
  }, [back]);
  var backButtonPrevented = false;

  function popStateListener(event) {
    if (backButtonPrevented === false) {
      window.history.pushState(
        { name: "browserBack" },
        "on browser back click",
        window.location.href
      );
      backButtonPrevented = true;
      setBack(false);
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }
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
        let data = res.data.value.response;
        let personal = res.data.value.personal;
        setStoreRefund(data);
        setUserRefund(personal);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setTextSnack("خطا در بازیابی اطلاعات فروشگاه!");
        setSnackBar(true);
      });
  };

  return (
    <div style={{ paddingTop: 10 }}>
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
