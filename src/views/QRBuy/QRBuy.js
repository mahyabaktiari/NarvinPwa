import React, { useState, useRef, useEffect } from "react";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import QrReader from "react-qr-reader";
import useStyle from "./style";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {
  ToRial,
  getWalletBalanceAsync,
  splitInfo,
  moneySplitter,
} from "../../util/validators";
import axios from "axios";
import { Routes } from "../../api/api";
import Modal from "react-modal";
import Header from "../../components/Header/Header";
import TextField from "@material-ui/core/TextField";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Submit from "../../components/SubmitButton/SubmitButton";
import Snackbar from "@material-ui/core/Snackbar";
import PointScreen from "../../components/PointScreen/PointSreen";
import ChargeWallet from "../../components/ChargeWallet/ChargeWallet";
import RecieptQR from "../../components/Reciept/RecieptQR";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fa500px } from "@fortawesome/free-brands-svg-icons";
import domtoimage from "dom-to-image";
import ShareBtn from "../../components/ShareBtn/ShareBtn";
import CloseBtn from "../../components/CloseBtn/CloseBtn";

const QRBuy = (props) => {
  const customStyles = {
    content: {
      width: "100%",
      height: "100%",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      padding: 0,
      border: "none",
      borderRadius: 0,
      zIndex: 1000,
    },
  };
  const CssTextField = makeStyles({
    root: {
      marginTop: 15,
      width: "70%",
      marginBottom: 15,
      "& label.Mui-focused": {
        color: "#CD0448",
        textAlign: "right",
        fontFamily: "IRANSansMobile",
        fontSize: "0.7rem",
        top: -5,
      },
      "& label.MuiFormLabel-filled ": {
        textAlign: "right",
        fontFamily: "IRANSansMobile",
        fontSize: "0.7rem",
        top: -5,
      },
      "& .MuiInputLabel-formControl": {
        transform: "none",
        top: 20,
        right: 12,
        fontSize: 14,
        fontFamily: "IRANSansMobile",
        zIndex: 0,
      },
      "& .MuiFormControl-root": {
        direction: "ltr",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#CD0448",
      },
      "& .MuiInputBase-input": {
        fontFamily: "IRANSansMobile",
        height: 20,
        fontSize: 14,
        zIndex: 0,
      },
      "& .MuiOutlinedInput-root": {
        fontSize: "1.1rem",
        "& fieldset": {
          borderColor: "gray",
          zIndex: 0,
          "& legend": {
            textAlign: "right",
          },
        },
        "&:hover fieldset": {
          borderColor: "#CD0448",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#CD0448",
        },
      },
      "& .MuiSelect-iconOutlined": {
        left: 0,
        right: "90%",
      },
      "& .MuiSelect-outlined.MuiSelect-outlined": {
        paddingRight: 16,
      },
    },
  });

  const styleSnackbar = makeStyles({
    root: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: "red",
        justifyContent: "center",
        fontFamily: "IRANSansMobile",
        flexGrow: 0,
        marginBottom: "20%",
        direction: "rtl",
        zIndex: 100000,
      },
    },
  });
  const classInput = CssTextField();
  const classSnack = styleSnackbar();

  const classes = useStyle();
  const reader = useRef(null);
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [uniqId, setUniqId] = useState("");
  const [WalletBalance, setWalletBalance] = useState("");
  const [userAccountId, setUserAccountId] = useState("");
  const [point, setPoint] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [codeP, setCodeP] = useState();
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [merchanmobile, setMerchantMobile] = useState("");
  const [merchantAccountId, setMechantAccountID] = useState("");
  const [merchantTypeId, setMerchantTypeID] = useState("");
  const [merchantId, setMerchantID] = useState("");
  const [merchantAddress, setMerchantAddress] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [amount, setAmount] = useState("");
  const [merchantLogo, setMarchantLogo] = useState("");
  const [paymentModal, setPaymentModal] = useState(false);
  const [pointModal, setPointModal] = useState(false);
  const [checkWallet, setCheckWallet] = useState(false);
  const [comments, setComments] = useState("");
  const [amountPay, setAmountPay] = useState("");
  const [recieptModal, setRecieptModal] = useState(false);
  const [Ipg, setIpg] = useState(false);
  const [recieptAmount, setRecieptAmount] = useState(false);
  const [tranDate, setTranDate] = useState(false);
  const [tranId, setTranID] = useState(false);
  const [backDrop, setBackDrop] = useState(false);
  const [back, setBack] = useState(false);
  const [barcodeLimit, setBarcodeLimit] = useState(true);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [fixedPrice, setFixedPrice] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScan = (barcode) => {
    // setCode(data);
    if (barcodeLimit && barcode) {
      setBarcodeLimit(false);
      console.log(barcode);
      let status = null;
      //this method will check if the barcode
      //is for narvin indeed
      let barcodeExamin = splitInfo(barcode);
      if (barcodeExamin[0] == true) {
        let id = barcodeExamin[1];
        // this.setState((pervState) => {
        //   return {...pervState, receiverCode: id};
        // });
        setCodeP(id);

        let invoiceNumber = barcodeExamin[3];
        setInvoiceNumber(invoiceNumber);

        axios
          .get(`${Routes.getMerchantInfo}/${id}`, {
            headers: { token: token },
          })
          .then((res) => {
            console.log(res);
            status = res.data.responseCode;
            if (status === 200 && res.data.value.response !== null) {
              let data = res.data.value.response;
              if (data.isActive === false) {
                setTextSnack("پذیرنده فعال نمی باشد!");
                setSnackBar(true);
              } else if (userAccountId === data.accountId) {
                setTextSnack("امکان پرداخت به پذیرنده شخصی وجود ندارد!");
                setSnackBar(true);
              } else {
                //merchant mobile
                setMerchantMobile(data.mobile);
                //merchant account id
                setMechantAccountID(data.accountId);
                //merchant type id
                setMerchantTypeID(data.merchantTypeId);
                //merchant id
                setMerchantID(res.data.value.merchantId);
                //merchant address
                setMerchantAddress(data.address);
                //merchant name
                setMerchantName(data.storeName);

                //merchant basePrice
                if (barcodeExamin[2] != "" || barcodeExamin[2] != null) {
                  setFixedPrice(barcodeExamin[2]);
                  setAmount(barcodeExamin[2]);
                } else {
                  setAmount(data.basePrice);
                }
                //merchant logo
                setMarchantLogo(data.storeLogo);
                setPaymentModal(true);
              }
            } else {
              setBarcodeLimit(true);
              setTextSnack("کد پذیرنده یافت نشد!");
              setSnackBar(true);
            }
          })
          .catch((err) => {
            setBarcodeLimit(true);
            setTextSnack("خطا در بازیابی اطلاعات پذیرنده از سرور!");
            setSnackBar(true);
          });
      } else {
        setBarcodeLimit(true);
        setTextSnack("بارکد نامعتبر می باشد!");
        setSnackBar(true);
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  const recieptRef = useRef();

  // const openImageDialog = (imageSrc) => {
  //   reader.current.openImageDialog();
  // };
  useEffect(() => {
    let token = localStorage.getItem("token");
    setToken(token);
    getWalletBalanceAsync(token).then((res) => {
      console.log("res", res);
      setWalletBalance(res);
    });
    setUniqId(localStorage.getItem("DeviceUniqId"));
    setUserAccountId(localStorage.getItem("userAcountId"));
    getUserPoints(token);
    Modal.setAppElement("body");
  }, []);

  console.log(Ipg);
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
  // if (Ipg) {
  //   console.log("QR");
  //   setPaymentModal(false);
  //   setOpenModal(false);
  //   setCheckWallet(false);
  //   setIpg(false);
  // }

  // window.onpopstate = function (event) {
  //   console.log(event);
  //   if (Ipg) {
  //     console.log("okeyee", Ipg);
  //   }
  //   //Continue With Your Code
  // };
  // console.log(props.history.location.pathname);

  const backPayment = () => {
    axios
      .get(`${Routes.walletBalance}`, { headers: { token: token } })
      .then((res) => {
        let walletBalance = Number(res.data.value.response);
        console.log("wallet", walletBalance);
        if (walletBalance >= amountPay) {
          console.log("Amount", amountPay);
          payment();
        } else {
          console.log("LOW WAllet");
          setBackDrop(false);
        }
      })
      .catch((err) => {
        setBackDrop(false);
        setTextSnack("خطا در دریافت موجودی کیف پول");
      });
  };

  console.log("action", props.history.action);
  const getUserPoints = (val) => {
    console.log(val);
    axios
      .get(`${Routes.GetPoints}`, { headers: { token: val } })
      .then((res) => {
        console.log("this is points", res);
        let status = res.data.responseCode;
        let points = res.data.value.response;
        if (status === 200) {
          setPoint(points);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const payment = () => {
    let status = "";
    axios
      .post(
        `${Routes.QrPayment}`,
        {
          MerchantId: codeP, //reciever code
          DeviceUniqId: uniqId, //imei of device
          amount: amountPay,
          Comments: comments,
        },
        { headers: { token: token } }
      )
      .then(async (res) => {
        console.log("resid", res);
        status = res.data.responseCode;
        if (status === 200) {
          setCheckWallet(false);
          console.log("Pardakht Shod!");
          setRecieptAmount(res.data.value.response.amount);
          setTranDate(res.data.value.response.creationJalaliDateTime);
          setTranID(res.data.value.trackingCode);
          console.log("length", res.data.value.response.comments.length);
          res.data.value.response.comments.length !== 0
            ? setComments(res.data.value.response.comments)
            : setComments("");

          let result = await getWalletBalanceAsync(token);
          setWalletBalance(result);
          setAmount("");
          setRecieptModal(true);
          setBackDrop(false);
          // return this.closeAllModals();
          //show reciept at the end
        } else {
          setTextSnack(res.data.message);
          setSnackBar(true);
          setOpenModal(false);
          setPaymentModal(false);
          setCheckWallet(false);
          setBackDrop(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setTextSnack("خطای سیستمی در پرداخت!");
        setSnackBar(true);
        setCheckWallet(false);
        setBackDrop(false);
      });
  };
  const handlepayment = () => {
    let amountPayment = amount.replaceAll(",", "");
    setAmountPay(amountPayment);
    setCheckWallet(true);
    setLoading(false);
  };
  const getMerchantinfo = async () => {
    let status = null;
    console.log(codeP, token);
    axios
      .get(`${Routes.getMerchantInfo}/${codeP}`, {
        headers: { token: token },
      })
      .then((res) => {
        console.log("res", res);
        status = res.data.responseCode;
        if (status === 200 && res.data.value.response !== null) {
          let data = res.data.value.response;
          if (data.isActive === false) {
            setTextSnack("پذیرنده فعال نمی باشد!");
            setSnackBar(true);
            setOpenModal(false);
            setLoading(false);
          } else if (userAccountId === data.accountId) {
            setTextSnack("امکان پرداخت به پذیرنده شخصی وجود ندارد!");
            setSnackBar(true);
            setOpenModal(false);
            setLoading(false);
          } else {
            setMerchantMobile(data.mobile);
            setMechantAccountID(data.accountId);
            setMerchantTypeID(data.merchantTypeId);
            setMerchantID(res.data.value.merchantId);
            setMerchantAddress(data.address);
            setMerchantName(data.storeName);
            setAmount(data.basePrice);
            setMarchantLogo(data.storeLogo);
            setPaymentModal(true);
            setLoading(false);
          }
        } else {
          setOpenModal(false);
          setTextSnack("کد پذیرنده یافت نشد!");
          setSnackBar(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(false);
        setTextSnack("خطا در بازیابی اطلاعات پذیرنده از سرور!");
        setSnackBar(true);
        setLoading(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };
  const closePaymentModal = () => {
    // this.setState({paymentModalVisible: !this.state.paymentModalVisible});
    setPaymentModal(!paymentModal);
    //this.setState({Amount: ''});
    setAmount("");
    setInvoiceNumber(null);
    setBarcodeLimit(true);
    setFixedPrice("");
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
    <div style={{ height: "100vh", overflowY: "hidden" }}>
      <div style={{ position: "relative", height: "101vh" }}>
        <QrReader
          ref={reader}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "100%" }}
          className={classes.root}
        />
        <p>{code}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            position: "absolute",
            top: 10,
            color: "#fff",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "55%",
              backgroundColor: "rgb(224 224 224 / 41%)",
              borderRadius: 10,
              padding: 10,
              fontFamily: "IRANSansMobile",
              fontWeight: 100,
              display: "flex",
              justifyContent: "space-between",
              direction: "rtl",
              alignItems: "center",
              fontSize: 14,
            }}
            onClick={() => props.history.push("./wallet")}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <AccountBalanceWalletOutlinedIcon style={{ paddingLeft: 5 }} />
              <span style={{ paddingTop: 5 }}>{WalletBalance} ریال </span>
            </div>
            <AddRoundedIcon style={{ color: "green", fontSize: 25 }} />
          </div>
          <div
            style={{
              width: "25%",
              backgroundColor: "rgb(224 224 224 / 41%)",
              borderRadius: 10,
              padding: 10,
              fontFamily: "IRANSansMobile",
              fontWeight: 100,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              alignItems: "center",
            }}
            onClick={() => setPointModal(true)}
          >
            <span>نارینه </span>
            <span>{point}</span>
            <span>امتیاز </span>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgb(224 224 224 / 41%)",
            position: "absolute",
            padding: 10,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: "75vh",
            color: "#fff",
            width: "40%",
            marginLeft: "30%",
            textAlign: "center",
            fontFamily: "IRANSansMobile",
            fontSize: 14,
          }}
          onClick={() => setOpenModal(true)}
        >
          پرداخت با کد پذیرنده
        </div>
      </div>

      <NavigationBottom item="QRBuy" />
      <Modal
        isOpen={openModal}
        onRequestClose={() => {
          setOpenModal(false);
          setCodeP("");
        }}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 80,
            paddingTop: 70,
            direction: "rtl",
          }}
        >
          <Header
            text="پرداخت با کد پذیرنده"
            click={() => setOpenModal(false)}
          />
          <p
            style={{
              direction: "rtl",
              color: "#CD0448",
              marginTop: 50,
              fontFamily: "IRANSansMobile",
              fontSize: "0.9rem",
            }}
          >
            لطفا کد پذیرنده مورد نظر را وارد نمایید.
          </p>
          <TextField
            className={classInput.root}
            id="custom-css-standard-input"
            label=" کد پذیرنده "
            variant="outlined"
            autoComplete="off"
            value={codeP}
            onChange={(text) => setCodeP(text.target.value)}
          />
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Submit
              click={() => {
                setLoading(true);
                getMerchantinfo();
              }}
              text="تایید"
              style={{ marginTop: 20 }}
              disable={!codeP}
            />
          )}
        </div>
      </Modal>
      <Modal
        isOpen={paymentModal}
        onRequestClose={closePaymentModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 70,
            paddingBottom: 70,
          }}
        >
          <Header
            text="پرداخت با کد پذیرنده"
            click={() => setPaymentModal(false)}
          />
          {merchantLogo ? (
            <img
              src={`${merchantLogo}`}
              alt="img"
              style={{
                borderRadius: "50%",
                border: "3px solid #CD0448",
                width: 85,
                height: 85,
                marginTop: 10,
              }}
            />
          ) : null}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "75%",
              height: "auto",
              borderRadius: 10,
              backgroundColor: "#610c34",
              shadowColor: "#000",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: "5%",
              shadowOffset: {
                width: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              padding: "3%",
              marginTop: 20,
            }}
          >
            {merchantTypeId === 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    paddingRight: 10,
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  کد پذیرنده: {merchantId}
                </span>
                <span
                  style={{
                    color: "#fff",
                    paddingRight: 10,
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  نام دریافت کننده: {merchantName}
                </span>
              </div>
            )}
            {merchantTypeId === 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    paddingRight: 10,
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  کد پذیرنده: {merchantId}
                </span>
                <span
                  style={{
                    color: "#fff",
                    paddingRight: 10,
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  نام فروشگاه: {merchantName}
                </span>
                <span
                  style={{
                    color: "#fff",
                    paddingRight: 10,
                    fontFamily: "IRANSansMobile",
                    textAlign: "right",
                  }}
                >
                  آدرس فروشگاه: {merchantAddress}
                </span>
              </div>
            )}
            {merchantTypeId === 3 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    paddingRight: 10,
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  کد پذیرنده: {merchantId}
                </span>
                <span
                  style={{
                    color: "#fff",
                    paddingRight: 10,
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  نام راننده: {merchantName}
                </span>
                <span
                  style={{
                    color: "#fff",
                    paddingRight: 10,
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  خط: {merchantAddress}
                </span>
              </div>
            )}
          </div>
          <span
            style={{
              color: "#CD0448",
              marginTop: 30,
              fontFamily: "IRANSansMobile",
              fontSize: "1",
              direction: "rtl",
            }}
          >
            مبلغ قابل پرداخت (ریال)
          </span>
          <input
            type="text"
            value={
              amount === 0 || amount == null ? "" : ToRial(amount.toString())
            }
            onChange={(val) => setAmount(val.target.value)}
            className={classes.input}
            contentEditable={fixedPrice == null || fixedPrice == ""}
            maxLength={11}
            inputMode="numeric"
          />
          <textarea
            type="text"
            placeholder="شرح انتقال"
            maxLength={70}
            className={classes.textArea}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Submit
              text="پرداخت"
              disable={!amount}
              click={() => {
                setLoading(true);
                handlepayment();
              }}
            />
          )}
        </div>
      </Modal>
      <PointScreen
        show={pointModal}
        close={() => setPointModal(false)}
        point={point}
      />
      {checkWallet ? (
        <ChargeWallet
          ipg={() => setIpg(true)}
          payment={() => payment()}
          token={token}
          amount={amountPay}
          backPayment={backPayment}
          backDrop={backDrop}
          openBackDrop={() => setBackDrop(true)}
          closeBackDrop={() => setBackDrop(false)}
          close={() => {
            setCheckWallet(false);
          }}
        />
      ) : null}
      <Modal
        isOpen={recieptModal}
        onRequestClose={() => setRecieptModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div ref={recieptRef} style={{ height: "100%", width: "100%" }}>
            <RecieptQR
              tranId={tranId}
              tranDate={tranDate}
              codeP={codeP}
              recieptAmount={recieptAmount}
              comments={comments}
              close={() => {
                setRecieptModal(false);
                setPaymentModal(false);
                setOpenModal(false);
              }}
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
            <CloseBtn
              close={() => {
                setRecieptModal(false);
                setPaymentModal(false);
                setOpenModal(false);
                setCheckWallet(false);
                setCodeP("");
              }}
            />
            <ShareBtn
              share={() => shareReciept()}
              download={() => downlodReciept()}
            />
          </div>
        </div>
      </Modal>
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classSnack.root}
      />
    </div>
  );
};
export default QRBuy;
