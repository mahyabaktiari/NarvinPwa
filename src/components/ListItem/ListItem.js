import React, { useState, useEffect } from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
const ListItem = (props) => {
  return (
    <div
      style={{
        width: "70%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#610c34",
        color: "#fff",
        borderRadius: 25,
        padding: "10px 20px",
        alignItems: "center",
        direction: "rtl",
        fontFamily: "IRANSansMobile",
        margin: "10px 0px",
      }}
      onClick={props.chooseContact}
    >
      <span>{props.name}</span>
      <span>{props.number}</span>
      <HighlightOffRoundedIcon onClick={props.deleteContact} />
    </div>
  );
};

export default ListItem;
