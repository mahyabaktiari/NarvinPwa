import React, { useState, useEffect } from "react";
import { moneySplitter } from "../../util/validators";

const ChargeCard = (props) => {
  const renderBillLogo = () => {
    switch (props.operator) {
      case "همراه اول":
        return (
          <img
            resizeMode={"center"}
            style={{ width: 60, height: 60 }}
            src={require("../../assets/icons/MCI.png")}
          />
        );
      case "ایرانسل":
        return (
          <img
            resizeMode={"center"}
            style={{ width: 60, height: 60 }}
            src={require("../../assets/icons/Irancell.png")}
          />
        );
      case "رایتل":
        return (
          <img
            resizeMode={"center"}
            style={{ width: 60, height: 60 }}
            src={require("../../assets/icons/Rightel.png")}
          />
        );
      case "تلفن":
        return (
          <img
            resizeMode={"center"}
            style={{ width: 60, height: 50 }}
            src={require("../../assets/icons/TC.png")}
          />
        );
      default:
        break;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "#a01355",
          display: "flex",
          flexDirection: "column",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          padding: 10,
          boxSizing: "border-box",
          paddingBottom: 30,
        }}
      >
        <div style={{ alignSelf: "center" }}>{renderBillLogo()}</div>
        <div
          style={{
            color: "#fff",
            fontFamily: "IRANSansMobile",
            marginTop: 20,
            fontSize: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <span style={{ marginTop: 5 }}>شماره موبایل: {props.num}</span>
          <span style={{ marginTop: 5 }}>نوع شارژ: {props.type}</span>
          <span style={{ marginTop: 5 }}>
            مبلغ شارژ: {moneySplitter(props.amount)} ریال
          </span>
          <span style={{ marginTop: 5 }}>اوپراتور: {props.operator}</span>
        </div>
      </div>
      <div
        style={{
          padding: 10,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          width: "80%",
          boxShadow: "0px 2px 14px -4px gray",
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <button
          style={{
            width: "60%",
            border: "none",
            borderRadius: 10,
            backgroundColor: "#610c34",
            color: "#fff",
            fontFamily: "IRANSansMobile",
            padding: 10,
            fontSize: 16,
          }}
          onClick={() => props.payInit()}
        >
          پرداخت
        </button>
      </div>
    </div>
  );
};

export default ChargeCard;
