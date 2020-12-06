import React, { useState } from "react";
import Style from "./styles";
import { useChargeContext } from "../../context/buyChargeContext";

const ChargeIcon = (props) => {
  const classes = Style();
  const { isMci, isMtn, isRTL } = useChargeContext();

  return (
    <>
      <div className={classes.item}>
        <button
          className={classes.btn}
          onClick={props.rightelChoose}
          disabled={props.disabled}
        >
          <img
            src={require("../../assets/icons/Rightel.png")}
            className={isRTL ? classes.img : classes.img2}
          />
        </button>
        <button
          className={classes.btn}
          onClick={props.mtnChoose}
          disabled={props.disabled}
        >
          <img
            src={require("../../assets/icons/Irancell.png")}
            className={isMtn ? classes.img : classes.img2}
          />
        </button>
        <button
          className={classes.btn}
          onClick={props.mciChoose}
          disabled={props.disabled}
        >
          <img
            src={require("../../assets/icons/MCI.png")}
            className={isMci ? classes.img : classes.img2}
          />
        </button>
      </div>
    </>
  );
};

export default ChargeIcon;
