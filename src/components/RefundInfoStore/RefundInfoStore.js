import React, { useEffect, useState } from "react";
import RefundCard from "../refundCard/refundCard";
import PopModal from "../PopUpModal/PopUpModal";
import { useAppContext, useAppDispatch } from "../../context/appContext";
import {
  ToRial,
  getWalletBalanceAsync,
  splitInfo,
  moneySplitter,
  addMerchant,
} from "../../util/validators";
import axios from "axios";
import { Routes } from "../../api/api";
import Snackbar from "@material-ui/core/Snackbar";
import useStyle from "./styles";
const RefundInfoStore = (props) => {
  const dispatch = useAppDispatch();
  const [Loading, setLoading] = useState(false);
  const [payClick, setPayClick] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [success, setSuccess] = useState(false);
  const classes = useStyle();
  let {
    merchantId,
    storeLogo,
    refundAmount,
    token,
    iban,
    storeName,
    getRefunds,
  } = props;

  const refundRequest = () => {
    setLoading(true);
    axios
      .post(
        `${Routes.settelRefund}`,
        { merchantId: merchantId, Amount: 0 },
        { headers: { token: token } }
      )
      .then(async (res) => {
        console.log(res);
        setLoading(false);
        let status = res.data.responseCode;
        if (status === 200) {
          setSuccess(true);
          setTextSnack("تسویه فروشگاه با موفقیت انجام شد.");
          setSnackBar(true);
          setPayClick(false);
          let wallet = await getWalletBalanceAsync(token);
          dispatch({ type: "GET_WALLET", payload: wallet });
          setTimeout(() => {
            getRefunds(token);
          }, 2000);
        }
        if (status === 405) {
          setTextSnack(res.data.message);
          setSnackBar(true);
          setPayClick(false);
        }
        if (status === 424) {
          setTextSnack(res.data.message);
          setSnackBar(true);
          setPayClick(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setTextSnack("تسویه فروشگاه با خطا مواجه شد!");
        setSnackBar(true);
        setPayClick(false);
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
      <RefundCard
        Logo={storeLogo}
        storeName={storeName}
        Iban={iban === "IRnull" ? "" : iban}
        token={token}
        refund={refundAmount}
        enterAmount={refundAmount}
        merchantId={merchantId}
        Loading={Loading}
        refundRequest={() => setPayClick(true)}
      />
      <PopModal
        iconType="QUESTION"
        text="آیا برای تسویه کیف پول اطمینان دارید؟"
        titleOne="انصراف"
        titleTwo="پرداخت"
        methodOne={() => setPayClick(false)}
        methodTwo={() => refundRequest()}
        closeModal={() => setPayClick(false)}
        show={payClick}
      />
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={success ? classes.rootSuccsess : classes.root}
      />
    </>
  );
};

export default RefundInfoStore;
