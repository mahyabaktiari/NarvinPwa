import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ControlPointDuplicate, Phone } from "@material-ui/icons";
import axios from "axios";
import { Routes } from "../../api/api";
import Modal from "react-modal";
import useStyle from "./styles";
import OsModal from "../../components/osOldModal/osOldModal";
import { browserName, browserVersion, osVersion } from "react-device-detect";
import { Button } from "@material-ui/core";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
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
  const [homeModal, sethomeModal] = useState(false);
  const classes = useStyle();
  console.log(browserName, "&", browserVersion, "&", osVersion);
  setTimeout(() => {
    setImg(true);
  }, 1500);

  useEffect(() => {
    if (!window.matchMedia("(display-mode: standalone)").matches) {
      const home = localStorage.getItem("addhome");
      if (home !== "0") {
        if (browserName === "Mobile Safari") {
          console.log("isSafari");
          sethomeModal(true);
        } else {
          console.log("isNotSafari");
          console.log("browserName", browserName);
          // userReg();
          sethomeModal(true);
        }
      } else {
        userReg();
      }
    } else {
      userReg();
    }
  }, []);
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
    let verify = localStorage.getItem("verify");
    console.log(verify);
    if (verify !== "true") {
      localStorage.setItem("messages", JSON.stringify([]));
    } else {
      return;
    }

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
        console.log(`${Routes.getToken}${phone}/${ime}/${Number(1.17)}`);
        axios
          .get(`${Routes.getToken}${phone}/${ime}/${Number(1.17)}`)
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
                passWord === "1" || passWord === "2"
                  ? props.history.push("/password")
                  : props.history.push("/QR");
              }, 1500);
            }
            //   await AsyncStorage.setItem("token", token);
            // passwordType === "1" || passwordType === "2"
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
      <Modal
        isOpen={homeModal}
        onRequestClose={() => sethomeModal(false)}
        style={customStyles}
        overlayClassName={classes.osOverlay}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 15,
            alignItems: "center",
            backgroundColor: "#eee",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          {browserName === "Mobile Safari" ? (
            <>
              <div
                style={{
                  width: " 90%",
                  borderRadius: 10,
                  height: "auto",
                  backgroundColor: "#fff",
                  boxShadow: "grey 0px 1px 7px -2px",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <img
                  src={require("../../assets/icons/logo4.jpg")}
                  style={{
                    width: 50,
                  }}
                />
                <span
                  style={{
                    fontFamily: "IRANSansMobile",
                    textAlign: "center",
                    marginTop: 15,
                    fontSize: "0.9rem",
                    borderBottom: "2px dotted #CD0448",
                    paddingBottom: 15,
                  }}
                >
                  وب اپلیکیشن ناروین را به صفحه اصلی تلفن همراه خود اضافه کنید.
                </span>
                <p
                  style={{
                    display: "flex",
                    direction: "rtl",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                    width: "100%",
                    fontSize: "0.85rem",
                    marginTop: 30,
                  }}
                >
                  1- در نوار پایین دکمه{" "}
                  <img
                    src={require("../../assets/icons/share.png")}
                    style={{ padding: 5, paddingTop: 0, width: "8%" }}
                  />{" "}
                  را انتخاب کنید.
                </p>
                <p
                  style={{
                    direction: "rtl",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                    width: "100%",
                    fontSize: "0.85rem",
                    marginTop: 0,
                  }}
                >
                  2- منوی باز شده را بالا بکشید و گزینه{" "}
                  <span
                    style={{
                      color: "#CD0448",
                      padding: "0px 5px",
                      fontWeight: "bold",
                    }}
                  >
                    Add to home
                  </span>{" "}
                  را انتخاب کنید .
                </p>
                <img
                  src={require("../../assets/icons/iphone-share-16.jpg")}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    boxShadow: "0px 0px 8px 0px #80808075",
                  }}
                />
                <p
                  style={{
                    direction: "rtl",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                    width: "100%",
                    fontSize: "0.85rem",
                    marginTop: 25,
                    marginBottom: 0,
                  }}
                >
                  3- در مرحله بعد، در قسمت بالا روی
                  <span
                    style={{
                      color: "#CD0448",
                      padding: "0px 5px",
                      fontWeight: "bold",
                    }}
                  >
                    Add
                  </span>{" "}
                  کلیک کنید.
                </p>
              </div>
              <Button
                style={{
                  width: "90%",
                  marginTop: 20,
                  backgroundColor: "#CD0448",
                  color: "#fff",
                  fontSize: "1rem",
                  fontFamily: "IRANSansMobile",
                }}
                onClick={() => {
                  sethomeModal(false);
                  userReg();
                }}
              >
                متوجه شدم
              </Button>
            </>
          ) : (
            <>
              {" "}
              <div
                style={{
                  width: " 90%",
                  borderRadius: 10,
                  height: "auto",
                  backgroundColor: "#fff",
                  boxShadow: "grey 0px 1px 7px -2px",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <img
                  src={require("../../assets/icons/logo4.jpg")}
                  style={{
                    width: 70,
                  }}
                />
                <span
                  style={{
                    fontFamily: "IRANSansMobile",
                    textAlign: "center",
                    marginTop: 15,
                    fontSize: "0.9rem",
                    borderBottom: "2px dotted #CD0448",
                    paddingBottom: 15,
                  }}
                >
                  وب اپلیکیشن ناروین را به صفحه اصلی تلفن همراه خود اضافه کنید.
                </span>
                <p
                  style={{
                    display: "flex",
                    direction: "rtl",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                    width: "100%",
                    fontSize: "0.85rem",
                    marginTop: 30,
                  }}
                >
                  1- در نوار بالا دکمه{" "}
                  <MoreVertRoundedIcon
                    style={{ color: "#CD0448", padding: 3, paddingTop: 0 }}
                  />{" "}
                  انتخاب کنید .
                </p>
                <p
                  style={{
                    direction: "rtl",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                    width: "100%",
                    fontSize: "0.85rem",
                    marginTop: 0,
                  }}
                >
                  2- در منوی باز شده گزینه
                  <span
                    style={{
                      color: "#CD0448",
                      padding: "0px 5px",
                      fontWeight: "bold",
                    }}
                  >
                    Add to home
                  </span>{" "}
                  را انتخاب کنید .
                </p>
                <p
                  style={{
                    direction: "rtl",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                    width: "100%",
                    fontSize: "0.85rem",
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                >
                  3- در مرحله بعد، در قسمت پایین روی
                  <span
                    style={{
                      color: "#CD0448",
                      padding: "0px 5px",
                      fontWeight: "bold",
                    }}
                  >
                    Add
                  </span>{" "}
                  کلیک کنید.
                </p>
              </div>
              <Button
                style={{
                  width: "90%",
                  marginTop: 20,
                  backgroundColor: "#CD0448",
                  color: "#fff",
                  fontSize: "1rem",
                  fontFamily: "IRANSansMobile",
                }}
                onClick={() => {
                  sethomeModal(false);
                  userReg();
                }}
              >
                متوجه شدم
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SplashLanding;
