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
const Store = ({ storeInfo, getAllMerchants, provinces, merchanTypes }) => {
  const [merchantId, setMerchantId] = useState("");
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [logoStore, setLogoStore] = useState(storeInfo.storeLogo);
  const [popUp, setPopUp] = useState(false);
  const [report, setReport] = useState(false);
  useEffect(() => {
    let tokenStorge = localStorage.getItem("token");
    setToken(tokenStorge);
    getMerInfo(tokenStorge);
  }, []);
  const getMerInfo = (tokenStorge) => {
    let status = null;
    console.log("storeInfo", storeInfo, tokenStorge);
    axios
      .get(`${Routes.getMerchantInfo}/${storeInfo.id}`, {
        headers: { token: tokenStorge },
      })
      .then((res) => {
        console.log(res);
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
          return getAllMerchants();
        } else {
          console.log(res);
          // this.setState({payClick: false});
          // return Toast.show(res.data.message, {
          //   position: Toast.position.center,
          //   containerStyle: { backgroundColor: "red" },
          //   textStyle: { fontFamily: "IRANSansMobile" },
          // });
        }
      })
      .catch((err) => {
        console.log(err);
        // this.setState({payClick: false});
        // return Toast.show('در حذف فروشگاه خطای سیستمی رخ داده!', {
        //   position: Toast.position.center,
        //   containerStyle: {backgroundColor: 'red'},
        //   textStyle: {fontFamily: 'IRANSansMobile'},
        // });
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
  return (
    <React.Fragment>
      <div className={classes.store}>
        <img
          src={
            logoStore ? logoStore : require("../../assets/icons/circLogo.png")
          }
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
          }}
        />
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

        <CropFreeRoundedIcon />
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
        methodTwo={() => DeleteStore()}
        closeModal={() => setPopUp(false)}
        show={popUp}
      />
    </React.Fragment>
  );
};

export default Store;
