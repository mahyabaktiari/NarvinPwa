import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
const useStyle = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    direction: "rtl",
    fontFamily: "IRANSansMobile",
    fontSize: "0.75rem",
    borderBottom: "0.5px solid gray",
    color: "#610c34",
    width: "95%",
  },
});

const BoxTrans = (props) => {
  const classes = useStyle();
  console.log(props);
  return (
    <>
      <div className={classes.container}>
        <p style={{ width: "30%", textAlign: "right" }}>
          {props.trans.description}
        </p>
        <p style={{ width: "50%", textAlign: "center" }}>
          {" "}
          {props.trans.creationJalaliDateTime}
        </p>
        <div
          style={{
            width: "20%",
            textAlign: "left",
            color: props.trans.withdrawal ? "red" : "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <span style={{ paddingTop: 5 }}>
            {props.trans.deposit ? props.trans.deposit : props.trans.withdrawal}
          </span>
          {props.trans.deposit ||
          (!props.trans.deposit && !props.trans.withdrawal) ? (
            <AddRoundedIcon />
          ) : (
            <RemoveRoundedIcon />
          )}
        </div>
      </div>
    </>
  );
};

export default BoxTrans;
