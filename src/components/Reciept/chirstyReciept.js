import React, { useEffect, useState } from "react";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { moneySplitter, fil_zro } from "../../util/validators";

const Recieptchirsty = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 30,
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <img
        src={require("../../assets/icons/circLogo.png")}
        style={{ width: "20%", borderRadius: "50%", zIndex: 100 }}
      />
      <div
        style={{
          backgroundColor: "#610c34",
          marginTop: "-8%",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "10%",
        }}
      >
        <span
          style={{
            marginTop: 10,
            fontSize: "1rem",
            fontFamily: "IRANSansMobile",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          پرداخت به خیریه
        </span>
        <div
          style={{
            padding: 5,
            borderRadius: 10,
            backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "85%",
            marginTop: 20,
            marginBottom: 10,
            boxSizing: "border-box",
          }}
        >
          <CheckRoundedIcon style={{ color: "#fff", fontWeight: "bold" }} />
          <span
            style={{
              color: "#fff",
              fontSize: "0.8rem",
              fontFamily: "IRANSansMobile",
              marginTop: 10,
            }}
          >
            تراکنش با موفقیت انجام شد
          </span>
        </div>
        <div style={style.row}>
          <span>نام خیریه: </span>
          <span>{props.name}</span>
        </div>
        <div style={style.row}>
          <span>مبلغ پرداخت: </span>
          <span>{moneySplitter(props.reciept.amount)}</span>
        </div>
        <div style={style.row}>
          <span>کد رهگیری: </span>
          <span>{props.reciept.id}</span>
        </div>
        <div style={style.row}>
          <span>تاریخ تراکنش: </span>
          <span>{props.reciept.creationJalaliDateTime}</span>
        </div>
      </div>
    </div>
  );
};

const style = {
  row: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "85%",
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    boxSizing: "border-box",
    direction: "rtl",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    fontSize: "0.9rem",
  },
};

export default Recieptchirsty;
