import React from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import style from "./styles";
import Iframe from "react-iframe";

const Refound = () => {
  const classes = style();
  return (
    <div style={{ paddingTop: 80 }}>
      <Header text="دریافت وجه" />
      <div className={classes.balance}>موجودی فعلی(0 ریال)</div>
      <Iframe
        // url="https://pna.shaparak.ir/token:" + token
        width="100%"
        height="500"
        id="myId"
        className="myClassname"
        display="initial"
        position="absoulote"
      />
      <NavigationBottom item="PROFILE" />
    </div>
  );
};

export default Refound;
