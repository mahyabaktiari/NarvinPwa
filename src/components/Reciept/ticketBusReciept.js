import React, { useEffect, useState } from "react";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { moneySplitter, fil_zro, fillZeroMerchId } from "../../util/validators";

const Reciept = ({
  ticket,
  close,
  showTicket,
  pressed,
  passengerName,
  seats,
  passengerCount,
  infoTicket,
}) => {
  return (
    <div
      style={{
        width: "100%",

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
          خرید بلیت اتوبوس
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
          <span>شناسه خرید: </span>
          <span>{infoTicket.saleId}</span>
        </div>

        <div style={style.row}>
          <span>شماره بلیت: </span>
          <span> {infoTicket.ticket_no}</span>
        </div>
        <div style={style.row}>
          <span>تعاونی: </span>
          <span>{ticket.company}</span>
        </div>
        <div style={style.row}>
          <span>مبدا: </span>
          <span>{ticket.origin}</span>
        </div>
        <div style={style.row}>
          <span>مقصد: </span>
          <span>{ticket.destination}</span>
        </div>
        <div style={style.row}>
          <span> شماره صندلی ها: </span>
          <span>{seats}</span>
        </div>
        <div style={style.row}>
          <span>زمان حرکت: </span>
          <span>
            {" "}
            {ticket.time} , {ticket.movingTime}
          </span>
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

export default Reciept;
