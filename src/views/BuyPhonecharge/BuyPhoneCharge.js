import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import TextField from "@material-ui/core/TextField";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Submit from "../../components/SubmitButton/SubmitButton";
import Input from "../../components/Input/input";
import axios from "axios";
import { Routes } from "../../api/api";
import styles from "./styles";
import {
  useChargeContext,
  useChargeDispatch,
} from "../../context/buyChargeContext";
import ChargeIcons from "../../components/ChargeIcons/ChargeIcons";
import ChargeSims from "../../components/ChargeSims/ChargeSims";
import Modal from "react-modal";
import StarBorderTwoToneIcon from "@material-ui/icons/StarBorderTwoTone";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { moneySplitter, ToRial } from "../../util/validators";
import ChargeCard from "../../components/ChargeCard/ChargeCard";
import Snackbar from "@material-ui/core/Snackbar";
import ChargeWallet from "../../components/ChargeWallet/ChargeWallet";
import Reciept from "../../components/Reciept/chargeReciept";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ListItem from "../../components/ListItem/ListItem";

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

const BuyCharge = (props) => {
  const classes = styles();
  const [token, setToken] = useState("");
  const [simNum, setSimNum] = useState("");
  const [faveNums, setFaveNums] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [checked, setChecked] = useState(false);
  const [isWonderful, setIsWonderful] = useState(false);
  const [chargeAmount, setChargeAmount] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [chackWallet, setCheckWallet] = useState(false);
  const [billAmount, setBillAmount] = useState("");
  const [uniqId, setUniqId] = useState("");
  const [faveName, setFaveName] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);
  const [tranId, setTranId] = useState("");
  const [tranDate, setTranDate] = useState("");
  const [backDrop, setBackDrop] = useState(false);
  const [stateClick, setStateClick] = useState(1);
  const [contactDeletSuccess, setContactDeletSuccess] = useState(false);
  const [back, setBack] = useState(false);

  console.log(uniqId);

  const {
    payModal,
    faveModal,
    contactSelect,
    isMci,
    isMtn,
    isTla,
    isRTL,
    operator,
    number,
  } = useChargeContext();
  const dispatch = useChargeDispatch();

  console.log(
    payModal,
    faveModal,
    contactSelect,
    isMci,
    isMtn,
    isTla,
    isRTL,
    operator,
    number
  );
  let selectedNum = number.replace(/ +/g, "");
  selectedNum = selectedNum.replace("+98", "0");

  console.log("selectedNum", selectedNum);
  console.log("selectedNum.length", selectedNum.length);
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    setSimNum(localStorage.getItem("phoneNumber"));
    setUniqId(localStorage.getItem("DeviceUniqId"));
    getFavs(tokenStorage);
  }, []);
  useEffect(() => {
    setOperator();
  }, [number]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };
  function getFavs(token) {
    axios
      .get(`${Routes.getFave}`, { headers: { token: token } })
      .then((res) => {
        console.log("faves", res);
        let status = res.data.responseCode;
        if (status === 200) {
          setFaveNums(res.data.value.response);
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const getSimNum = () => {
    dispatch({ type: "NUM_CHANGED", payload: simNum });
  };
  const setOperator = () => {
    if (selectedNum.substr(0, 3) === "093" || number.substr(0, 3) === "090") {
      dispatch({ type: "IS_MTN" });
    }
    if (selectedNum.substr(0, 3) === "091" || number.substr(0, 3) === "099") {
      dispatch({ type: "IS_MCI" });
    }
    if (selectedNum.substr(0, 3) === "092") {
      dispatch({ type: "IS_RIGHTEL" });
    }
    if (selectedNum === "") {
      dispatch({ type: "RESET_SIMS" });
    }
  };

  function reset() {
    setChargeAmount("");
    setChecked(false);
    setIsWonderful(false);
    dispatch({ type: "RESET_SIMS" });
    dispatch({ type: "CLOSE_PAY_MODAL" });
    getFavs(token);
  }

  function paymentHandle() {
    //  setLoading(true);
    let amount = Number(chargeAmount.replace(/,/g, ""));
    setBillAmount(amount);
    if (amount < 5000 || amount > 10000000) {
      // setPayInit(false);
      // setLoading(false);
      // setPaySuccess(false);
      // setPayClick(false);
      reset();
      setTextSnack("مبلغ شارژ معتبر نیست!");
      setSnackBar(true);
    } else {
      // setPayInit(true);
      setCheckWallet(true);
    }
  }
  const peymentCharge = () => {
    console.log(billAmount, uniqId, number, faveName, checked);
    axios
      .post(
        `${Routes.buyCharge}`,
        {
          DeviceUniqId: uniqId,
          ProductId: 1,
          CiId: isMci
            ? 1
            : isMtn && !isWonderful
            ? 2
            : isMtn && isWonderful
            ? 3
            : isRTL && !isWonderful
            ? 4
            : isRTL && isWonderful
            ? 5
            : 0,
          Operator: isMci
            ? "همراه اول"
            : isMtn
            ? "ایرانسل"
            : isRTL
            ? "رایتل"
            : isTla && "تالیا",
          Amount: billAmount,
          Mobile: selectedNum,
          ChargeType: "TopUp",
          Remember: checked ? true : false,
          Title:
            Number(selectedNum) === Number(simNum)
              ? "خودم"
              : faveName == null || faveName === ""
              ? "بدون نام"
              : faveName,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log(res);
        let status = res.data.responseCode;
        if (status === 200) {
          // setBackdrop(false);
          // setLoading(false);
          // setPayInit(false);
          setPaySuccess(true);
          // setPayClick(false);
          setBackDrop(false);
          setTranId(res.data.value.response);
          setTranDate(res.data.value.tranDateTime);
          setCheckWallet(false);
          dispatch({ type: "CLOSE_PAY_MODAL" });
          // try {
          //   SoundPlayer.playSoundFile("ok_notif", "wav");
          // } catch (e) {
          //   console.log(`cannot play the sound file`, e);
          // }
        }

        if (status === 424) {
          //payinit NOT False if no wallet balance else false
          setTextSnack(res.data.message);
          setSnackBar(true);
          // Toast.show(res.data.message, {
          //   position: Toast.position.center,
          //   containerStyle: { backgroundColor: "red" },
          //   textStyle: { fontFamily: "IRANSansMobile" },
          // });
          //  setPayClick(false);
          //  setLoading(false);
          setCheckWallet(false);
          setBackDrop(false);
          //  setBackdrop(false);
          reset();
        }
        if (status === 405) {
          //payinit NOT False if no wallet balance else false
          setTextSnack(res.data.message);
          setSnackBar(true);
          // Toast.show(res.data.message, {
          //   position: Toast.position.center,
          //   containerStyle: { backgroundColor: "red" },
          //   textStyle: { fontFamily: "IRANSansMobile" },
          // });
          // setPayClick(false);
          // setLoading(false);
          setCheckWallet(false);
          setBackDrop(false);
          // setBackdrop(false);
          reset();
        }
        if (status === 500) {
          setTextSnack(res.data.message);
          snackBar(true);
          // Toast.show(res.data.message, {
          //   position: Toast.position.center,
          //   containerStyle: { backgroundColor: "red" },
          //   textStyle: { fontFamily: "IRANSansMobile" },
          // });
          // setPayClick(false);
          // setLoading(false);
          setCheckWallet(false);
          setBackDrop(false);
          // setBackdrop(false);
          reset();
        }
      })
      .catch((err) => {
        console.log(err.response);
        setTextSnack(err.response.data.message);
        setSnackBar(true);
        // Toast.show(err.response.data.message, {
        //   position: Toast.position.center,
        //   containerStyle: { backgroundColor: "red" },
        //   textStyle: { fontFamily: "IRANSansMobile" },
        // });
        // setLoading(false);
        // setPayInit(false);
        setPaySuccess(false);
        // setPayClick(false);
        setCheckWallet(false);
        setBackDrop(false);
        // setBackdrop(false);
        reset();
      });
  };

  const backPayment = () => {
    axios
      .get(`${Routes.walletBalance}`, { headers: { token: token } })
      .then((res) => {
        console.log(res);
        let status = res.data.responseCode;
        if (status === 200) {
          let walAmount = res.data.value.response;
          console.log("AMOUNt", billAmount, walAmount);
          if (Number(walAmount) >= billAmount) {
            peymentCharge();
          } else {
            //  setLoading(false);
            //setPayInit(false);
            setPaySuccess(false);
            //setPayClick(false);
            setCheckWallet(false);
            setTextSnack("موجودی شما کافی نیست!");
            setSnackBar(true);
            setBackDrop(false);
            // setBackdrop(false);
            // return Toast.show('موجودی شما کافی نیست!', {
            //   position: Toast.position.center,
            //   containerStyle: {backgroundColor: 'red'},
            //   textStyle: {fontFamily: 'IRANSansMobile'},
            // });
          }
        } else {
          // setLoading(false);
          setPaySuccess(false);
          //  setPayClick(false);
          setCheckWallet(false);
          setBackDrop(false);

          //   setBackdrop(false);
          reset();
          // return Toast.show(res.data.message, {
          //   position: Toast.position.center,
          //   containerStyle: { backgroundColor: "red" },
          //   textStyle: { fontFamily: "IRANSansMobile" },
          // });
        }
      })
      .catch((err) => {
        setPaySuccess(false);
        setBackDrop(false);
        setCheckWallet(false);
        reset();
        console.log(err.response);
        setTextSnack("خطای سیستمی");
        setSnackBar(true);
      });
    // }
  };
  console.log(props.history);
  // window.addEventListener(
  //   "popstate",
  //   (event) => {
  //     console.log(event);
  //     console.log("state", event.state);
  //     console.log("jhjh", props.history);
  //     if (event.state) {
  //       //do your code here
  //       console.log("state true");
  //     } else {
  //       console.log("stateFalse");
  //       dispatch({ type: "CLOSE_PAY_MODAL" });
  //     }
  //   },
  //   false
  // );
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
  useEffect(() => {
    getFavs(token);
  }, [contactDeletSuccess]);
  function deleteContact(contact) {
    axios
      .put(
        `${Routes.deleteFave}`,
        { Mobile: contact, Isdelete: true },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log(res);
        setContactDeletSuccess(true);
        getFavs(token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <React.Fragment>
      <Header
        text="شارژ تلفن همراه"
        click={() => props.history.push("/services")}
      />
      <div className={classes.container}>
        <div style={{ width: "70%", textAlign: "right" }}>
          <Input
            label="شماره موبایل"
            value={selectedNum}
            change={(e) =>
              dispatch({ type: "NUM_CHANGED", payload: e.target.value })
            }
          />
        </div>
        {selectedNum.length === 11 ? (
          <div
            style={{
              direction: "rtl",
              marginTop: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              width: "70%",
            }}
          >
            <input type="checkbox" onClick={() => setChecked(!checked)} />
            <span
              style={{
                fontFamily: "IRANSansMobile",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {" "}
              افزودن این شماره به لیست منتخب
            </span>
          </div>
        ) : null}
        <ChargeIcons
          openContacts={console.log("getContect")}
          OpenFavs={() => dispatch({ type: "OPEN_FAVE_MODAL" })}
          getSim={getSimNum}
        />
        <ChargeSims
          disabled={selectedNum.length !== 11}
          mciChoose={() => dispatch({ type: "IS_MCI" })}
          mtnChoose={() => dispatch({ type: "IS_MTN" })}
          rightelChoose={() => dispatch({ type: "IS_RIGHTEL" })}
        />
        {isMtn || isRTL ? (
          <div style={{ marginTop: 15 }}>
            <span
              style={{
                fontFamily: "IRANSansMobile",
                paddingRight: 5,
                fontSize: 14,
              }}
            >
              {isMtn ? "شگفت انگیز" : "شورانگیز"}
            </span>
            <FormControlLabel
              control={
                <Switch
                  checked={isWonderful}
                  onChange={() => setIsWonderful(!isWonderful)}
                  name="checkedA"
                />
              }
            />
          </div>
        ) : null}
        <div style={{ width: "70%", textAlign: "right", direction: "rtl" }}>
          <Input
            label="مبلغ شارژ (ریال)"
            value={ToRial(chargeAmount)}
            change={(e) => {
              setChargeAmount(e.target.value);
            }}
            maxLength={11}
          />
        </div>

        <Submit
          text="ادامه"
          disable={selectedNum.length < 11 || chargeAmount === ""}
          click={() => {
            dispatch({ type: "OPEN_PAY_MODAL" });
          }}
        />
      </div>
      <Modal
        style={customStyles}
        isOpen={faveModal}
        onRequestClose={() => dispatch({ type: "CLOSE_FAVE_MODAL" })}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <Header
          text="شماره های منتخب"
          click={() => dispatch({ type: "CLOSE_FAVE_MODAL" })}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 70,
            width: "100%",
          }}
        >
          {faveNums.length !== 0 ? (
            faveNums.map((favenum) => {
              return (
                <ListItem
                  name={favenum.title}
                  number={favenum.mobile}
                  chooseContact={() =>
                    dispatch({ type: "NUM_CHANGED", payload: favenum.mobile })
                  }
                  deleteContact={() => deleteContact(favenum.mobile)}
                />
              );
            })
          ) : (
            <div
              style={{
                alignSelf: "center",
                marginTop: "25%",
                fontFamily: "IRANSansMobile",
                color: "#CD0448",
                opacity: "0.7",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>.شماره تلفن منتخبی ثبت نشده است</span>
              <StarBorderTwoToneIcon fontSize="large" />
            </div>
          )}
        </div>
      </Modal>
      <Modal
        style={customStyles}
        isOpen={payModal}
        onRequestClose={() => dispatch({ type: "CLOSE_PAY_MODAL" })}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <Header
          text="شارژ تلفن همراه"
          click={() => dispatch({ type: "CLOSE_PAY_MODAL" })}
        />
        <div style={{ marginTop: 70 }}>
          <ChargeCard
            type={
              isWonderful && isMtn
                ? "شگفت انگیز"
                : isRTL && isWonderful
                ? "شورانگیز"
                : "عادی"
            }
            amount={
              chargeAmount !== "" &&
              moneySplitter(chargeAmount.replace(/,/g, ""))
            }
            num={selectedNum}
            // payInit={() => setPayClick(true)}
            payInit={paymentHandle}
            operator={operator}
          />
        </div>
      </Modal>
      <Modal
        isOpen={paySuccess}
        onRequestClose={() => {
          setPaySuccess(false);
          dispatch({ type: "NUM_EMPTY" });
          reset();
        }}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <Reciept
            num={selectedNum}
            amount={chargeAmount !== "" && chargeAmount.replace(/,/g, "")}
            tranId={tranId}
            tranDate={tranDate}
            operator={operator}
            chargeType={
              isWonderful && isMtn
                ? "شگفت انگیز"
                : isRTL && isWonderful
                ? "شورانگیز"
                : "عادی"
            }
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
                setPaySuccess(false);
                dispatch({ type: "NUM_EMPTY" });
                reset();
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
              // onClick={() => shareReciept()}
            >
              <ShareOutlinedIcon style={{ color: "white" }} />
              <span>اشتراک گذاری</span>
            </div>
          </div>
        </div>
      </Modal>
      {chackWallet ? (
        <ChargeWallet
          token={token}
          amount={billAmount}
          payment={peymentCharge}
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
      <NavigationBottom item="SERVISES" />
    </React.Fragment>
  );
};

export default BuyCharge;
