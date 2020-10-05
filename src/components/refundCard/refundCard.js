import React, { useEffect, useState } from "react";
import { moneySplitter, ToRial } from "../../util/validators";
import { useAppDispatch, useAppContext } from "../../context/appContext";
import useStyle from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Submit from "../../components/SubmitButton/SubmitButton";

const RefundCard = (props) => {
  const dispatch = useAppDispatch();
  const { refundAmount } = useAppContext();
  console.log(refundAmount);
  const classes = useStyle();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        marginLeft: "10%",
        marginTop: 20,
        borderRadius: 10,
        // backgroundColor: "#a01355",
        fontFamily: "IRANSansMobile",
        boxSizing: "border-box",
        boxShadow: "rgb(15 14 14 / 52%) 0px 1px 6px 0px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          color: "#121212",
          textAlign: "center",
          padding: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          boxSizing: "border-box",
        }}
      >
        <span>{props.isPersonalRefund ? "کیف پول شخصی" : props.storeName}</span>
      </div>
      <div
        style={{
          backgroundColor: "#a01355",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          direction: "rtl",
          fontSize: "0.8rem",
          fontWeight: 100,
          padding: "30px 5px",
        }}
      >
        <span style={{ padding: "5px 0px" }}>
          کد پذیرنده: {props.merchantId}{" "}
        </span>
        <span style={{ padding: "5px 0px" }}>شماره شبا: {props.Iban}</span>
        <span style={{ padding: "5px 0px" }}>
          قابل برداشت: {moneySplitter(props.refund)} ریال
        </span>
        {props.isPersonalRefund === true && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <input
              keyboardType={"numeric"}
              className={classes.input}
              placeholder="مبلغ تسویه (ریال)"
              onChange={(e) =>
                dispatch({ type: "REFUND_AMOUT_SET", payload: e.target.value })
              }
              value={refundAmount ? ToRial(refundAmount.toString()) : null}
            />
          </div>
        )}
      </div>
      <div
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          padding: "10px 0px",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        {props.Loading === true ? (
          <CircularProgress color="secondary" />
        ) : (
          <div style={{ marginTop: -20 }}>
            <Submit
              text="تسویه"
              disable={props.enterAmount <= 0}
              click={props.refundRequest}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundCard;
