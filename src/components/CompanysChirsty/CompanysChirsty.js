import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import useStyle from "./styles";
import {
  ToRial,
  moneySplitter,
  getWalletBalanceAsync,
} from "../../util/validators";
import Header from "../../components/Header/Header";
import CharistyCard from "../../components/CharistyCard/CharistyCard";
import ChargeWallet from "../../components/ChargeWallet/ChargeWallet";

const modalStyle = {
  content: {
    width: "100%",
    height: "auto",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
    top: "none",
    overflow: "hidden",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
};
const customStyles = {
  content: {
    width: "100%",
    height: "100vh",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
  },
};
const companysChirsty = ({ info }) => {
  const classes = useStyle();
  const [showModal, setShowModal] = useState(false);
  const [EnterAmount, setEnterAmount] = useState("10000");
  const [showCard, setShowCard] = useState(false);
  const [checkWallet, setCheckWallet] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
  }, []);
  console.log(EnterAmount);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "33%",
          alignItems: "center",
          marginTop: 40,
          border: "none",
          backgroundColor: "#fff",
        }}
      >
        <img
          style={{ width: 60 }}
          src={require("../../assets/icons/kheyrie.png")}
        />
        <span style={{ fontFamily: "IRANSansMobile", marginTop: 5 }}>
          {info.title}
        </span>
      </button>
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <KeyboardArrowDownRoundedIcon
            fontSize="large"
            onClick={() => setShowModal(false)}
          />
          <span
            style={{
              fontFamily: "IRANSansMobile",
              paddingVertical: 5,
              paddingBottom: 15,
              fontSize: 16,
              fontWeight: "bold",
              color: "gray",
              // borderBottomColor: '#ccc',
              // borderBottomWidth: 1,
              borderBottom: "1px solid #ccc",
              width: "100%",
              textAlign: "center",
            }}
          >
            {info.title}
          </span>
          <span
            style={{
              fontFamily: "IRANSansMobile",
              marginTop: 10,
              textAlign: "right",
              width: "90%",
              fontSize: 15,
            }}
          >
            مبلغ همیاری را وارد کرده یا از گزینه های موجود استفاده نمایید
          </span>
          <div style={{ width: "100%", position: "relative", height: 35 }}>
            <input
              keyboardType={"numeric"}
              style={{
                display: "flex",
                width: "90%",
                height: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                fontFamily: "IRANSansMobile",
                // fontSize: wp(4),
                color: "#CD0448",
                backgroundColor: "white",
                borderColor: "#CD0448",
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                paddingTop: 10,
              }}
              onChange={(e) => {
                setEnterAmount(e.target.value.replace(/\,/g, ""));
                console.log(e.target.value);
              }}
              value={ToRial(EnterAmount)}
              maxLength={10}
            />
            <span
              style={{
                position: "absolute",
                top: 23,
                left: "8%",
                color: "gray",
                fontWeight: "bold",
                fontFamily: "IRANSansMobile",
              }}
            >
              ریال
            </span>
          </div>
          <span
            style={{
              marginTop: 30,
              color: "#CD0448",
              fontFamily: "BYekan",
              width: "90%",
              fontSize: 14,
              textAlign: "right",
            }}
          >
            مبلغ همیاری باید بین 10,000 تا 10,000,000 ریال باشد
          </span>
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontFamily: "BYekan",
              marginTop: 10,
              direction: "rtl",
            }}
          >
            <button
              style={{
                width: "30%",
                padding: 5,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
                fontFamily: "IRANSansMobile",
                fontSize: 12,
                backgroundColor: "#fff",
                direction: "rtl",
              }}
              onClick={() => setEnterAmount("50000")}
            >
              <span style={{ fontFamily: "BYekan", textAlign: "center" }}>
                50/000 ریال
              </span>
            </button>
            <button
              style={{
                width: "30%",
                padding: 5,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
                fontSize: 12,
                backgroundColor: "#fff",
                direction: "rtl",
              }}
              onClick={() => setEnterAmount("500000")}
            >
              <span style={{ fontFamily: "BYekan", textAlign: "center" }}>
                500/000 ریال
              </span>
            </button>
            <button
              style={{
                width: "30%",
                padding: 5,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
                fontSize: 12,
                backgroundColor: "#fff",
                direction: "rtl",
              }}
              onClick={() => setEnterAmount("1000000")}
            >
              <span
                style={{
                  fontFamily: "BYekan",
                  textAlign: "center",
                }}
              >
                1/000/000 ریال
              </span>
            </button>
          </div>
          <button
            style={{
              width: "90%",
              backgroundColor: "#CD0448",
              borderRadius: 10,
              margin: "10px 0px",
              border: "none",
              padding: 10,
            }}
            onClick={() => setShowCard(true)}
          >
            <span
              style={{
                fontFamily: "IRANSansMobile",
                textAlign: "center",
                color: "#fff",
                padding: 10,
                fontSize: 18,
              }}
            >
              ادامه
            </span>
          </button>
        </div>
      </Modal>
      <Modal
        style={customStyles}
        isOpen={showCard}
        onRequestClose={() => setShowCard(false)}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <Header text="پرداخت خیریه" click={() => setShowCard(false)} />
        <CharistyCard
          payAmount={EnterAmount}
          info={info}
          payInit={() => setCheckWallet(true)}
        />
      </Modal>
      {checkWallet ? (
        <ChargeWallet
          token={token}
          amount={Number(EnterAmount)}
          // payment={peymentNet}
          // backPayment={backPayment}
          //backDrop={backDrop}
          // openBackDrop={() => setBackDrop(true)}
          // closeBackDrop={() => setBackDrop(false)}
          close={() => {
            setCheckWallet(false);
          }}
        />
      ) : null}
    </>
  );
};

export default companysChirsty;
