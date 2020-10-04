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

const Wallet = (props) => {
  const classes = styles();
  const [walletBalance, setWalletBalance] = useState("");
  const [enterAmount, setEnterAmount] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [token, setToken] = useState("");
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    getWalletBalanceAsync(tokenStorage).then((res) => {
      setWalletBalance(res);
    });
  }, []);

  console.log("walletBalance", walletBalance);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };
  const handlSubmit = async () => {
    let amount = enterAmount.replace(/,/g, "").toString();
    if (Number(amount) < 1000) {
      console.log(amount, "low");
      // this.setState({loading: false});
      // this.setState({isSuffient: false});
      // Toast.show('مبلغ شارژ نباید کمتر از 1،000 ریال باشد', {
      //   position: Toast.position.center,
      //   containerStyle: {backgroundColor: 'orange'},
      //   textStyle: {fontFamily: 'IRANSansMobile', color: 'white'},
      // });
    } else if (Number(amount) > 500000000) {
      console.log(amount, "more");
      // Toast.show('مبلغ شارژ نباید بیشتر از 500،000،000 میلیون ریال باشد', {
      //   position: Toast.position.center,
      //   containerStyle: {backgroundColor: 'orange'},
      //   textStyle: {fontFamily: 'IRANSansMobile', color: 'white'},
      // });
      // this.setState({loading: false});
    } else {
      console.log("ok");
      console.log(token);
      console.log("amount", amount);
      await axios
        .post(
          `${Routes.walletCharge}`,
          { Amount: amount },
          { headers: { token: token } }
        )
        .then((res) => {
          console.log(res);
          //await this.setState({loading: false});
          //await this.setState({EnteredAmount: ''});
          // //await this.setState({isSuffient: true});
          // const response = res.data.value.response;
          // const paymentGatewayId = res.data.value.paymentGatewayId;
          // console.log(`${Routes.Ipg}/?${res.data.value.response.sign}`);
          // paymentGatewayId === "2"
          //   ? (window.location.href = `${Routes.Ipg}/?${res.data.value.response.sign}`)
          //   : (window.location.href = `${Routes.IpgPasargad}/?${response.merchantCode}&${response.terminalCode}&${response.amount}&${response.redirectAddress}&${response.timeStamp}&${response.invoiceNumber}&${response.invoiceDate}&${response.action}&${response.sign}`);
        })
        .catch((err) => {
          console.log(err);
          //   this.setState({loading: false});
        });
    }
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
