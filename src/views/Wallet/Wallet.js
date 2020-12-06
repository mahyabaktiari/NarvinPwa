import React, { useEffect, useState } from "react";
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
} from "../../util/validators";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { Routes } from "../../api/api";
import { NavigateBefore } from "@material-ui/icons";
import NewWindow from "react-new-window";
import ShowUrl from "../../components/Url";
import { usePayDispatch, usePayState } from "../../context/payContex";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  let myWindow;

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
  var backButtonPrevented = false;
  function popStateListener(event) {
    if (backButtonPrevented === false) {
      window.history.pushState(null, "gfgfg", window.location.href);
      console.log("Back Button Prevented");
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  window.addEventListener("popstate", popStateListener);

  console.log("walletBalance", walletBalance);
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
      console.log(amount, "low");
      setLoading(false);
      // this.setState({loading: false});
      // this.setState({isSuffient: false});
      setTextSnack("مبلغ شارژ نباید کمتر از 1،000 ریال باشد");
      setSnackBar(true);
    } else if (Number(amount) > 500000000) {
      console.log(amount, "more");
      setTextSnack("مبلغ شارژ نباید بیشتر از 500،000،000 میلیون ریال باشد");
      setSnackBar(true);
      setLoading(false);
    } else {
      console.log("ok");
      console.log(token);
      console.log("amount", amount);
      await axios
        .post(
          `https://cors-anywhere.herokuapp.com/${Routes.walletCharge}`,
          { Amount: amount },
          { headers: { token: token, "X-Requested-With": "XMLHttpRequest" } }
        )
        .then((res) => {
          console.log(res);
          //await this.setState({loading: false});
          //await this.setState({EnteredAmount: ''});
          // //await this.setState({isSuffient: true});
          const response = res.data.value.response;
          const paymentGatewayId = res.data.value.paymentGatewayId;
          console.log(`${Routes.Ipg}/?${res.data.value.response.sign}`);
          let url;
          paymentGatewayId === "2"
            ? (url = `${Routes.Ipg}/?${res.data.value.response.sign}`)
            : (url = `${Routes.IpgPasargad}/?${response.merchantCode}&${response.terminalCode}&${response.amount}&${response.redirectAddress}&${response.timeStamp}&${response.invoiceNumber}&${response.invoiceDate}&${response.action}&${response.sign}`);
          openWin(url);
        })
        .catch((err) => {
          console.log(err);
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
    <React.Fragment>
      <Header text="کیف پول" click={() => props.history.goBack()} />
      <div className={classes.container}>
        <p style={{ direction: "rtl" }}>موجودی فعلی(ریال)</p>
        <div className={classes.balance}>{walletBalance} ریال</div>
        <p>مبلغ دلخواه خود را جهت شارژ کیف پول وارد نمایید</p>
        <p style={{ direction: "rtl" }}>مبلغ شارژ (ریال)</p>
        <input
          className={classes.input}
          type="text"
          defaultValue={enterAmount}
          value={ToRial(enterAmount)}
          onChange={(e) => setEnterAmount(e.target.value)}
        />
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
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
      <NavigationBottom item="PROFILE" />
    </React.Fragment>
  );
};

export default Wallet;
