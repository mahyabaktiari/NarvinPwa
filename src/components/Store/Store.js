import React, { useEffect, useState } from "react";
import styles from "./styles";
import { requirePropFactory } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CropFreeRoundedIcon from "@material-ui/icons/CropFreeRounded";
import axios from "axios";
import EditStore from "../../components/EditeStore/EditStore";
import { Routes } from "../../api/api";
import Modal from "react-modal";
import Header from "../../components/Header/Header";
import PopModal from "../../components/PopUpModal/PopUpModal";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import ReportStore from "../../components/ReportStore/ReportStore";
import Snackbar from "@material-ui/core/Snackbar";
import MyQR from "../../components/MyQR/MyQR";

const Store = ({ storeInfo, getAllMerchants, provinces, merchanTypes }) => {
  const [merchantId, setMerchantId] = useState("");
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [logoStore, setLogoStore] = useState(storeInfo.storeLogo);
  const [popUp, setPopUp] = useState(false);
  const [report, setReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [QRModal, setQRModal] = useState(false);
  useEffect(() => {
    let tokenStorge = localStorage.getItem("token");
    setToken(tokenStorge);
    getMerInfo(tokenStorge);
  }, []);
  const getMerInfo = (tokenStorge) => {
    let status = null;
    axios
      .get(`${Routes.getMerchantInfo}/${storeInfo.id}`, {
        headers: { token: tokenStorge },
      })
      .then((res) => {
        status = res.data.responseCode;
        if (status === 200 && res.data.value.merchantId !== null) {
          let data = res.data.value.merchantId;
          setMerchantId(data);
        }
      });
  };

  const DeleteStore = () => {
    axios
      .put(
        `${Routes.DeleteMerchant}`,
        { Id: storeInfo.id },
        { headers: { token: token } }
      )
      .then((res) => {
        if (res.data.responseCode === 200) {
          setPopUp(false);
          setLoading(false);
          return getAllMerchants();
        } else {
          setTextSnack(res.data.message);
          setSnackBar(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setTextSnack("در حذف فروشگاه خطای سیستمی رخ داده!");
        setSnackBar(true);
      });
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
      zIndex: 1000,
      border: "none",
    },
  };

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
  const classes = styles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };
  return (
    <React.Fragment>
      <div className={classes.store}>
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
          }}
        >
          <img
            src={
              logoStore ? logoStore : require("../../assets/icons/circLogo.png")
            }
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <div className={classes.info}>
          <p className={classes.txt}>نام: {storeInfo.storeName}</p>
          <p className={classes.txt}>کد پذیرنده: {merchantId}</p>
          <p className={classes.txt}>آدرس: {storeInfo.address} </p>
          <p className={classes.txt}>تلفن: {storeInfo.phoneNumber}</p>
          <p className={classes.txt}>
            شماره شبا:{" "}
            {storeInfo.ibanNumber === "IRnull" ? "" : storeInfo.ibanNumber}
          </p>
          <p className={classes.txt}>
            وضعیت: {storeInfo.isActive === true ? "تایید شده" : "تایید نشده"}
          </p>
        </div>
      </div>
      <div className={classes.iconBox}>
        {storeInfo.isActive ? (
          <AssignmentOutlinedIcon onClick={() => setReport(true)} />
        ) : (
          <DeleteIcon onClick={() => setPopUp(true)} />
        )}

        <CropFreeRoundedIcon onClick={() => setQRModal(true)} />
        <EditIcon onClick={() => setOpen(true)} />
      </div>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <Header text="ویرایش فروشگاه" click={() => setOpen(false)} />
        <EditStore
          storeInfo={storeInfo}
          provinces={provinces}
          merchanTypes={merchanTypes}
          getAllMerchants={getAllMerchants}
          closeModal={() => setOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={QRModal}
        onRequestClose={() => setQRModal(false)}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <MyQR
          Logo={storeInfo.storeLogo}
          storeName={storeInfo.storeName}
          MerchantId={merchantId}
          close={() => setQRModal(false)}
        />
      </Modal>
      <Modal
        isOpen={report}
        onRequestClose={() => setReport(false)}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <Header text="گزارش فروشگاه" click={() => setReport(false)} />
        <ReportStore merchantId={merchantId} />
      </Modal>
      <PopModal
        iconType="QUESTION"
        text="آیا از حذف فروشگاه اطمینان دارید ؟"
        titleOne="خیر"
        titleTwo="بله"
        methodOne={() => setPopUp(false)}
        methodTwo={() => {
          setLoading(true);
          DeleteStore();
        }}
        closeModal={() => setPopUp(false)}
        show={popUp}
        loading={loading}
      />
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
    </React.Fragment>
  );
};

export default Store;
