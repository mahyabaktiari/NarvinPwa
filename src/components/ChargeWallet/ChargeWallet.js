import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import useStyle from "./style";
import axios from "axios";
import { Routes } from "../../api/api";
import { moneySplitter, ToRial } from "../../util/validators";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";

const ChargeWallet = (props) => {
  const classes = useStyle();
  const [pointDetails, setPointDetails] = React.useState([]);
  const [showModal, setShowModal] = useState(false);
  const customStyles = {
    content: {
      width: "90%",
      height: 290,
      top: "20vh",
      bottom: 0,
      right: 0,
      left: "5%",
      padding: 0,
      zIndex: 10000,
      borderRadius: 15,
      backgroundColor: "#ddd",
      border: "none",
    },
  };

  const payment = props.payment;
  const amount = props.amount;
  const [modal, setModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const [amountCharge, setAmountCharge] = useState(amount - walletBalance);
  const [InputAmount, setInputAmount] = useState();
  console.log(InputAmount);

  useEffect(() => {
    wallet();
  }, []);

  const wallet = () => {
    console.log("wallet");
    axios
      .get(`${Routes.walletBalance}`, { headers: { token: props.token } })
      .then((res) => {
        console.log("RES", res.data.value.response, props.amount);
        setWalletBalance(res.data.value.response);
        let wallet = res.data.value.response;
        console.log("amount : ", amount, "Wallet : ", wallet);
        setInputAmount((amount - wallet).toString());
        setAmountCharge(amount - wallet);
        if (res.data.value.response >= amount) {
          payment();
        } else {
          setShowModal(true);
        }
      })
      .catch((err) => {
        alert("خطا در دریافت مقدار موجودی کیف پول! مجددا تلاش نمایید.");
      });
  };

  function paymentIPG() {
    console.log(props.token, amountCharge);
    axios
      .post(
        `${Routes.walletCharge}`,
        { Amount: amountCharge },
        { headers: { token: props.token } }
      )
      .then(async (res) => {
        console.log(res);
        const response = res.data.value.response;
        console.log(response);
        const paymentGatewayId = res.data.value.paymentGatewayId;
        console.log(`${Routes.IpgPasargad}/?${response.merchantCode}&${response.terminalCode}&${response.amount}&
                        ${response.redirectAddress}&${response.timeStamp}&${response.invoiceNumber}&${response.invoiceDate}&${response.action}
                        &${response.sign}`);
        paymentGatewayId === "2"
          ? window.open(`${Routes.Ipg}/?${res.data.value.response.sign}`)
          : window.open(
              `${Routes.IpgPasargad}/?${response.merchantCode}&${response.terminalCode}&${response.amount}&${response.redirectAddress}&${response.timeStamp}&${response.invoiceNumber}&${response.invoiceDate}&${response.action}&${response.sign}`
            );
      });
  }
  return (
    <Modal
      isOpen={showModal}
      overlayClassName={classes.myoverlay}
      onRequestClose={() => {
        setShowModal(false);
        props.close();
      }}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            backgroundColor: "#CD0448",
            borderRadius: 5,
            padding: 10,
            marginTop: 15,
            textAlign: "center",
            direction: "rtl",
          }}
        >
          <span
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "IRANSansMobile",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            موجودی شما کافی نیست!
          </span>
        </div>
        <div
          style={{
            width: "80%",
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            direction: "rtl",
            fontFamily: "IRANSansMobile",
            fontSize: "0.85rem",
          }}
        >
          <span>مبلغ تراکنش: </span>
          <span> {ToRial(amount.toString())} ریال</span>
        </div>
        <div
          style={{
            width: "80%",
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            direction: "rtl",
            fontFamily: "IRANSansMobile",
            fontSize: "0.85rem",
          }}
        >
          <span> موجودی کیف پول: </span>
          <span> {ToRial(walletBalance.toString())} ریال</span>
        </div>
        <div
          style={{
            width: "80%",
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            direction: "rtl",
            fontFamily: "IRANSansMobile",
            fontSize: "0.85rem",
            position: "relative",
          }}
        >
          <span
            style={{
              direction: "rtl",
              fontFamily: "IRANSansMobile",
            }}
          >
            مبلغ قابل شارژ:{" "}
          </span>
          <input
            type="text"
            className={classes.input}
            // value={
            //   amount === 0 || amount == null ? "" : ToRial(amount.toString())
            // }
            // onChange={(val) => setAmount(val.target.value)}

            maxLength={11}
            onChange={(text) => {
              setAmountCharge(text.target.value);
              setInputAmount(ToRial(text.target.value));
            }}
            value={InputAmount ? ToRial(InputAmount) : null}
          />
          <span
            style={{
              position: "absolute",
              top: 50,
              left: "8%",
              zIndex: 10,
              color: "gray",
              fontFamily: "IRANSansMobile",
              fontSize: "0.7rem",
            }}
          >
            ریال
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            marginTop: 10,
            direction: "rtl",
          }}
        >
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "45%",
              height: 40,
              backgroundColor: amountCharge ? "#610c34" : "gray",
              borderRadius: 5,
              color: "white",
              fontFamily: "IRANSansMobile",
              fontSize: "0.8rem",
            }}
            onClick={() => paymentIPG()}
            disabled={!amountCharge}
          >
            <span>تایید و واریز</span>
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "45%",
              height: 40,
              backgroundColor: "#610c34",
              borderRadius: 5,
              color: "white",
              fontFamily: "IRANSansMobile",
              fontSize: "0.8rem",
            }}
            onClick={() => props.close()}
          >
            <span>انصراف</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChargeWallet;
