import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./styles";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Submit from "../../../components/SubmitButton/SubmitButton";
import CropFreeIcon from "@material-ui/icons/CropFree";
const BillPay = () => {
  const CssTextField = withStyles({
    root: {
      fontFamily: "IRANSansMobile",
      direction: "rtl",
      width: "70%",

      marginTop: 15,
      "& label.Mui-focused": {
        color: "#CD0448",
        textAlign: "right",
        fontFamily: "IRANSansMobile",
        fontSize: 12.5,
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
            paddingRight: 5,
            paddingLeft: 5,
          },
        },
      },
    },
  })(TextField);
  const classes = styles();
  return (
    <div className={classes.container}>
      <CssTextField
        id="custom-css-standard-input"
        label="شناسه قبض"
        variant="outlined"
      />
      <CssTextField
        style={{ marginTop: 30 }}
        id="custom-css-standard-input"
        label="شناسه پرداخت"
        variant="outlined"
      />
      <div style={{ marginTop: 20 }}>
        <Submit text="ادامه" disable={true} />
      </div>
      <div className={classes.scanBtn}>
        <CropFreeIcon />

        <p style={{ margin: 0, fontFamily: "IRANSansMobile" }}>اسکن با بارکد</p>
      </div>
    </div>
  );
};

export default BillPay;
