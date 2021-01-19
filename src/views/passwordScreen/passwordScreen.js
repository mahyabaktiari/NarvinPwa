import React, { useState, useEffect } from "react";
import Input from "../../components/Input/input";
import Submit from "../../components/SubmitButton/SubmitButton";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const styles = makeStyles({
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
});
const PassWord = (props) => {
  const [password, setPassWord] = useState("");
  const [passwordType, setPassWordType] = useState("");
  const [enterPass, setEnterPass] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [back, setBack] = useState(false);

  const classes = styles();
  useEffect(() => {
    let pass = localStorage.getItem("passWord");
    setPassWord(pass);
    let passType = localStorage.getItem("passwordType");
    setPassWordType(passType);
  });

  const handleSubmit = () => {
    if (password !== enterPass) {
      setTextSnack("رمز ورود اشتباه است!");
      setSnackBar(true);
    } else {
      props.history.push("/QR");
    }
  };

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
  window.onpopstate = () => {
    setBack(true);
  };
  useEffect(() => {
    back ? popStateListener() : console.log("false");
  }, [back]);
  var backButtonPrevented = false;
  function popStateListener(event) {
    if (backButtonPrevented === false) {
      window.history.pushState(
        { name: "browserBack" },
        "on browser back click",
        window.location.href
      );
      backButtonPrevented = true;
      setBack(false);
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }
  window.addEventListener("popstate", popStateListener);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src={require("../../assets/icons/logo4.jpg")}
        style={{
          width: 80,
          marginTop: "10vh",
        }}
      />
      <div style={{ textAlign: "right", width: "65%", marginTop: 20 }}>
        <Input
          label="رمز ورود"
          type="password"
          value={enterPass}
          change={(e) => setEnterPass(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <Submit text="ورود" disable={!enterPass} click={() => handleSubmit()} />
      </div>
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
    </div>
  );
};

export default PassWord;
