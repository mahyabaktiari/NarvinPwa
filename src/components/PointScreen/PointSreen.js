import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import useStyle from "./style";
import axios from "axios";
import { Routes } from "../../api/api";

const pointModal = ({ show, close, point }) => {
  const classes = useStyle();
  const [pointDetails, setPointDetails] = useState([]);
  const customStyles = {
    content: {
      width: "80%",
      height: "50vh",
      top: "20vh",
      bottom: 0,
      right: 0,
      left: "10%",
      padding: 0,
      zIndex: 10000,
      borderRadius: 15,
      backgroundColor: "#ddd",
      border: "none",
    },
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    getPointDetail(token);
  }, [show]);

  const getPointDetail = (token) => {
    axios
      .get(`${Routes.GetPointSource}`, {
        headers: { token: token },
      })
      .then((res) => {
        console.log("getPointDetail", res.data);
        let pointDetails = res.data.value.response;
        //alert(pointDetails);
        console.log("pointDetails", pointDetails);
        setPointDetails(pointDetails);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <Modal
      isOpen={show}
      overlayClassName={classes.myoverlay}
      onRequestClose={close}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "IRANSansMobile",
          backgroundColor: "#CD0448",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            textAlign: "center",
            padding: 15,
            fontWeight: "bold",
          }}
        >
          <span>جزئیات نارینه</span>
        </div>
        <div
          style={{
            backgroundColor: "#CD0448",
            flex: 1,
            overflowY: "scroll",
            padding: 15,
          }}
        >
          {pointDetails
            ? pointDetails.map((val) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      direction: "rtl",
                      color: "#fff",
                    }}
                  >
                    <span>{val.merchantName}</span>
                    <span>{val.deposit} نارینه</span>
                  </div>
                );
              })
            : null}
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            textAlign: "center",
            padding: 15,
            display: "flex",
            justifyContent: "space-between",
            direction: "rtl",
          }}
        >
          <span>جمع کل: </span>
          <span>{point} نارینه</span>
        </div>
      </div>
    </Modal>
  );
};

export default pointModal;
