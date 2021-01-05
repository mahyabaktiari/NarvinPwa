import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const ShareBtn = (props) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "red",
          padding: 10,
          color: "#fff",
          fontSize: "0.9rem",
          fontFamily: "IRANSansMobile",
          width: "40%",
          borderRadius: 8,
          textAlign: "center",
        }}
        onClick={props.close}
      >
        <span>بستن</span>
      </div>
    </>
  );
};

export default ShareBtn;
