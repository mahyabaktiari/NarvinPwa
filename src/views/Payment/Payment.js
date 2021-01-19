import React, { useEffect, useState } from "react";
import NewWindow from "react-new-window";
import utils from "../../components/wheelpicker/utils";
import { usePayDispatch, usePayState } from "../../context/payContex";
const Pay = (props) => {
  const { url } = usePayState();
  let myWindow;
  useEffect(() => {
    if (url) {
      openWin();
    } else {
      alert("nourl");
    }
  }, []);
  const openWin = () => {
    myWindow = window.open(`${url}`, "_self");
    // myWindow.focus();
    // // myWindow.setTimeout(window.close(), 2000);
    // if (null == myWindow) {
    //   myWindow = window.parent.opener;
    // }
    // myWindow.location.href = myWindow.location.href;
    // window.top.close();
  };
  const checkWin = () => {
    if (!myWindow) {
      // alert("colse");
    } else {
      alert(window.top.closed);
      if (window.opener.closed) {
        props.history.push("./wallet");
      }
      // if (myWindow.opener) {
      //   alert("colse");
      // }
    }
  };
  function closeWin() {
    if (myWindow) {
      myWindow.close();
    }
  }

  window.onfocus = () => {
    alert(myWindow.closed);
    if (!myWindow.closed) {
      window.top.close();
      alert(window.top.closed);
      window.location.href = window.location.href;
    }
  };
  setInterval(() => {
    checkWin();
  }, 2000);
  // window.open(`${url}`, "_self").onbeforeunload = function () {
  //   alert("close");
  //   return "Are you really want to perform the action?";
  // };

  return (
    <div style={{ backgroundColor: "transparent" }}>{props.history.action}</div>
  );
};

export default Pay;
