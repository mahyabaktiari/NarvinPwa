import React, { useEffect, useState } from "react";
import {
  ToRial,
  moneySplitter,
  getWalletBalanceAsync,
} from "../../util/validators";
const CharistyCard = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 70,
      }}
    >
      <div style={styles.container} key={props.key}>
        <div
          style={{
            alignSelf: "center",
            marginTop: "2%",
            marginBottom: "3.5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            resizeMode={"center"}
            style={{ width: 60 }}
            src={require("../../assets/icons/kheyrie.png")}
          />
          <span
            style={{
              color: "#fff",
              fontFamily: "IRANSansMobile",
              marginTop: 10,
              //fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            {props.info.title}
          </span>
        </div>
        <span
          style={{
            direction: "rtl",
            textAlign: "right",
            fontFamily: "IRANSansMobile",
            color: "#fff",
            padding: 10,
          }}
        >
          {" "}
          مبلغ پرداخت: {ToRial(props.payAmount)} ریال
        </span>
      </div>
      <div style={styles.footer}>
        <button
          style={{
            backgroundColor: "#610c34",
            borderRadius: 10,
            color: "#fff",
            width: "40%",
            padding: 10,
            fontFamily: "IRANSansMobile",
            fontSize: 18,
          }}
          onClick={() => props.payInit()}
        >
          پرداخت
        </button>
      </div>
    </div>
  );
};
const styles = {
  container: {
    backgroundColor: "#a01355",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "80%",
    // height: hp(35),
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    width: "30%",
    position: "absolute",
    right: "45%",
    top: "20%",
  },
  secondRow: {
    display: "flex",
    marginBottom: "4%",
  },
  footer: {
    width: "80%",
    // height: hp(45),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderRadius: 10,
    boxShadow: "grey 0px 4px 7px -2px",
    padding: 10,
    boxSizing: "border-box",
  },
};
export default CharistyCard;
