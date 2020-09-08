import React from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import style from "./styles";

const Refound = () => {
  const classes = style();
  return (
    <div style={{ paddingTop: 80 }}>
      <Header text="دریافت وجه" />
      <div className={classes.balance}>موجودی فعلی(0 ریال)</div>
      <NavigationBottom item="PROFILE" />
    </div>
  );
};

export default Refound;
