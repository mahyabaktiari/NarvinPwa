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
const RefundInfoUser = (props) => {
  const { token, name, merchantId, amount, iban, getRefunds } = props;
  console.log(name);
  const [clickPay, setPayClick] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [success, setSuccess] = useState(false);
  const { refundAmount } = useAppContext();
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const refund = refundAmount ? refundAmount.replace(/,/g, "") : 0;
  console.log(amount, refund);
  console.log(refund);
  const refundRequest = () => {
    if (refund == 0 || refund == null || refund === "") {
      setPayClick(false);
      setTextSnack("لطفا مبلغ تسویه را وارد نمایید!");
      setSnackBar(true);
    } else if (Number(refund) < 10000) {
      setPayClick(false);
      setTextSnack("مبلغ تسویه نمی تواند کمتر 10،000 ریال باشد");
      setSnackBar(true);
    } else if (Number(refund) > Number(amount)) {
      setPayClick(false);
      setTextSnack("مبلغ تسویه نمی تواند بزرگتر از مبلغ قابل برداشت باشد!");
      setSnackBar(true);
    } else if (iban == null || iban === "") {
      console.log(Number(refund), Number(amount));
      setTextSnack("شماره شبا صحیح نمی باشد!");
      setSnackBar(true);
      setPayClick(false);
    } else {
      setLoading(true);
      axios
        .post(
          `${Routes.settelRefund}`,
          { merchantId: merchantId, Amount: refundAmount },
          { headers: { token: token } }
        )
        .then(async (res) => {
          console.log(res);
          setLoading(false);
          let status = res.data.responseCode;
          if (status === 200) {
            setPayClick(false);
            setSuccess(true);
            setTextSnack("تسویه فروشگاه با موفقیت انجام شد.");
            setSnackBar(true);
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
    }
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
        isPersonalRefund={true}
        token={token}
        storeName={name}
        Iban={iban === "IRnull" ? "" : iban}
        refund={amount}
        enterAmount={refundAmount}
        merchantId={merchantId}
        Loading={Loading}
        refundRequest={() => setPayClick(true)}
      />
      <PopModal
        iconType="QUESTION"
        text="آیا برای تسویه کیف پول اطمینان دارید؟"
        titleOne="خیر"
        titleTwo="بله"
        methodOne={() => setPayClick(false)}
        methodTwo={() => refundRequest()}
        closeModal={() => setPayClick(false)}
        show={clickPay}
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

export default RefundInfoUser;
