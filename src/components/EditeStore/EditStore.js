import React, { useEffect, useState } from "react";
import styles from "./styles";
import { requirePropFactory } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CropFreeRoundedIcon from "@material-ui/icons/CropFreeRounded";
import axios from "axios";
import { Routes } from "../../api/api";
import TextField from "@material-ui/core/TextField";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import SubminBtn from "../SubmitButton/SubmitButton";

const EditeStore = ({ storeInfo }) => {
  const classes = styles();
  const CssTextField = withStyles({
    root: {
      fontFamily: "IRANSansMobile",
      direction: "rtl",
      marginTop: 15,
      "& label.Mui-focused": {
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
        },
      },
    },
  })(TextField);

  return (
    <>
      <div className={classes.modalContainer}>
        <img
          src={require("../../assets/icons/profile.png")}
          className={classes.img}
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="نام فروشگاه"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="نوع پذیرنده"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="نوع فعالیت"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="مبلغ پیشفرض تراکنش(ریال)"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="شماره تلفن فروشگاه(الزامی)"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="شماره موبایل(الزامی)"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="استان"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="شهر"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="آدرس(الزامی)"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="موقعیت فروشگاه"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="کد پستی"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="شماره شبا"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="ایمیل"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="آدرس سایت فروشگاه"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="شماره جواز کسب و کار"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="شماره صنفی"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="تاریخ انقضای جواز کسب"
          variant="outlined"
        />
        <SubminBtn text="ثبت اطلاعات" />
      </div>
    </>
  );
};

export default EditeStore;
