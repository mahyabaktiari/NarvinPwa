import React from "react";
import { moneySplitter } from "../../util/validators";

const NetCard = (props) => {
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
            style={{ width: 60, height: 60 }}
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
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "#a01355",
          color: "#fff",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: "10px",
          direction: "rtl",
          boxSizing: "border-box",
          fontFamily: "IRANSansMobile",
          paddingBottom: 50,
        }}
      >
        {
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 0,
              marginBottom: 20,
            }}
          >
            {renderBillLogo()}
          </div>
        }
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          <span>شماره موبایل: {props.num}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          <span>اپراتور: {props.operator}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          <span>{props.type}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          <span> مبلغ بسته : {moneySplitter(props.initialAmount)} ریال</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          <span>مبلغ قابل پرداخت: {moneySplitter(props.amount)} ریال</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          <span>(مبلغ با احتساب مالیات بر ارزش افزوده می باشد)</span>
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

export default NetCard;
