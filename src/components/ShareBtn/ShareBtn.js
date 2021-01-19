import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { browserName, browserVersion, osVersion } from "react-device-detect";
import SaveIcon from "@material-ui/icons/Save";
import { attributesToProps } from "html-react-parser";

const ShareBtn = (props) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "lime",
          padding: 10,
          color: "#fff",
          fontSize: "0.9rem",
          fontFamily: "IRANSansMobile",
          width: "40%",
          borderRadius: 8,
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
        }}
        onClick={browserName === "Mobile Safari" ? props.download : props.share}
      >
        {browserName === "Mobile Safari" ? (
          <>
            <SaveIcon style={{ color: "white" }} />
            <span>ذخیره</span>
          </>
        ) : (
          <>
            <ShareOutlinedIcon style={{ color: "white" }} />
            <span>اشتراک گذاری</span>
          </>
        )}
      </div>
    </>
  );
};

export default ShareBtn;
