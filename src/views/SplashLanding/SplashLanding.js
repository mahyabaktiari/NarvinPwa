import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ControlPointDuplicate, Phone } from "@material-ui/icons";
import axios from "axios";
import { Routes } from "../../api/api";

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
    userReg();
  }, []);

  const userReg = () => {
    console.log(phoneNum);
    console.log(imei);
    console.log(appVersion);
    console.log();
    let verify = localStorage.getItem("verify");
    let phoneNu = localStorage.getItem("phoneNumber");
    let ime = localStorage.getItem("DeviceUniqId");
    console.log(verify);
    let passWord = localStorage.getItem("passwordType");
    console.log(passWord);
    if (verify && connecting) {
      setTimeout(() => {
        console.log(`${Routes.getToken}${phoneNu}/${ime}/${Number(1.16)}`);
        axios
          .get(`${Routes.getToken}${phoneNu}/${ime}/${Number(1.16)}`)
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
              props.history.push("/QR");
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
              props.history.push("/register");
            }
          })
          .catch((err) => {
            console.error("error login catch", err.response);
            //  return this.setState({ isConnectionFailed: true });
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
      return this.setState({ isConnectionFailed: true });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 100,
      }}
    >
      <img
        src={require("../../assets/icons/4.png")}
        style={{ width: 80, height: 120 }}
      />
      <div
        style={{
          marginTop: 50,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              marginTop: 50,
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
                marginTop: 30,
              }}
            >
              سعی مجدد
            </div>
          </div>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </div>
    </div>
  );
};

export default SplashLanding;
