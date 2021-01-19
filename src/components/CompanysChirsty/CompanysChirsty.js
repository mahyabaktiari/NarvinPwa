import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import useStyle from "./styles";
import {
  ToRial,
  moneySplitter,
  getWalletBalanceAsync,
  fixNumbers,
} from "../../util/validators";
import Header from "../../components/Header/Header";
import CharistyCard from "../../components/CharistyCard/CharistyCard";
import ChargeWallet from "../../components/ChargeWallet/ChargeWallet";
import PopUpModal from "../../components/PopUpModal/PopUpModal";
import Axios from "axios";
import ChirstyResiept from "../../components/Reciept/chirstyReciept";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { Routes } from "../../api/api";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

//data:
// error: {}
// message: "عملیات با موفقیت انجام شد"
// responseCode: 200
// timeStamp: "2020-12-23T12:08:22.3598227+03:30"
// value:
// response:
// accountDeviceId: 81
// accountId: 56
// amount: 1000
// charityId: 2
// charityNavigation: null
// creationDateTime: "2020-12-23T12:08:22.313"
// creationJalaliDateTime: "1399/10/03 12:08:22"
// id: 3
// stateId: 1
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
  const [EnterAmount, setEnterAmount] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [checkWallet, setCheckWallet] = useState(false);
  const [token, setToken] = useState("");
  const [uniqId, setUniqId] = useState("");
  const [recieptModal, setRecieptModal] = useState(false);
  const [recieptInfo, setRecieptInfo] = useState();
  const [backDrop, setBackDrop] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [openBackDrop, setOpenBackDrop] = useState(false);
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    setUniqId(localStorage.getItem("DeviceUniqId"));
  }, []);

  const peymentCharisty = () => {
    setBackDrop(false);
    setOpenBackDrop(true);
    Axios.post(
      `${Routes.Charity}`,
      {
        CharityId: info.id,
        DeviceUniqId: uniqId,
        Amount: EnterAmount,
      },
      {
        headers: {
          token: token,
        },
      }
    )
      .then((res) => {
        setShowCard(false);
        setCheckWallet(false);
        setRecieptInfo(res.data.value.response);
        setRecieptModal(true);
        setEnterAmount("");
        setOpenBackDrop(false);
      })
      .catch((err) => {
        setShowCard(false);
        setCheckWallet(false);
        setTextSnack("خطا در اتصال به سرور");
        setSnackBar(true);
        setEnterAmount("");
        setOpenBackDrop(false);
        setRecieptModal(false);
      });
  };

  const backPayment = () => {
    Axios.get(`${Routes.walletBalance}`, { headers: { token: token } })
      .then((res) => {
        let wallet = res.data.value.response.toString();
        if (Number(wallet) >= EnterAmount) {
          peymentCharisty();
        } else {
          setBackDrop(false);
        }
      })
      .catch((err) => {
        setTextSnack("خطای در دریافت موجودی کیف پول");
        setSnackBar(true);
        setCheckWallet(false);
        setBackDrop(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };
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
        <img style={{ width: 60 }} src={info.logo} />
        {/* <img
          style={{ width: 60 }}
          src={require("../../assets/icons/kheyrie.png")}
        /> */}
        <span style={{ fontFamily: "IRANSansMobile", marginTop: 5 }}>
          {info.name}
        </span>
      </button>
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
          setEnterAmount("");
        }}
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
            {info.name}
          </span>
          <span
            style={{
              fontFamily: "IRANSansMobile",
              marginTop: 10,
              textAlign: "right",
              width: "90%",
              fontSize: 15,
              direction: "rtl",
            }}
          >
            مبلغ همیاری را وارد کنید.
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
                setEnterAmount(fixNumbers(e.target.value.replace(/\,/g, "")));
              }}
              value={EnterAmount ? ToRial(EnterAmount) : null}
              maxLength={10}
              inputMode="numeric"
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
          <button
            style={{
              width: "90%",
              backgroundColor: EnterAmount ? "#CD0448" : "gray",
              borderRadius: 10,
              margin: "40px 0px 20px",
              border: "none",
              padding: 10,
            }}
            onClick={() => setShowCard(true)}
            disabled={!EnterAmount}
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
      {/* <Modal
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
      </Modal> */}
      <PopUpModal
        iconType="QUESTION"
        text={`آیا از پرداخت ${EnterAmount} به خیریه ${info.name} اطمینان دارید ؟`}
        titleOne="خیر"
        titleTwo="بله"
        methodOne={() => setShowCard(false)}
        methodTwo={() => setCheckWallet(true)}
        closeModal={() => setShowCard(false)}
        show={showCard}
      />
      <Modal
        isOpen={recieptModal}
        onRequestClose={() => setRecieptModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <ChirstyResiept name={info.name} reciept={recieptInfo} />
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
              onClick={() => {
                setRecieptModal(false);
                setShowCard(false);
                setShowModal(false);
                // setPaymentModal(false);
                // setOpenModal(false);
                // setCheckWallet(false);
                // setCodeP("");
              }}
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
            >
              <ShareOutlinedIcon style={{ color: "white" }} />
              <span>اشتراک گذاری</span>
            </div>
          </div>
        </div>
      </Modal>
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="secondary" />
      </Backdrop>
      {checkWallet ? (
        <ChargeWallet
          token={token}
          amount={Number(EnterAmount)}
          payment={peymentCharisty}
          backPayment={backPayment}
          backDrop={backDrop}
          openBackDrop={() => setBackDrop(true)}
          closeBackDrop={() => setBackDrop(false)}
          close={() => {
            setCheckWallet(false);
          }}
        />
      ) : null}
    </>
  );
};

export default companysChirsty;
