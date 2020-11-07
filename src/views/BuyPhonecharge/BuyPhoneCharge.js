import React, { useState } from "react";
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

const BuyCharge = (props) => {
  const [token, setToken] = useState("");
  const [simNum, setSimNum] = useState("");
  const [faveNums, setFaveNums] = useState("");
  console.log("simNum", simNum);
  useState(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    setSimNum(localStorage.getItem("phoneNumber"));
    getFavs(tokenStorage);
  }, []);

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
  const classes = styles();
  return (
    <React.Fragment>
      <Header
        text="شارژ تلفن همراه"
        click={() => props.history.push("/services")}
      />
      <div className={classes.container}>
        <div style={{ width: "60%", textAlign: "right" }}>
          <Input label="شماره موبایل" />
        </div>

        <div className={classes.item}>
          <img
            src={require("../../assets/icons/Favorites.png")}
            className={classes.img}
          />
          <img
            src={require("../../assets/icons/SimCard.png")}
            className={classes.img}
          />
          <img
            src={require("../../assets/icons/Contacts.png")}
            className={classes.img}
          />
        </div>
        <div className={classes.item}>
          <img
            src={require("../../assets/icons/Rightel.png")}
            className={classes.img2}
          />
          <img
            src={require("../../assets/icons/Irancell.png")}
            className={classes.img2}
          />
          <img
            src={require("../../assets/icons/MCI.png")}
            className={classes.img2}
          />
        </div>
        <div style={{ width: "60%", textAlign: "right" }}>
          <Input label="مبلغ شارژ (ریال)" />
        </div>

        <Submit text="ادامه" disable={true} />
      </div>
      <NavigationBottom item="SERVISES" />
    </React.Fragment>
  );
};

export default BuyCharge;
