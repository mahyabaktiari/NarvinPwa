import React, { useEffect, useState } from "react";
import RefundCard from "../refundCard/refundCard";
import PopModal from "../PopUpModal/PopUpModal";
import { useAppContext, useAppDispatch } from "../../context/appContext";

const RefundInfoUser = (props) => {
  const { token, name, merchantId, amount, iban, getRefunds } = props;
  console.log(name);
  const [clickPay, setPayClick] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { refundAmount } = useAppContext();
  console.log(refundAmount);

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
        methodTwo={() => console.log("ok")}
        closeModal={() => setPayClick(false)}
        show={clickPay}
      />
    </>
  );
};

export default RefundInfoUser;
