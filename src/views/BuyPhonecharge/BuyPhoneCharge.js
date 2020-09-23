import React from "react";
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

import styles from "./styles";

const BuyCharge = (props) => {
  const CssTextField = withStyles({
    root: {
      fontFamily: "IRANSansMobile",
      direction: "rtl",
      width: "60%",

      marginTop: 15,
      "& label.Mui-focused": {
        color: "#CD0448",
        textAlign: "right",
        fontFamily: "IRANSansMobile",
        fontSize: 15,
        top: -5,
      },
      "& .MuiInputLabel-formControl": {
        transform: "none",
        top: 20,
        right: 12,
        fontSize: 14,
        fontFamily: "IRANSansMobile",
      },
      "& .MuiInputLabel-sharink": {
        color: "#CD0448",
        textAlign: "right",
        right: 0,
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
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "gray",
          "& legend": {
            textAlign: "right",
          },
        },
        "&:hover fieldset": {
          borderColor: "#CD0448",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#CD0448",
          "& legend": {
            paddingRight: 10,
            paddingLeft: 10,
          },
        },
      },
    },
  })(TextField);
  const classes = styles();
  return (
    <React.Fragment>
      <Header
        text="شارژ تلفن همراه"
        click={() => props.history.push("/services")}
      />
      <div className={classes.container}>
        <CssTextField
          style={{ marginTop: 50, marginBottom: 20 }}
          id="custom-css-standard-input"
          label="شماره موبایل"
          variant="outlined"
        />
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
        <CssTextField
          style={{ marginTop: 30 }}
          id="custom-css-standard-input"
          label="مبلغ شارژ (ریال)"
          variant="outlined"
        />
        <Submit text="ادامه" disable={true} />
      </div>
      <NavigationBottom item="SERVISES" />
    </React.Fragment>
  );
};

export default BuyCharge;
