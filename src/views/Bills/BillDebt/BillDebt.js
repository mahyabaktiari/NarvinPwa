import React, { useState } from "react";
import styles from "./styles";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Submit from "../../../components/SubmitButton/SubmitButton";
import CropFreeIcon from "@material-ui/icons/CropFree";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const BillDebt = () => {
  const classes = styles();
  const [showEl, setShowEl] = useState(false);
  const [showWT, setShowWt] = useState(false);
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
            paddingRight: 10,
            paddingLeft: 10,
          },
        },
      },
    },
  })(TextField);
  const customStyles = {
    content: {
      width: "100%",
      height: "92vh",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      padding: 0,
    },
  };
  return (
    <div className={classes.container}>
      <div className={classes.item} onClick={() => setShowEl(true)}>
        <p style={{ margin: 3 }}>برق</p>
        <img
          src={require("../../../assets/icons/EL.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item}>
        <p style={{ margin: 3 }}>آب</p>
        <img
          src={require("../../../assets/icons/WA.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item}>
        <p style={{ margin: 3 }}>گاز</p>
        <img
          src={require("../../../assets/icons/GA.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item}>
        <p style={{ margin: 3 }}>تلفن</p>
        <img
          src={require("../../../assets/icons/TC.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item} onClick={() => setShowWt(true)}>
        <p style={{ margin: 3 }}>همراه اول</p>
        <img
          src={require("../../../assets/icons/MC.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item}>
        <p style={{ margin: 3 }}>ایرانسل</p>
        <img
          src={require("../../../assets/icons/MTN.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item}>
        <p style={{ margin: 3 }}>مالیات</p>
        <img
          src={require("../../../assets/icons/TA.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item}>
        <p style={{ margin: 3 }}>شهرداری</p>
        <img
          src={require("../../../assets/icons/MU.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item}>
        <p style={{ margin: 3 }}>راهنمایی رانندگی</p>
        <img
          src={require("../../../assets/icons/FZ.png")}
          className={classes.img}
        />
      </div>
      <Modal
        isOpen={showEl}
        onRequestClose={() => setShowEl(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={classes.addGH}>
          <AddIcon />
          <p style={{ margin: 3 }}>افزودن قبض</p>
        </div>
      </Modal>
      <Modal
        isOpen={showWT}
        onRequestClose={() => showWT(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={classes.containerWater}>
          <img
            src={require("../../../assets/icons/MCI.png")}
            className={classes.imgWater}
          />
          <CssTextField
            style={{ marginTop: 50 }}
            id="custom-css-standard-input"
            label="شماره موبایل همراه اول"
            variant="outlined"
          />
          <FormControl
            component="fieldset"
            style={{
              width: "70%",
              boxSizing: "border-box",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              border: "1px solid gray",
              borderRadius: 10,
              backgroundColor: "#eee",
              marginTop: 10,
            }}
          >
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="میان دوره"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                fontFamily: "IRANSansMobile",
              }}
            >
              <FormControlLabel
                style={{
                  fontFamily: "IRANSansMobile !important",
                }}
                value="میان دوره"
                control={
                  <Radio
                    color="secondary"
                    style={{
                      fontFamily: "IRANSansMobile !important",
                    }}
                  />
                }
                label="میان دوره"
                labelPlacement="start"
              />
              <FormControlLabel
                value="پایان دوره"
                control={<Radio color="secondary" />}
                label="پایان دوره"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
          <Submit text="استعلام" />
        </div>
      </Modal>
    </div>
  );
};

export default BillDebt;
