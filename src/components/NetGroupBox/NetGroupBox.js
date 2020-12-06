import React, { useState, useEffect } from "react";

const NetGroupBox = (props) => {
  return (
    <>
      <button
        style={props.sel === true ? styles.containerSelected : styles.container}
        onClick={props.click}
      >
        <span style={props.sel === true ? styles.txtSelected : styles.txt}>
          {props.groupName}
        </span>
      </button>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CD0448",
    borderRadius: 5,
    width: "19%",
    backgroundColor: "#fff",
  },
  containerSelected: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#CD0448",
    borderWidth: 1,
    borderColor: "#CD0448",
    borderRadius: 5,
    width: "17%",
  },
  txt: {
    color: "#CD0448",
    fontFamily: "IRANSansMobile",
  },
  txtSelected: {
    color: "#fff",
    fontFamily: "IRANSansMobile",
  },
};

export default NetGroupBox;
