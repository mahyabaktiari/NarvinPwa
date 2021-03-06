import React, { useState, useEffect } from "react";
import useStyle from "./style";
import Header from "../../components/Header/Header";
import ReactCodeInput from "react-verification-code-input";
import ReplayIcon from "@material-ui/icons/Replay";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { Routes } from "../../api/api";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

const ConfirmCode = (props) => {
  const [timer, setTimer] = useState(120);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [phoneNum, setPhoneNum] = useState("");
  const [uniqId, setUniqId] = useState("");
  const [appVer, setAppVer] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [osVersion, setOsVersion] = useState("");
  const [back, setBack] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      if (timer > 0) {
        const count = timer - 1;
        setTimer(count);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [timer]);
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
    setPhoneNum(localStorage.getItem("phoneNumber"));
    setUniqId(localStorage.getItem("DeviceUniqId"));
    setAppVer(localStorage.getItem("appVersoin"));
    setDeviceName(localStorage.getItem("DeviceName"));
    setDeviceModel(localStorage.getItem("DeviceModel"));
    setOsVersion(localStorage.getItem("osVersion"));
  }, []);

  const sendCodeAgain = () => {
    axios
      .post(
        Routes.RegisterNewUser,
        {
          Mobile: phoneNum,
          DeviceUniqId: uniqId,
          DeviceName: deviceName,
          DeviceModel: deviceModel,
          OsVersion: osVersion,
        },
        { headers: { AppVer: appVer } }
      )
      .then(async (response) => {
        let msg = response.data.message;
        if (
          msg ===
          "تعداد دفعات تلاش بیش از حد مجاز است،لطفا در روز آتی تلاش کنید"
        ) {
          clearInterval(this.timer);
          setTextSnack(".تلاش بیش از حد مجاز. لطفا در روز های آتی تلاش کنید");
          setSnackBar(true);
        } else {
          setTimer(120);
          setTextSnack("کد مجددا ارسال شد.");
          setSnackBar(true);
        }
      })
      .catch((err) => {
        setTextSnack("خطا در ارسال مجدد کد!");
        setSnackBar(true);
      });
  };

  const codeVerify = (code) => {
    axios
      .put(`${Routes.ConfrimCode}`, {
        Mobile: phoneNum,
        DeviceUniqId: uniqId,
        VerificationCode: code,
      })
      .then(async (response) => {
        await console.log(response.data.value.response);
        if (response.data.value.response === true) {
          await axios
            .get(`${Routes.getToken}${phoneNum}/${uniqId}/${appVer}`)
            .then(async (res) => {
              await localStorage.setItem(
                "token",
                res.data.value.token.accessToken
              );
            });
          await localStorage.setItem("verify", "true");
          //    await this.props.navigation.navigate("QRBuy");
          props.history.push("/QR");
        } else {
          await setTimer(1);
          setTextSnack("کد تایید معتبر نمی باشد!");
          setSnackBar(true);
        }
      })
      .catch((err) => {
        setTextSnack("تایید دستگاه با مشکل مواجه گردید!");
        setSnackBar(true);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const classes = useStyle();
  return (
    <React.Fragment>
      <Header text="تایید کد" />
      <div className={classes.container}>
        <img
          src={require("../../assets/icons/4.png")}
          className={classes.img}
        />
        <p className={classes.text}>{phoneNum}</p>
        <p className={classes.text}>لطفا کد ارسال شده را وارد کنید .</p>
        <ReactCodeInput
          type="number"
          fields={5}
          fieldWidth={50}
          onChange={() => console.log("change")}
          activeColor="#CD0448"
          className={classes.input}
          onComplete={(code) => codeVerify(code)}
        />
        <p className={classes.timer}>{timer}</p>
        <div className={classes.sendAgain} onClick={sendCodeAgain}>
          ارسال مجدد کد فعال سازی <ReplayIcon />{" "}
        </div>
        <div className={classes.mobile} onClick={() => props.history.push("/")}>
          تصحیح شماره موبایل <PhoneIphoneIcon />{" "}
        </div>
        <Snackbar
          open={snackBar}
          autoHideDuration={5000}
          message={textSnack}
          onClose={handleClose}
          className={classes.root}
        />
      </div>
    </React.Fragment>
  );
};

export default ConfirmCode;
