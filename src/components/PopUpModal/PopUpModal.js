import React, { useEffect, useState } from "react";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import InfoIcon from "@material-ui/icons/Info";
import Modal from "react-modal";
import useStyles from "./styles";
const PopUpModal = (props) => {
  const popModalStyle = {
    content: {
      left: "5%",
      right: "5%",
      top: "25%",
      bottom: "none",
      zIndex: 1000,
      border: "none",
      padding: 0,
      boxShadow: "0px 0px 14px 1px #0f0e0edb",
      borderRadius: 10,
    },
  };
  const classes = useStyles();
  const renderIcon = () => {
    switch (props.iconType) {
      // case 'SUCCESS':
      //   return <Icon1 color="green" name="check-circle" size={50} />;
      // case 'FAILED':
      //   return <Icon1 color="red" name="close-circle" size={50} />;
      // case 'ALERT':
      //   return <Icon1 color="red" name="alert-circle" size={50} />;
      case "QUESTION":
        return (
          <HelpRoundedIcon
            style={{ color: "#102542", width: "12%", height: "12%" }}
          />
        );
      case "INFO":
        return <InfoIcon style={{ color: "blue" }} />;
      default:
        break;
    }
  };
  return (
    <Modal
      isOpen={props.show}
      onRequestClose={() => {
        props.closeModal();
      }}
      style={popModalStyle}
      overlayClassName={classes.myoverlay}
      contentLabel="Example Modal"
    >
      <div
        style={{
          backgroundColor: "#ddd",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          padding: 20,
        }}
      >
        {renderIcon()}
        <div
          style={{
            width: "85%",
            backgroundColor: "#fff",
            borderRadius: 10,
            marginTop: 20,
            textAlign: "right",
            padding: "0px 10px",
            fontFamily: "IRANSansMobile",
            fontSize: "0.9rem",
            boxSizing: "border-box",
          }}
        >
          <p>{props.text}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "85%",
            boxSizing: "border-box",
            marginTop: 20,
          }}
        >
          <button style={styles.button} onClick={props.methodOne}>
            <span>{props.titleOne}</span>
          </button>
          <button style={styles.button} onClick={props.methodTwo}>
            <span>{props.titleTwo}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  button: {
    backgroundColor: "#610c34",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    boxSizing: "border-box",
    padding: 10,
    fontFamily: "IRANSansMobile",
    width: "40%",
  },
};

export default PopUpModal;
