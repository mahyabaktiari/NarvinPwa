import React, { useState, useEffect } from "react";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Modal from "react-modal";
import Submit from "../../components/SubmitButton/SubmitButton";
// import messaging from "../../fire";
import axios from "axios";
import { browserName, browserVersion, osVersion } from "react-device-detect";
import { Routes } from "../../api/api";
import Snackbar from "@material-ui/core/Snackbar";
import OsModal from "../../components/osOldModal/osOldModal";
import CircularProgress from "@material-ui/core/CircularProgress";

const customStyles = {
  content: {
    width: "80%",
    height: "40vh",
    top: "30vh",
    bottom: 0,
    right: 0,
    left: "10%",
    padding: 0,
    zIndex: 10000,
  },
};

const osModalStyles = {
  content: {
    width: "80%",
    height: "40vh",
    top: "30vh",
    bottom: 0,
    right: 0,
    left: "10%",
    padding: 0,
    zIndex: 10000,
    borderRadius: 15,
    backgroundColor: "#ddd",
    border: "none",
  },
};
var subtitle;

const CssTextField = withStyles({
  root: {
    marginTop: 15,
    width: "70%",
    "& label.Mui-focused": {
      color: "#CD0448",
      textAlign: "right",
      fontFamily: "IRANSansMobile",
      fontSize: 11,
      top: -5,
    },
    "& label.MuiFormLabel-filled ": {
      color: "#CD0448",
      textAlign: "right",
      fontFamily: "IRANSansMobile",
      fontSize: 11,
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
      height: 15,
      fontSize: 14,
      zIndex: -1,
    },
    "& .MuiOutlinedInput-root": {
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
  },
})(TextField);
const Register = (props) => {
  console.log(browserName, browserVersion, osVersion);
  const [phoneNum, setPhoneNum] = useState("");
  const [isPhoneNum, setIsPhoneNum] = useState(true);
  const [openModal, setopenModal] = useState(false);
  const [reagentMobile, setReagentMobile] = useState("");
  const [isReagentMobile, setIsReagentMobile] = useState(true);
  const [fcmToken, setFcmToken] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [openOsmodal, setOpenOsModal] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(isPhoneNum);
  console.log("isReagentMobile", reagentMobile);
  const classes = styles();

  let navigator_info = window.navigator;
  let screen_info = window.screen;
  let uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += navigator_info.plugins.length;
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";
  console.log("uid", uid);

  const phoneValidation = (e) => {
    setPhoneNum(e.target.value);
    let valid = new RegExp("^(\\+98|0)?9\\d{9}$");
    if (!valid.test(e.target.value)) {
      setIsPhoneNum(false);
    } else {
      setIsPhoneNum(true);
    }
  };
  const reagentMobileValidation = (e) => {
    setReagentMobile(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 11) {
      setIsReagentMobile(false);
    } else {
      setIsReagentMobile(true);
    }
  };

  // useEffect(() => {
  //   messaging.firebaseDependencies.installations
  //     .getToken()
  //     .then((res) => {
  //       setFcmToken(res);
  //       console.log("FCMToken", res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const submitData = () => {
    console.log(phoneNum, reagentMobile);
    if (phoneNum === "") {
      setLoading(false);
      setTextSnack("شماره موبایل نمیتواند خالی باشد!");
      setSnackBar(true);
    } else {
      if (phoneNum.length != 11) {
        setLoading(false);
        setTextSnack("شماره نامعتبر می باشد!");
        setSnackBar(true);
      } else {
        if (Number(phoneNum) === Number(reagentMobile)) {
          setLoading(false);
          setTextSnack("شماره موبایل و شماره معرف نمیتواند یکی باشد!");
          setSnackBar(true);
        } else {
          localStorage.setItem("phoneNumber", phoneNum);
          localStorage.setItem("DeviceUniqId", uid);
          localStorage.setItem("appVersoin", "1.16");
          localStorage.setItem("DeviceName", browserName);
          localStorage.setItem("DeviceModel", browserVersion);
          localStorage.setItem("osVersion", osVersion);
          axios
            .post(
              Routes.RegisterNewUser,
              {
                Mobile: phoneNum,
                ReagentMobile: reagentMobile,
                DeviceUniqId: uid,
                DeviceName: browserName,
                DeviceModel: browserVersion,
                OsVersion: osVersion,
                PushNotifToken: "09125979838",
              },
              { headers: { AppVer: "1.16" } }
            )
            .then((res) => {
              console.log("res", res);
              let status = res.data.responseCode;
              let response = res.data.value.response;
              setLoading(false);
              if (
                res.data.message === "شماره همراه معرف وارد شده معتبر نمی باشد"
              ) {
                console.log(res);
                setReagentMobile("");
                setTextSnack(res.data.message);
                setSnackBar(true);
              } else if (status === 403) {
                setTextSnack(res.data.message);
                setSnackBar(true);
              }
              if (response === "true" || response === "Ok") {
                props.history.push("/confirm");
              }
              if (response === "Offer") {
                props.history.push("/confirm");
              }
              if (response === "NotOk") {
                let appLink = res.data.value.appLink;
                // setIsConnectionFailed(false);
                setUrl(appLink);
                setOpenOsModal(true);
              } else {
                props.history.push("/confirm");
              }
            })
            .catch((err) => {
              console.log("err", err);
              setLoading(false);
              setTextSnack("خطا در برقراری ارتباط با سرویس");
              setSnackBar(true);
            });
        }
      }
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  return (
    <div>
      <div className={classes.container}>
        <img
          src={require("../../assets/icons/4.png")}
          className={classes.img}
        />
        <p className={classes.text}>شماره موبایل خود را وارد کنید.</p>
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="شماره موبایل"
          type="number"
          variant="outlined"
          onChange={(e) => console.log(e.target.value)}
          onBlur={(e) => phoneValidation(e)}
          onFocus={() => setIsPhoneNum(true)}
        />
        {!isPhoneNum ? (
          <p className={classes.errorPhone}>شماره موبایل معتبر وارد کنید</p>
        ) : null}

        <div
          className={classes.enter}
          onClick={() => {
            setopenModal(true);
            setReagentMobile("");
          }}
        >
          <p style={{ marginTop: 0, marginBottom: 0 }}>ورود شماره معرف</p>
        </div>
        {loading ? (
          <CircularProgress color="secondary" style={{ marginTop: "13%" }} />
        ) : (
          <div
            className={classes.submitBtn}
            onClick={() => {
              setLoading(true);
              submitData();
            }}
          >
            ثبت نام
          </div>
        )}
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setopenModal(false)}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <div className={classes.container}>
          <p className={classes.errorPhone}>لطفا شماره معرف را وارد نمایید.</p>
          <CssTextField
            className={classes.margin}
            id="custom-css-standard-input"
            label="شماره معرف"
            type="number"
            variant="outlined"
            onBlur={(e) => reagentMobileValidation(e)}
            onFocus={() => setIsReagentMobile(true)}
          />
          {!isReagentMobile ? (
            <p className={classes.errorPhone}>شماره معرف نا معتبر است</p>
          ) : null}
          <div>
            <Submit
              text="ثبت"
              click={() => {
                setopenModal(false);
              }}
              disable={!isReagentMobile}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openOsmodal}
        onRequestClose={() => setOpenOsModal(false)}
        style={osModalStyles}
        overlayClassName={classes.osOverlay}
        contentLabel="Example Modal"
      >
        <OsModal url={url} />
      </Modal>
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

export default Register;
