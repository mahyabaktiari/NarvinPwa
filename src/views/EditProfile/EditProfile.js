import React from "react";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import styles from "./styles";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SubminBtn from "../../components/SubmitButton/SubmitButton";

const EditProfile = () => {
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
  const classes = styles();
  return (
    <React.Fragment>
      <div className={classes.container}>
        <img
          src={require("../../assets/icons/profile.png")}
          className={classes.img}
        />
        <div className={classes.phone}>
          <p className={classes.phoneTxt}>09125979838</p>
          <PhoneIphoneOutlinedIcon />
        </div>
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="نام(الزامی)"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="نام خانوادگی(الزامی)"
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
          label="شماره ملی(الزامی)"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="تاریخ تولد(الزامی)"
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
          label="شناسه واریز"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          label="استان"
          variant="outlined"
        />
        <CssTextField
          className={classes.margin}
          label="شهر"
          variant="outlined"
        />
        <SubminBtn text="ثبت اطلاعات" />
      </div>
      <NavigationBottom item="PROFILE" />
    </React.Fragment>
  );
};

export default EditProfile;
