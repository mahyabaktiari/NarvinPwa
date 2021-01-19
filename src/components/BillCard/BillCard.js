import React, { useEffect, useState } from "react";
import PhoneIphoneRoundedIcon from "@material-ui/icons/PhoneIphoneRounded";
import { moneySplitter } from "../../util/validators";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
const BillCard = (props) => {
  const renderBillLogo = () => {
    switch (props.BillTitle) {
      case "آب":
        return (
          <img
            resizeMode={"center"}
            style={{ width: 60, height: 50 }}
            src={require("../../assets/icons/WA.png")}
          />
        );
      case "برق":
        return (
          <img
            resizeMode={"center"}
            style={{ width: 60, height: 50 }}
            src={require("../../assets/icons/EL.png")}
          />
        );
      case "گاز":
        return (
          <img
            resizeMode={"center"}
            style={{ width: 60, height: 50 }}
            src={require("../../assets/icons/GA.png")}
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
        width: "100%",
        backgroundColor: "#a01355",
        color: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: "10px 25px",
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
            marginBottom: 10,
          }}
        >
          {renderBillLogo()}
        </div>
      }
      {props.showMciLogo === true && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 0,
            marginBottom: 10,
          }}
        >
          <img
            style={{ width: 60, height: 60 }}
            resizeMode={"center"}
            src={require("../../assets/icons/MC.png")}
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 20,
          fontSize: 15,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {props.showMciLogo ? (
            <PhoneIphoneRoundedIcon />
          ) : (
            <LibraryBooksRoundedIcon />
          )}
          <span style={{ paddingRight: 5 }}>{props.BillTitle}</span>
        </div>
        {props.canDelete ? (
          <div>
            <DeleteRoundedIcon onClick={() => props.deleteItem()} />
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          fontSize: 15,
        }}
      >
        <span>شناسه قبض : {props.BillId}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          fontSize: 15,
        }}
      >
        <span>مبلغ بدهی : {moneySplitter(props.BillAmount)} ریال</span>
      </div>
      {props.PaymentDeadLine ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          <span> مهلت پرداخت : {props.PaymentDeadLine} </span>
        </div>
      ) : null}
    </div>
  );
};

export default BillCard;
