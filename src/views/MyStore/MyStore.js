import React, { useState } from "react";
import styles from "./styles";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Store from "../../components/Store/Store";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import SubminBtn from "../../components/SubmitButton/SubmitButton";
import Header from "../../components/Header/Header";

const MyStore = (props) => {
  const customStyles = {
    content: {
      width: "100%",
      height: "90vh",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      padding: 0,
    },
  };
  var subtitle;

  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
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
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Header
          text="فروشگاه من"
          click={() => props.history.push("/profile")}
        />
        <div className={classes.addStore} onClick={() => setOpen(true)}>
          <AddRoundedIcon />
          <p style={{ margin: 0, marginTop: 5, paddingLeft: 10 }}>
            {" "}
            افزودن فروشگاه
          </p>
        </div>
        <div>
          <Store />
        </div>
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
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
        </Modal>
      </div>

      <NavigationBottom item="PROFILE" />
    </React.Fragment>
  );
};

export default MyStore;
