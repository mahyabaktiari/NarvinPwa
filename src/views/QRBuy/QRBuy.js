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

  const handleScan = (data) => {
    setCode(data);
  };
  const handleError = (err) => {
    console.error(err);
  };
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

  const paymentState = () => {
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
        }
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
          // return this.closeAllModals();
          //show reciept at the end
        } else {
          setTextSnack(res.data.message);
          setSnackBar(true);
          setOpenModal(false);
          setPaymentModal(false);
          setCheckWallet(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setTextSnack("خطای سیستمی در پرداخت!");
        setSnackBar(true);
        setCheckWallet(false);
      });
  };
  const handlepayment = () => {
    let amountPayment = amount.replaceAll(",", "");
    setAmountPay(amountPayment);
    setCheckWallet(true);
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
          } else if (userAccountId === data.accountId) {
            setTextSnack("امکان پرداخت به پذیرنده شخصی وجود ندارد!");
            setSnackBar(true);
            setOpenModal(false);
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
          }
        } else {
          setOpenModal(false);
          setTextSnack("کد پذیرنده یافت نشد!");
          setSnackBar(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(false);
        setTextSnack("خطا در بازیابی اطلاعات پذیرنده از سرور!");
        setSnackBar(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };
  return (
    <div>
      <div style={{ position: "relative", height: "90vh" }}>
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
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <AccountBalanceWalletOutlinedIcon style={{ paddingLeft: 5 }} />
              <span style={{ paddingTop: 5 }}>{WalletBalance} ریال </span>
            </div>
            <AddRoundedIcon
              style={{ color: "green", fontSize: 25 }}
              onClick={() => props.history.push("./wallet")}
            />
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
            value={codeP}
            onChange={(text) => setCodeP(text.target.value)}
          />
          <Submit
            click={getMerchantinfo}
            text="تایید"
            style={{ marginTop: 20 }}
            disable={!codeP}
          />
        </div>
      </Modal>
      <Modal
        isOpen={paymentModal}
        onRequestClose={() => setPaymentModal(false)}
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
                width: "22%",
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
            maxLength={11}
          />
          <textarea
            type="text"
            placeholder="شرح انتقال"
            maxLength={70}
            className={classes.textArea}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          <Submit text="پرداخت" disable={!amount} click={handlepayment} />
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
            <div
              style={{
                backgroundColor: "red",
                padding: 10,
                color: "#fff",
                fontSize: "0.9rem",
                fontFamily: "IRANSansMobile",
                width: "40%",
                borderRadius: 8,
                textAlign: "center",
              }}
              onClick={() => {
                setRecieptModal(false);
                setPaymentModal(false);
                setOpenModal(false);
                setCheckWallet(false);
                setCodeP("");
              }}
            >
              <span>بستن</span>
            </div>
            <div
              style={{
                backgroundColor: "lime",
                padding: 10,
                color: "#fff",
                fontSize: "0.9rem",
                fontFamily: "IRANSansMobile",
                width: "40%",
                borderRadius: 8,
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ShareOutlinedIcon style={{ color: "white" }} />
              <span>اشتراک گذاری</span>
            </div>
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
