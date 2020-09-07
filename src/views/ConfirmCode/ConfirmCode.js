import React, { useState, useEffect } from "react";
import useStyle from "./style";
import Header from "../../components/Header/Header";
import ReactCodeInput from "react-verification-code-input";
import ReplayIcon from "@material-ui/icons/Replay";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { Routes } from "../../api/api";
import axios from "axios";

const ConfirmCode = () => {
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    const id = setTimeout(() => {
      if (timer > 0) {
        const count = timer - 1;
        setTimer(count);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const codeVerify = (code) => {
    console.log(code);
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
        <p className={classes.text}>09125979838</p>
        <p className={classes.text}>لطفا کد ارسال شده را وارد کنید .</p>
        <ReactCodeInput
          type="number"
          fields={6}
          fieldWidth={50}
          onChange={() => console.log("change")}
          activeColor="#CD0448"
          className={classes.input}
          onComplete={(code) => codeVerify(code)}
        />
        <p className={classes.timer}>{timer}</p>
        <div className={classes.sendAgain}>
          ارسال مجدد کد فعال سازی <ReplayIcon />{" "}
        </div>
        <div className={classes.mobile}>
          تصحیح شماره موبایل <PhoneIphoneIcon />{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfirmCode;
