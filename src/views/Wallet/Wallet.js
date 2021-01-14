import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import styles from "./styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {
  ToRial,
  getWalletBalanceAsync,
  splitInfo,
  moneySplitter,
  addMerchant,
  fixNumbers,
} from "../../util/validators";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { Routes } from "../../api/api";
import { NavigateBefore } from "@material-ui/icons";
import NewWindow from "react-new-window";
import ShowUrl from "../../components/Url";
import { usePayDispatch, usePayState } from "../../context/payContex";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route } from "react-router-dom";
import { createHashHistory } from "history";
// import { withRouter } from "react-router-dom";
import Input from "../../components/Input/input";
const Wallet = (props) => {
  const classes = styles();
  const [walletBalance, setWalletBalance] = useState("");
  const [enterAmount, setEnterAmount] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [token, setToken] = useState("");
  const [pay, setPay] = useState(false);
  const [url, setUrl] = useState("");
  const [windowClose, setWindowClose] = useState(false);
  const dispatch = usePayDispatch();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoIPG, setInfoIPG] = useState("");
  let myWindow;
  const formRef = useRef();
  const [back, setBack] = useState(false);

  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    getWalletBalanceAsync(tokenStorage).then((res) => {
      setWalletBalance(res);
    });
  }, []);

  useEffect(() => {
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, []);
  useEffect(() => {
    if (infoIPG) {
      myWindow = window.open(formRef.current.submit(), "_self");
      setLoading(false);
      setCheck(true);
    }
  }, [infoIPG]);
  // useEffect(() => {
  //   var backButtonPrevented = false;
  //   window.addEventListener("popstate", popStateListener);
  // });

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
  const openWin = (url) => {
    myWindow = window.open(`${url}`, "_self");
    setLoading(false);

    setCheck(true);
  };

  useEffect(() => {
    check
      ? setTimeout(() => {
          myWindow = "";
          interval();
        }, 3000)
      : console.log(check);
  }, [check]);

  const interval = () => {
    setCheck(false);
    const interv = setInterval(() => {
      if (!myWindow) {
        backIpg();
        return clearInterval(interv);
      }
    }, 2000);
  };
  const handlSubmit = async () => {
    setLoading(true);
    let amount = enterAmount.replace(/,/g, "").toString();
    if (Number(amount) < 1000) {
      setLoading(false);
      setTextSnack("مبلغ شارژ نباید کمتر از 1،000 ریال باشد");
      setSnackBar(true);
    } else if (Number(amount) > 500000000) {
      setTextSnack("مبلغ شارژ نباید بیشتر از 500،000،000 میلیون ریال باشد");
      setSnackBar(true);
      setLoading(false);
    } else {
      await axios
        .post(
          `${Routes.walletCharge}`,
          { Amount: amount, PWA: true },
          { headers: { token: token } }
        )
        .then((res) => {
          const response = res.data.value.response;
          const paymentGatewayId = res.data.value.paymentGatewayId;
          let url;
          setInfoIPG({
            sign: response.sign,
            merchantCode: response.merchantCode,
            terminalCode: response.terminalCode,
            amount: response.amount,
            redirectAddress: response.redirectAddress,
            timeStamp: response.timeStamp,
            invoiceNumber: response.invoiceNumber,
            invoiceDate: response.invoiceDate,
            action: response.action,
          });
        })
        .catch((err) => {
          setTextSnack("خطا در اتصال به درگاه");
          setSnackBar(true);
          setLoading(false);
        });
    }
  };

  const backIpg = () => {
    getWalletBalanceAsync(token)
      .then((res) => {
        setWalletBalance(res);
        setEnterAmount("");
      })
      .catch((err) => {
        alert("error");
      });
  };

  return (
    <div>
      <Header text="کیف پول" click={() => props.history.push("./profile")} />
      <div className={classes.container}>
        <p style={{ direction: "rtl" }}>موجودی فعلی(ریال)</p>
        <div className={classes.balance}>{walletBalance} ریال</div>
        <span>مبلغ دلخواه خود را جهت شارژ کیف پول وارد نمایید</span>
        <span style={{ direction: "rtl", marginTop: 10 }}>
          مبلغ شارژ (ریال)
        </span>
        <div style={{ width: "70%", marginTop: -10 }}>
          <Input
            value={ToRial(enterAmount)}
            change={(e) => setEnterAmount(fixNumbers(e.target.value))}
            maxLength={11}
            type="numeric"
          />
        </div>

        {loading ? (
          <CircularProgress color="secondary" style={{ marginTop: 40 }} />
        ) : (
          <div
            className={!enterAmount ? classes.submit : classes.submit2}
            onClick={() => handlSubmit()}
          >
            <AddRoundedIcon
              style={{
                width: 30,
                height: 30,
                paddingRight: 5,
                fontWeight: "bold",
              }}
            />
            افزایش موجودی
          </div>
        )}
      </div>
      <form
        ref={formRef}
        action="https://pep.shaparak.ir/gateway.aspx"
        method="post"
      >
        <input
          type="hidden"
          name="merchantCode"
          id="merchantCode"
          value={infoIPG.merchantCode}
        />
        <input
          type="hidden"
          name="terminalCode"
          id="terminalCode"
          value={infoIPG.terminalCode}
        />
        <input type="hidden" name="amount" id="amount" value={infoIPG.amount} />
        <input
          type="hidden"
          name="redirectAddress"
          id="redirectAddress"
          value={infoIPG.redirectAddress}
        />
        <input
          type="hidden"
          name="invoiceNumber"
          id="invoiceNumber"
          value={infoIPG.invoiceNumber}
        />
        <input
          type="hidden"
          name="invoiceDate"
          id="invoiceDate"
          value={infoIPG.invoiceDate}
        />
        <input type="hidden" name="action" id="action" value={infoIPG.action} />
        <input type="hidden" name="sign" id="sign" value={infoIPG.sign} />
        <input
          type="hidden"
          name="timeStamp"
          id="timeStamp"
          value={infoIPG.timeStamp}
        />
      </form>
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

export default Wallet;
