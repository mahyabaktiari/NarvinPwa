import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import RecieptTrans from "../../components/Reciept/RecieptTrans/RecieptTrans";
import Modal from "react-modal";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { moneySplitter, fillZeroMerchId } from "../../util/validators";

const customStyles = {
  content: {
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
    borderRadius: 0,
    zIndex: 1000,
  },
};

const useStyle = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    direction: "rtl",
    fontFamily: "IRANSansMobile",
    fontSize: "0.75rem",
    borderBottom: "0.5px solid gray",
    color: "#610c34",
    width: "100%",
    paddingRight: 10,
    paddingLeft: 5,
    boxSizing: "border-box",
  },
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});

const BoxTrans = ({ trans }) => {
  const classes = useStyle();
  const recieptRef = useRef();

  useEffect(() => {
    Modal.setAppElement("body");
  });
  console.log(trans);
  const [openModal, setRecieptModal] = useState(false);
  console.log("setRecieptModal", openModal);

  // const shareReciept = () => {
  //   console.log(navigator.share);

  //   if (navigator.share !== undefined) {
  //     navigator
  //       .share({
  //         title: "WebShare API Demo",
  //         url: "https://codepen.io/ayoisaiah/pen/YbNazJ",
  //       })
  //       .then(() => {
  //         console.log("Thanks for sharing!");
  //       })
  //       .catch(console.error);
  //   } else {
  //     // fallback
  //   }
  //   console.log(recieptRef.current);
  // };
  return (
    <div style={{ width: "100%" }}>
      <div className={classes.container} onClick={() => setRecieptModal(true)}>
        <p style={{ width: "30%", textAlign: "right" }}>{trans.description}</p>
        <p style={{ width: "50%", textAlign: "center" }}>
          {" "}
          {trans.creationJalaliDateTime}
        </p>
        <div
          style={{
            width: "20%",
            textAlign: "left",
            color: trans.withdrawal ? "red" : "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <span style={{ paddingTop: 5 }}>
            {moneySplitter(trans.deposit ? trans.deposit : trans.withdrawal)}
          </span>
          {trans.deposit || (!trans.deposit && !trans.withdrawal) ? (
            <AddRoundedIcon />
          ) : (
            <RemoveRoundedIcon />
          )}
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setRecieptModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <RecieptTrans trans={trans} close={() => setRecieptModal(false)} />

          <div
            style={{
              position: "absolute",
              top: "90vh",
              borderRadius: 10,
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "7.5%",
            }}
          >
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
              onClick={() => setRecieptModal(false)}
            >
              <span>بستن</span>
            </div>
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
                justifyContent: "space-between",
              }}
              // onClick={() => shareReciept()}
            >
              <ShareOutlinedIcon style={{ color: "white" }} />
              <span>اشتراک گذاری</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BoxTrans;
