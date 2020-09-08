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

const Profile = (props) => {
  const classes = styles();
  const [phoneNum, setPhoneNum] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [imgUri, setImgUri] = useState("");
  console.log(phoneNum, token);
  useEffect(() => {
    let tokenStoreg = localStorage.getItem("token");
    setPhoneNum(localStorage.getItem("phoneNumber"));
    setToken(tokenStoreg);
    getProfileInfo(tokenStoreg);
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
        // this.setState({ name: info.firstName + " " + info.lastName });
        // this.setState({ imgUri: info.userImage });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Header text="پروفایل" />
        <div>
          <div className={classes.info}>
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
            <div className={classes.itemContainer}>
              <div className={classes.item}>
                <CropFreeRoundedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>بارکد من</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div className={classes.itemContainer}>
              <div className={classes.item}>
                <SmsOutlinedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>پیام ها</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>

            <div className={classes.itemContainer}>
              <div className={classes.item}>
                <TuneTwoToneIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>تنظیمات</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>

            <div className={classes.itemContainer}>
              <div className={classes.item}>
                <AssignmentOutlinedIcon style={{ width: 25, height: 25 }} />
                <p className={classes.itemTxt}>گزارشات</p>
              </div>
              <KeyboardArrowLeftRoundedIcon />
            </div>
            <div className={classes.itemContainer}>
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
            <div>
              <p className={classes.itemTxt}> تماس با پشتیبانی</p>
              <p className={classes.itemTxt}> 011-42267513</p>
            </div>
          </div>
        </div>
      </div>
      <NavigationBottom item="PROFILE" />
    </React.Fragment>
  );
};

export default withRouter(Profile);
