import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ControlPointDuplicate, Phone } from "@material-ui/icons";
import axios from "axios";
import { Routes } from "../../api/api";
import Modal from "react-modal";
import useStyle from "./styles";
import OsModal from "../../components/osOldModal/osOldModal";

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
const SplashLanding = (props) => {
  let connecting = navigator.onLine;
  console.log(connecting);
  const [phoneNum, setPhoneNum] = useState("");
  const [imei, setImei] = useState("");
  const [isConnectionFailed, setIsConnectionFaild] = useState(false);
  const [appVersion, setAppVersion] = useState("");
  const [osModal, setOsModal] = useState(false);
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const [userPass, setUserPass] = useState("");
  const [isOnline, setIsOnLine] = useState(true);
  const [dLink, setdLink] = useState(null);
  const [appVerStatus, setAppVerStatus] = useState("");
  const [img, setImg] = useState(false);
  const classes = useStyle();
  setTimeout(() => {
    setImg(true);
  }, 1500);
  // this.state = {
  //   phoneNum: '',
  //   imei: '',
  //   isConnectionFailed: false,
  //   appVersion: '',
  //   osModal: false,
  //   url: '',
  //   token: '',
  //   fcmToken: '',
  //   userPass: '',
  //   isOnline: true,
  //   dLink: null,
  //   appVerStatus: '',
  // };

  // useEffect(() => {
  //   setPhoneNum(localStorage.getItem("phoneNumber"));
  //   setImei(localStorage.getItem("DeviceUniqId"));
  //   setAppVersion(localStorage.getItem("appVersoin"));
  // }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    userReg();
    getUserAccountID(token);
  }, []);

  const userReg = () => {
    console.log(phoneNum);
    console.log(imei);
    console.log(appVersion);
    console.log();
    let verify = localStorage.getItem("verify");
    let phone = localStorage.getItem("phoneNumber");
    let ime = localStorage.getItem("DeviceUniqId");
    console.log(verify);
    let passWord = localStorage.getItem("passwordType");
    console.log(passWord);
    if (verify && connecting) {
      setTimeout(() => {
        console.log(`${Routes.getToken}${phone}/${ime}/${Number(1.16)}`);
        axios
          .get(`${Routes.getToken}${phone}/${ime}/${Number(1.16)}`)
          .then((res) => {
            console.log(res);
            let hasPushNotif = res.data.value.pushNotifToken;
            console.log(`hasPushNotif? ${hasPushNotif}`);
            // hasPushNotif === false ? this.registerAppWithFCM() : null;
            let response = res.data.value.response;
            console.log(response);
            if (response === "Ok") {
              let token = res.data.value.token.accessToken;
              console.log("token", token);
              localStorage.setItem("token", token);

              setTimeout(() => {
                props.history.push("/QR");
              }, 1500);
            }
            //   await AsyncStorage.setItem("token", token);
            //   passwordType === "1" || passwordType === "2"
            //     ? this.props.navigation.navigate("Password")
            //     : this.selectDeeplink(DeepLink);
            // }
            if (response === "Offer") {
              setAppVerStatus(response);
              setIsConnectionFaild(false);
              let token = res.data.value.token.accessToken;
              setToken(token);
              localStorage.setItem("token", token);
              let appLink = res.data.value.appLink;
              setUrl(appLink);
              setOsModal(true);
            }
            if (response === "NotOk") {
              let appLink = res.data.value.appLink;
              setIsConnectionFaild(false);
              setUrl(appLink);
              setOsModal(true);
            }
            if (response === "ReReg") {
              console.log("ReReg");
              localStorage.clear();
              setTimeout(() => {
                props.history.push("/register");
              }, 1500);
            }
          })
          .catch((err) => {
            console.error("error login catch", err.response);
            setIsConnectionFaild(true);
          });
      }, 1000);
    } else if (verify === "true" && !connecting) {
      return;
    } else if (verify === null && connecting) {
      setTimeout(async () => {
        props.history.push("/register");
      }, 2000);
    } else if (verify === null && !connecting) {
      return;
    } else {
      console.log("error login else");
      setIsConnectionFaild(true);
    }
  };

  const getUserAccountID = (val) => {
    console.log(val);
    axios
      .get(`${Routes.ProfileEdit}`, { headers: { token: val } })
      .then((res) => {
        console.log("accountid is here", res.data.value.response.accountId);
        localStorage.setItem("userAcountId", res.data.value.response.accountId);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={require("../../assets/icons/NarvinLogo.gif")}
        style={{
          width: 100,
          height: 160,
          marginTop: "35vh",
          position: "absolute",
        }}
      />
      {img ? (
        <img
          src={require("../../assets/icons/logo4.jpg")}
          style={{
            width: 100,
            height: 160,
            marginTop: "35vh",
            position: "absolute",
          }}
        />
      ) : null}
      <div
        style={{
          marginTop: 50,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "55vh",
        }}
      >
        {isConnectionFailed ? (
          <div>
            <p style={{ fontFamily: "IRANSansMobile", color: "red" }}>
              ! عدم برقراری ارتباط
            </p>
            <div
              style={{
                backgroundColor: "gray",
                borderRadius: 10,
                padding: 10,
                textAlign: "center",
                color: "#fff",
                fontFamily: "IRANSansMobile",
                fontWeight: 200,
                marginTop: 30,
              }}
            >
              سعی مجدد
            </div>
          </div>
        ) : !connecting ? (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={require("../../assets/icons/no-wifi.png")}
              style={{ width: 35 }}
            />
            <p style={{ fontFamily: "IRANSansMobile", color: "red" }}>
              .لطفا اینترنت خود را فعال نمایید
            </p>
            <div
              style={{
                backgroundColor: "gray",
                borderRadius: 10,
                padding: 10,
                textAlign: "center",
                color: "#fff",
                fontFamily: "IRANSansMobile",
                fontWeight: 200,
                marginTop: 10,
              }}
            >
              سعی مجدد
            </div>
          </div>
        ) : null}
      </div>
      <Modal
        isOpen={osModal}
        onRequestClose={() => setOsModal(false)}
        style={osModalStyles}
        overlayClassName={classes.osOverlay}
        contentLabel="Example Modal"
      >
        <OsModal url={url} continue={() => props.history.push("/QR")} />
      </Modal>
    </div>
  );
};

export default SplashLanding;
