import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Modal from "react-modal";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Input from "../../components/Input/input";
import Submit from "../../components/SubmitButton/SubmitButton";
import Snackbar from "@material-ui/core/Snackbar";

const Setting = (props) => {
  const customStyles = {
    content: {
      width: "80%",
      height: "40vh",
      top: "25vh",
      bottom: 0,
      right: 0,
      left: "10%",
      padding: 0,
      border: "none",
      borderRadius: 10,
    },
  };
  const styles = makeStyles({
    myoverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    root: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: "red",
        justifyContent: "center",
        fontFamily: "IRANSansMobile",
        flexGrow: 0,
        marginBottom: "10%",
        direction: "rtl",
      },
    },
    rootSuccsess: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: "green",
        justifyContent: "center",
        fontFamily: "IRANSansMobile",
        flexGrow: 0,
        marginBottom: "10%",
        direction: "rtl",
      },
    },
  });
  const classes = styles();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [success, setSuccess] = useState(false);
  const [istaPass, setIstaPass] = useState(false);

  useEffect(() => {
    let pass = localStorage.getItem("passWord");
    pass ? setIstaPass(true) : setIstaPass(false);
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  useEffect(() => {
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, []);
  var backButtonPrevented = false;
  function popStateListener(event) {
    if (backButtonPrevented === false) {
      window.history.pushState(null, "gfgfg", window.location.href);
      console.log("Back Button Prevented");
      backButtonPrevented = true;
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  window.addEventListener("popstate", popStateListener);
  const confirm = () => {
    if (newPass !== repeatPass) {
      setSuccess(false);
      setTextSnack("رمز عبور و تکرار رمز عبور باید یکی باشند");
      setSnackBar(true);
    } else {
      if (newPass.length < 4 || repeatPass.length < 4) {
        setSuccess(false);
        setTextSnack("طول رمز عبور باید بین 4 الی 10 رقم باشد!");
        setSnackBar(true);
      } else {
        localStorage.setItem("passWord", newPass);
        localStorage.setItem("passwordType", "1");
        setSuccess(true);
        setTextSnack("رمز عبور بروزرسانی شد.");
        setSnackBar(true);
        setOpen(false);
        setNewPass("");
        setRepeatPass("");
        setIstaPass(true);
      }
    }
  };

  const remove = () => {
    let pass = localStorage.getItem("passWord");
    if (newPass !== pass) {
      setSuccess(false);
      setTextSnack(`رمز عبور اشتباه است!`);
      setSnackBar(true);
    } else {
      localStorage.removeItem("passWord");
      localStorage.setItem("passwordType", "0");
      setIstaPass(false);
      setOpen(false);
      setSuccess(true);
      setTextSnack(`رمز عبور حذف گردید`);
      setSnackBar(true);
      setNewPass("");
    }
  };
  return (
    <>
      <Header text="تنظیمات" click={() => props.history.push("/profile")} />
      <div
        style={{
          paddingTop: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            borderRadius: 10,
            border: "1px solid gray",
            fontFamily: "IRANSansMobile",
            padding: "0px 10px",
            boxSizing: "border-box",
            fontSize: 16,
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={active}
                  onChange={() => setActive(!active)}
                  name="checkedA"
                />
              }
            />
            <span>فعال کردن رمز</span>
          </div>
          <div
            style={{
              display: active ? "flex" : "none",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={istaPass}
                  onChange={() => setOpen(!open)}
                  name="checkedA"
                />
              }
            />
            <span>رمز ایستا</span>
          </div>
        </div>
        <Modal
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
          }}
          style={customStyles}
          overlayClassName={classes.myoverlay}
          contentLabel="Example Modal"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#CD0448",
              fontFamily: "IRANSansMobile",
              padding: "15px 35px",
              direction: "rtl",
              fontSize: 14,
            }}
          >
            {istaPass ? (
              <>
                <span>لطفا رمز مورد نظر را وارد نمایید.</span>
                <Input
                  label="رمزعبور"
                  value={newPass}
                  change={(e) => setNewPass(e.target.value)}
                  type="password"
                />
                <Submit text="حذف" disable={!newPass} click={() => remove()} />
              </>
            ) : (
              <>
                <span>لطفا رمز مورد نظر را وارد نمایید.</span>
                <Input
                  label="رمزعبور جدید"
                  value={newPass}
                  change={(e) => setNewPass(e.target.value)}
                  type="password"
                />
                <Input
                  label="تکرار رمزعبور"
                  value={repeatPass}
                  change={(e) => setRepeatPass(e.target.value)}
                  type="passWord"
                />
                <div>
                  <Submit
                    text="تایید"
                    disable={!newPass || !repeatPass}
                    click={() => confirm()}
                  />
                </div>{" "}
              </>
            )}
          </div>
        </Modal>
        <Snackbar
          open={snackBar}
          autoHideDuration={5000}
          message={textSnack}
          onClose={handleClose}
          className={success ? classes.rootSuccsess : classes.root}
        />
      </div>
      <NavigationBottom item="PROFILE" />
    </>
  );
};

export default Setting;
