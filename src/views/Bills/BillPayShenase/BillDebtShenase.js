import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./styles";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Submit from "../../../components/SubmitButton/SubmitButton";
import CropFreeIcon from "@material-ui/icons/CropFree";
import Input from "../../../components/Input/input";
import { checkdigit } from "../../../util/validators";
import axios from "axios";
import { Routes } from "../../../api/api";
import Snackbar from "@material-ui/core/Snackbar";
import Modal from "react-modal";
import Header from "../../../components/Header/Header";
import BillCard from "../../../components/BillCard/BillCard";
import ChargeWallet from "../../../components/ChargeWallet/ChargeWallet";

const customStyles = {
  content: {
    width: "100%",
    height: "92vh",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
  },
};
const BillPay = () => {
  const classes = styles();
  const [billId, setBillId] = useState("");
  const [payId, setPayId] = useState("");
  const [token, setToken] = useState("");
  const [billOk, setBillOk] = useState(true);
  const [billType, setBillType] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [serviceCode, setServiceCode] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [payIdWithZero, setPayIdWithZero] = useState("");
  const [billIdWithZero, setBillIdWithZero] = useState("");
  const [isErrorSet, setIsErrorSet] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [payModal, setPayModal] = useState(false);
  const [chackWallet, setCheckWallet] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const finalCheck = async () => {
    //  const { billId, payId, token } = this.state;
    let fnl = checkdigit(billId, payId);
    let servCode = fnl[3];
    let compCode = fnl[4];
    // this.setState({ billOk: fnl[0] });
    setBillOk(fnl[0]);
    //  this.setState({ billType: fnl[1] });
    setBillType(fnl[1]);
    // this.setState({ billAmount: fnl[2] });
    setBillAmount(fnl[2]);
    //  this.setState({ serviceCode: fnl[3] });
    setServiceCode(fnl[3]);
    // this.setState({ companyCode: fnl[4] });
    setCompanyCode(fnl[4]);
    // this.setState({ payIdWithZero: fnl[5] });
    setPayIdWithZero(fnl[5]);
    // this.setState({ billIdWithZero: fnl[6] });
    setBillIdWithZero(fnl[6]);
    await axios
      .get(`${Routes.BillCompanyCheck}${token}/${compCode}/${servCode}`)
      .then((res) => {
        if (res.data.value.response === true && fnl[0] === true) {
          setIsErrorSet(false);
          setPayModal(true);
          //   this.setState({ payModalVisible: true });
        } else if (fnl[0] === false) {
          setTextSnack("شناسه قبض یا پرداخت اشتباه است!");
          setSnackBar(true);
        } else {
          setTextSnack("قبض مورد نظر پشتیبانی نمی شود!");
          setSnackBar(true);
        }
      })
      .catch((err) => {
        console.log("company error", err.response);
        setTextSnack("خطا در ارتباط با سرور");
        setSnackBar(true);
      });
  };

  const paymentHandler = async () => {
    setIsErrorSet(false);
    //check if we the wallet have suffient amount
    axios
      .post(
        `${Routes.PayInquiy}`,
        { BillId: billIdWithZero, PaymentId: payIdWithZero },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log("res", res.data.message);
        if (res.data.message === "قبض مورد نظر قبلا پرداخت شده است") {
          alert(res.data.message + "!");
          setBillId("");
          setPayId("");
          // this.setState({billId: ''});
          // this.setState({payId: ''});
        } else {
          // this.setState({isPaymentInit: true});
          // this.setState({checkWallet: true});
          setCheckWallet(true);
        }
      })
      .catch((err) => {
        // this.setState({ isPaymentInit: false });
        console.log(err);
      });
  };
  return (
    <div className={classes.container}>
      <div style={{ width: "70%", textAlign: "right" }}>
        <Input
          label="شناسه قبض"
          value={billId}
          change={(e) => setBillId(e.target.value)}
          type="tel"
        />
      </div>
      <div style={{ width: "70%", textAlign: "right" }}>
        <Input
          label="شناسه پرداخت"
          value={payId}
          change={(e) => setPayId(e.target.value)}
          type="tel"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <Submit
          text="ادامه"
          disable={!payId || !billId}
          click={() => finalCheck()}
        />
      </div>
      <div className={classes.scanBtn}>
        <CropFreeIcon />
        <p style={{ margin: 0, fontFamily: "IRANSansMobile" }}>اسکن با بارکد</p>
      </div>
      <Modal
        isOpen={payModal}
        onRequestClose={() => setPayModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header text="پرداخت قبض" click={() => setPayModal(false)} />
          <div
            style={{
              width: "80%",
              paddingTop: 70,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BillCard
              BillTitle={billType}
              BillId={billId}
              BillAmount={billAmount}
            />
            <div
              style={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                boxShadow: "0px 2px 14px -4px gray",
                boxSizing: "border-box",
                padding: "20px 10px",
                display: "flex",
                justifyContent: "center",
                paddingTop: 0,
                width: "100%",
              }}
            >
              <Submit text="تایید و پرداخت" click={paymentHandler} />
            </div>
          </div>
        </div>
      </Modal>
      {chackWallet ? (
        <ChargeWallet
          token={token}
          amount={billAmount}
          payment={console.log("peyment")}
          close={() => {
            setCheckWallet(false);
          }}
        />
      ) : null}
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
    </div>
  );
};

export default BillPay;
