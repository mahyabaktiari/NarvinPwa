import React from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import styles from "./styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

const Wallet = () => {
  const classes = styles();
  return (
    <React.Fragment>
      <Header text="کیف پول" />
      <div className={classes.container}>
        <p>موجودی فعلی(ریال)</p>
        <div className={classes.balance}>0 ریال</div>
        <p>مبلغ دلخواه خود را جهت شارژ کیف پول وارد نمایید</p>
        <p>مبلغ شارژ (ریال)</p>
        <input className={classes.input} />
        <div className={classes.submit}>
          <AddRoundedIcon
            style={{
              width: 30,
              height: 30,
              paddingRight: 5,
              fontWeight: "bold",
            }}
          />
          افزایش موجودی
        </div>
      </div>
      <NavigationBottom item="PROFILE" />
    </React.Fragment>
  );
};

export default Wallet;
