import React, { useState, useEffect } from "react";
import { moneySplitter } from "../../util/validators";

const PkgBox = ({ pkgName, pid, price, click, operator }) => {
  return (
    <>
      <button
        style={styles.container}
        onClick={() => {
          click();
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {operator === 2 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                resizeMode="center"
                src={require("../../assets/icons/Irancell.png")}
                style={styles.img}
              />
            </div>
          ) : operator === 1 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                resizeMode="center"
                src={require("../../assets/icons/MCI.png")}
                style={styles.img}
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                resizeMode="center"
                src={require("../../assets/icons/Rightel.png")}
                style={styles.img}
              />
            </div>
          )}
          <span style={styles.text}>{pkgName}</span>
          <span
            style={{
              fontFamily: "IRANSansMobile",
              // fontSize: wp(3),
              // maxWidth: wp(80),
              color: "#CD0448",
              padding: "-10px 5px",
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "0.75rem",
              direction: "rtl",
            }}
          >
            {moneySplitter(price)} ریال
          </span>
        </div>
      </button>
    </>
  );
};

const styles = {
  container: {
    width: "100%",
    // height: hp(12),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 5,
    backgroundColor: "#eee",
    // padding: wp(1.5),
    padding: "2%",
    border: "none",
  },
  text: {
    fontFamily: "IRANSansMobile",
    // fontSize: wp(3),
    // maxWidth: wp(80),
    color: "#CD0448",
    padding: "-10px 5px",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "0.75rem",
    direction: "rtl",
  },
  img: {
    width: "13%",
    // height: hp(5),
    alignSelf: "flex-end",
  },
  price: {
    position: "absolute",
    bottom: 2,
    // backgroundColor: 'white',
    width: "100%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    left: 3,
    bottom: 8,
  },
};

export default PkgBox;
