import React, { useEffect, useState } from "react";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { moneySplitter, fil_zro } from "../../util/validators";

const RecieptQR = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
          خرید شارژ
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
          <span>شماره موبایل: </span>
          <span>{props.num}</span>
        </div>
        <div style={style.row}>
          <span>نوع شارژ: </span>
          <span>{props.chargeType}</span>
        </div>
        <div style={style.row}>
          <span>اپراتور: </span>
          <span>{props.operator}</span>
        </div>
        <div style={style.row}>
          <span>مبلغ پرداختی: </span>
          <span>
            {" "}
            {props.amount == 0 || props.amount == null
              ? "0"
              : moneySplitter(props.amount)}{" "}
            ریال{" "}
          </span>
        </div>
        {props.chargeMethod === "کد شارژ" && (
          <div style={style.row}>
            <span>کد شارژ: </span>
            <span>{props.chargeCode}</span>
          </div>
        )}
        <div style={style.row}>
          <span>کد رهگیری: </span>
          <span>{props.tranId}</span>
        </div>
        <div style={style.row}>
          <span>تاریخ تراکنش: </span>
          <span>{props.tranDate}</span>
        </div>
      </div>
    </div>
  );
};

const style = {
  row: {
    padding: "2%",
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

export default RecieptQR;
