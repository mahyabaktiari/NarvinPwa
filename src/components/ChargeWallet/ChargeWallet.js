import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import useStyle from "./style";
import axios from "axios";
import { Routes } from "../../api/api";
import { moneySplitter, ToRial, fixNumbers } from "../../util/validators";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const [check, setCheck] = useState();
  const [infoIPG, setInfoIPG] = useState("");
  let myWindow;
  const formRef = useRef();
  useEffect(() => {
    wallet();
  }, []);
  useEffect(() => {
    if (infoIPG) {
      myWindow = window.open(formRef.current.submit(), "_self");
      setCheck(true);
    }
  }, [infoIPG]);
  const wallet = () => {
    axios
      .get(`${Routes.walletBalance}`, { headers: { token: props.token } })
      .then((res) => {
        setWalletBalance(res.data.value.response);
        let wallet = res.data.value.response;
        setInputAmount((amount - wallet).toString());
        setAmountCharge(amount - wallet);
        if (res.data.value.response >= amount) {
          payment();
        } else {
          setShowModal(true);
        }
      })
      .catch((err) => {
        setShowModal(false);
        alert("خطا در دریافت مقدار موجودی کیف پول! مجددا تلاش نمایید.");
      });
  };

  function paymentIPG() {
    props.openBackDrop();

    axios
      .post(
        `${Routes.walletCharge}`,
        { Amount: amountCharge, PWA: true },
        {
          headers: { token: props.token },
        }
      )
      .then(async (res) => {
        const response = res.data.value.response;
        const paymentGatewayId = res.data.value.paymentGatewayId;
        // let url;
        // paymentGatewayId === "2"
        //   ? (url = `${Routes.Ipg}/?${res.data.value.response.sign}`)
        //   : (url = `${Routes.IpgPasargad}/?${response.merchantCode}&${response.terminalCode}&${response.amount}&${response.redirectAddress}&${response.timeStamp}&${response.invoiceNumber}&${response.invoiceDate}&${response.action}&${response.sign}`);
        // openWin(url);
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
        alert("خطای اتصال به درگاه");
        props.closeBackDrop();
      });
  }

  useEffect(() => {
    if (check) {
      setTimeout(() => {
        myWindow = "";
        interval();
      }, 3000);
    }
  }, [check]);

  const interval = () => {
    setCheck(false);
    const interv = setInterval(() => {
      if (!myWindow) {
        // backIpg();
        props.backPayment();
        return clearInterval(interv);
      }
    }, 2000);
  };

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
          <span>
            {" "}
            {walletBalance ? ToRial(walletBalance.toString()) : "0"} ریال
          </span>
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
            maxLength={11}
            onChange={(text) => {
              setAmountCharge(fixNumbers(text.target.value));
              setInputAmount(ToRial(fixNumbers(text.target.value)));
            }}
            value={InputAmount ? ToRial(InputAmount) : null}
            inputMode="numeric"
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
        {/* <input type="hidden" type="text" /> */}
      </form>
      <Backdrop className={classes.backdrop} open={props.backDrop}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Modal>
  );
};

export default ChargeWallet;
