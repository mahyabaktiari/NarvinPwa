import React, { useEffect, useState, useRef } from "react";
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
import Reciept from "../../../components/Reciept/deptReciept";
import { moneySplitter, fil_zro } from "../../../util/validators";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import BarcodeReader from "react-barcode-reader";
import BarCodeScanner from "barcode-react-scanner";
import domtoimage from "dom-to-image";
import ShareBtn from "../../../components/ShareBtn/ShareBtn";
import CloseBtn from "../../../components/CloseBtn/CloseBtn";
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

const customStyles2 = {
  content: {
    width: "100%",
    height: "100vh",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
    backgroundColor: "#111",
    paddingTop: 50,
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
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [TransactionId, setTransactionId] = useState("");
  const [TransactionTime, setTeransactionTime] = useState("");
  const [backDrop, setBackDrop] = useState(false);
  const [back, setBack] = useState(false);
  const [showBarCode, setShowBarCode] = useState(false);
  const recieptRef = useRef();
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

  const peymentShenase = () => {
    axios
      .post(
        `${Routes.BillPayment}`,
        {
          BillId: billIdWithZero,
          PaymentId: payIdWithZero,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log("check", res);
        setIsPaymentSuccess(true);
        setTeransactionTime(res.data.value.tranDateTime);
        setTransactionId(res.data.value.response);
        setPayModal(false);
        setPayId("");
        setBillId("");
        setCheckWallet(false);
      })
      .catch((err) => {
        console.log("pay injas not ok", err.response.data);
        alert("خطا در پرداخت قبض!");
        setCheckWallet(false);
      });
  };

  const backPayment = () => {
    let wallet = "";
    axios
      .get(`${Routes.walletBalance}`, { headers: { token: token } })
      .then((res) => {
        wallet = res.data.value.response.toString();
        if (Number(wallet) >= billAmount) {
          peymentShenase();
        } else {
          setBackDrop(false);
          // this.setState({payClick: false});
          // this.setState({isSuffientAmount: false});
          // this.setState({isPaymentInit: false});
          // this.setState({isErrorSet: true});
          //this.setState({backdrop: false});
          //           return Alert.alert(
          //             'موجودی شما کافی نیست لطفا مجددا تلاش نمایید.',
          //           );
        }
      })
      .catch(() => {
        alert("خطا در بازیابی اطلاعات کیف پول");
        setBackDrop(false);
      });
  };
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
    console.log("BACK");
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
  const barcodeRecognized = (barcode) => {
    let barcodeData = barcode.toString();
    let billId = barcodeData.substr(0, 13);
    let payId = barcodeData.substr(13, 13);
    let fnl = checkdigit(billId, payId);
    setBillOk(fnl[0]);
    setBillType(fnl[1]);
    setBillAmount(fnl[2]);
    setServiceCode(fnl[3]);
    setCompanyCode(fnl[4]);
    setPayId(fnl[5]);
    setBillIdWithZero(fnl[6]);
    setBillId(fnl[6]);
    let servCode = fnl[3];
    let compCode = fnl[4];
    axios
      .get(`${Routes.BillCompanyCheck}${token}/${compCode}/${servCode}`)
      .then((res) => {
        if (res.data.value.response === true && fnl[0] === true) {
          setShowBarCode(false);
          console.log("چک کردن شرکت");
          setPayModal(true);
        } else if (fnl[0] === false) {
          setTextSnack("شناسه قبض یا پرداخت اشتباه است!");
          setSnackBar(true);
        } else {
          setShowBarCode(false);
          setTextSnack("قبض مورد نظر پشتیبانی نمی شود!");
          setSnackBar(true);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const downlodReciept = () => {
    domtoimage
      .toJpeg(recieptRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "recieptTransaction.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };
  const shareReciept = () => {
    domtoimage
      .toJpeg(recieptRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        function b64toBlob(dataURI) {
          var byteString = atob(dataURI.split(",")[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab], { type: "image/jpeg" });
        }

        let blob = b64toBlob(dataUrl);
        const file = new File([blob], "fileName.jpg", {
          type: blob.type,
        });
        if (navigator.share !== undefined) {
          navigator
            .share({
              text: "رسید تراکنش",
              files: [file],
            })
            .then(() => {
              console.log("Thanks for sharing!");
            })
            .catch(console.error);
        } else {
          // fallback
        }
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
      <div className={classes.scanBtn} onClick={() => setShowBarCode(true)}>
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
      <Modal
        isOpen={showBarCode}
        onRequestClose={() => setShowBarCode(false)}
        style={customStyles2}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <Header text="اسکن بارکد" click={() => setShowBarCode(false)} />
        {/* <BarcodeScannerComponent
          width={"100%"}
          height={300}
          onUpdate={(err, result) => {
            if (result) alert(result);
          }}
        /> */}
        <BarCodeScanner
          width={"100%"}
          onUpdate={(err, resp) => {
            if (resp) {
              barcodeRecognized(resp);
            }
          }}
        />
        {/* <BarcodeReader
          style={{ width: 500, height: 500 }}
          onError={(err) => console.log(err)}
          onScan={(result) => {
            if (result) alert(result);
          }}
        /> */}
      </Modal>
      <Modal
        isOpen={isPaymentSuccess}
        onRequestClose={() => setIsPaymentSuccess(false)}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div ref={recieptRef} style={{ height: "100%", width: "100%" }}>
            <Reciept
              billType={billType}
              billAmount={moneySplitter(billAmount)}
              billId={Number(billIdWithZero).toString()}
              payId={Number(payIdWithZero).toString()}
              TranId={TransactionId}
              billDate={TransactionTime}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "90vh",
              borderRadius: 10,
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "7.5%",
            }}
          >
            <CloseBtn close={() => setIsPaymentSuccess(false)} />
            <ShareBtn
              share={() => shareReciept()}
              download={() => downlodReciept()}
            />
          </div>
        </div>
      </Modal>
      {chackWallet ? (
        <ChargeWallet
          token={token}
          amount={billAmount}
          payment={peymentShenase}
          backPayment={backPayment}
          backDrop={backDrop}
          openBackDrop={() => setBackDrop(true)}
          closeBackDrop={() => setBackDrop(false)}
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
