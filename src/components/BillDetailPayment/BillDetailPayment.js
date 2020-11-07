import React, { useEffect, useState } from "react";

const BillDetailPayment = (props) => {
  return (
    <>
      {" "}
      <img
        style={{ width: 60, marginTop: 30 }}
        src={require("../../assets/icons/circLogo.png")}
      />
      <span
        style={{
          marginTop: 10,
          marginBottom: 15,
          color: "#fff",
          fontFamily: "IRANSansMobile",
        }}
      >
        جزئیات قبض
      </span>{" "}
      <div style={style.row}>
        <span>قبض: </span>
        <span>{props.billTitle}</span>
      </div>
      <div style={style.row}>
        <span>نام مشترک: </span>
        <span>{props.customerName}</span>
      </div>
      <div style={style.row}>
        <span>نوع مشتری: </span>
        <span>{props.customerType === "1" ? "حقیقی" : "حقوقی"}</span>
      </div>
      <div style={style.row}>
        <span>شرکت توزیع: </span>
        <span>{props.billType}</span>
      </div>
      <div style={style.row}>
        <span>مبلغ قبض: </span>
        <span>{props.billAmount}</span>
      </div>
      <div style={style.row}>
        <span>مهلت پرداخت: </span>
        <span>{props.payDeadline}</span>
      </div>
      <div style={style.row}>
        <span>شناسه قبض: </span>
        <span>{props.billId}</span>
      </div>
      <div style={style.row}>
        <span>شماره کنتور: </span>
        <span>{props.serial}</span>
      </div>
      <div style={style.row}>
        <span>کد پستی انشعاب: </span>
        <span>{props.postCode}</span>
      </div>
      <div style={style.row}>
        <span>آدرس: </span>
        <span>{props.address}</span>
      </div>
    </>
  );
};

const style = {
  row: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    color: "#CD0448",
    fontFamily: "IRANSansMobile",
    direction: "rtl",
    marginTop: 5,
    boxSizing: "border-box",
    fontSize: 14,
  },
};

export default BillDetailPayment;
