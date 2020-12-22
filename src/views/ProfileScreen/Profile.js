import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./styles";
import PersonIcon from "@material-ui/icons/Person";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import CropFreeRoundedIcon from "@material-ui/icons/CropFreeRounded";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import TuneTwoToneIcon from "@material-ui/icons/TuneTwoTone";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import HeadsetMicRoundedIcon from "@material-ui/icons/HeadsetMicRounded";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { Routes } from "../../api/api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const Profile = (props) => {
  const classes = styles();
  const [phoneNum, setPhoneNum] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [imgUri, setImgUri] = useState(true);
  console.log(phoneNum, token);
  const [backdrop, setBackdrop] = useState(true);
  const [newMassage, setNewMassage] = useState(0);
  useEffect(() => {
    let tokenStoreg = localStorage.getItem("token");
    setPhoneNum(localStorage.getItem("phoneNumber"));
    setToken(tokenStoreg);
    getProfileInfo(tokenStoreg);
    getMessages(tokenStoreg);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getProfileInfo = (token) => {
    axios
      .get(Routes.ProfileEdit, { headers: { token: token } })
      .then((res) => {
        console.log(res);
        let info = res.data.value.response;
        console.log(info.firstName + " " + info.lastName);
        setName(info.firstName + " " + info.lastName);
        setImgUri(info.userImage);
        console.log(info.userImage);
        setBackdrop(false);
        // this.setState({ name: info.firstName + " " + info.lastName });
        // this.setState({ imgUri: info.userImage });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getMessages = (token) => {
    let Messages = [];
    let message = localStorage.getItem("messages");
    let oldMsgs = JSON.parse(message);
    console.log("oldmsgs", oldMsgs);
    let oldLength = oldMsgs.length;
    Messages = oldMsgs;
    axios
      .put(`${Routes.GetMessages}`, {}, { headers: { token: token } })
      .then((res) => {
        console.log("new message", res);
        let status = res.data.responseCode;
        let msgs = res.data.value.response;
        if (status === 200 && msgs.length !== 0) {
          let mixed = Messages.concat(msgs);
          // remove duplicate msgs
          let Sorted = Array.from(new Set(mixed.map((old) => old.id))).map(
            (id) => {
              return mixed.find((old) => old.id === id);
            }
          );
          if (Sorted.length !== 0) {
            let newLength = Sorted.length - oldLength;
            // this.setState({
            //   newMessages: this.state.newMessages + newLength,
            // });
            setNewMassage(newLength);
            Messages = Sorted;
            localStorage.setItem("messages", JSON.stringify(Messages));
            Sorted.map((msg) => {
              axios
                .put(
                  `${Routes.IRecivedMessages}`,
                  { id: msg.id },
                  { headers: { token: token } }
                )
                .then((res) => console.log("sent confirm", res))
                .catch((err) => console.log(err.response));
            });
          } else {
            return;
          }
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <div className={classes.container}>
        <Header text="پروفایل" />
        <div>
          <div
            className={classes.info}
            onClick={() => props.history.push("/editPro")}
          >
            <img
              // src={require("../../assets/icons/profile.png")}
              src={imgUri}
              className={classes.img}
            />
            <p style={{ color: "#CD0448" }}>{name}</p>
          </div>
          <div className={classes.box}>
            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./editPro")}
            >
              <div className={classes.item}>
                <PersonIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>ویرایش مشخصات</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./myStore")}
            >
              <div className={classes.item}>
                <StoreRoundedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>فروشگاه من</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./wallet")}
            >
              <div className={classes.item}>
                <AccountBalanceWalletOutlinedIcon
                  style={{ width: 25, height: 25 }}
                />
                <p className={classes.itemTxt}>کیف پول</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./refound")}
            >
              <div className={classes.item}>
                <PaymentRoundedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>دریافت وجه</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./myQR")}
            >
              <div className={classes.item}>
                <CropFreeRoundedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>بارکد من</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./msg")}
            >
              <div className={classes.item}>
                <SmsOutlinedIcon style={{ width: 25, height: 25 }} />
                <span className={classes.itemTxt}>پیام ها</span>
                {newMassage > 0 && (
                  <div
                    style={{
                      color: "#fff",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "4px 9px",
                    }}
                  >
                    <span style={{ fontFamily: "none" }}>{newMassage}</span>
                  </div>
                )}
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>

            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./setting")}
            >
              <div className={classes.item}>
                <TuneTwoToneIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>تنظیمات</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>

            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./report")}
            >
              <div className={classes.item}>
                <AssignmentOutlinedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>گزارشات</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div
              className={classes.itemContainer}
              onClick={() => props.history.push("./about")}
            >
              <div className={classes.item}>
                <InfoOutlinedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>درباره ما</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div className={classes.itemContainer} style={{ border: "none" }}>
              <div className={classes.item}>
                <ExitToAppOutlinedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>خروج از برنامه</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
          </div>
          <div className={classes.supportBox}>
            <HeadsetMicRoundedIcon
              style={{ width: 30, height: 30, color: "gray" }}
            />
            <div onClick={() => (window.location.href = "tel:01142267513")}>
              <p className={classes.itemTxt}> تماس با پشتیبانی</p>
              <p className={classes.itemTxt}> 011-42267513</p>
            </div>
          </div>
        </div>
        <Backdrop
          className={classes.root}
          open={backdrop}
          onClick={() => setBackdrop(false)}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
      </div>
      <NavigationBottom item="PROFILE" />
    </div>
  );
};

export default withRouter(Profile);
