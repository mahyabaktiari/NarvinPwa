import React, { useEffect, useState } from "react";
import BillCard from "../BillCard/BillCard";
import Submit from "../SubmitButton/SubmitButton";
import PopUpModal from "../PopUpModal/PopUpModal";
import ChargeWallet from "../ChargeWallet/ChargeWallet";
import Modal from "react-modal";
import Styles from "./styles";
import BillDetailPayment from "../BillDetailPayment/BillDetailPayment";
import { moneySplitter, fil_zro } from "../../util/validators";

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
const BillInfo = (props) => {
  const { bill, token, NationalCode, getDebts } = props;
  const [popModal, setPopModal] = useState(false);
  const [chackWallet, setCheckWallet] = useState(false);
  const [billAmount, setBillAmount] = useState(props.bill.Total_bill_debt);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [deletClick, setDeletClick] = useState(false);
  const classes = Styles();
  console.log("billAmount", billAmount);
  console.log(bill, token, NationalCode, getDebts);
  return (
    <>
      <BillCard
        key={bill.Bill_identifier}
        BillTitle={bill.BillTitle}
        CompanyName={bill.Company_name}
        BillId={bill.Bill_identifier}
        BillAmount={bill.Total_bill_debt}
        PaymentDeadLine={bill.Payment_dead_line}
        canDelete={true}
        deleteItem={() => {
          setDeletClick(true);
        }}
        // loading={loading}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          boxShadow: "0px 2px 14px -4px gray",
          boxSizing: "border-box",
          padding: "20px 10px",
          paddingTop: 0,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Submit text="جزئیات" click={() => setPayModalVisible(true)} />{" "}
        <Submit
          text="پرداخت"
          disable={bill.Total_bill_debt < 1000}
          click={() => setPopModal(true)}
        />
      </div>
      <PopUpModal
        show={popModal}
        closeModal={() => setPopModal(false)}
        text="آیا از پرداخت قبض مطمئن هستید ؟"
        titleOne="بله"
        titleTwo="خیر"
        methodOne={() => console.log("پرداخت")}
        methodTwo={() => setPopModal(false)}
        iconType="QUESTION"
      />
      <PopUpModal
        show={deletClick}
        closeModal={() => setDeletClick(false)}
        text="آیا از حذف قبض مطمئن هستید ؟"
        titleOne="بله"
        titleTwo="خیر"
        methodOne={() => console.log("حذف")}
        methodTwo={() => setDeletClick(false)}
        iconType="QUESTION"
      />
      {chackWallet ? (
        <ChargeWallet
          payment={() => console.log("pardakht")}
          token={token}
          amount={billAmount}
          close={() => {
            setCheckWallet(false);
          }}
        />
      ) : null}
      <Modal
        isOpen={payModalVisible}
        onRequestClose={() => setPayModalVisible(false)}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#610c34",
            alignItems: "center",
            paddingBottom: 20,
            boxSizing: "border-box",
            minHeight: "100vh",
          }}
        >
          <BillDetailPayment
            customerName={bill.Customer_name}
            billTitle={bill.BillTitle}
            billType={bill.Company_name}
            billAmount={moneySplitter(bill.Total_bill_debt)}
            billId={bill.Bill_identifier}
            serial={bill.Serial_number}
            amper={bill.Amper}
            phase={bill.Phase}
            postCode={bill.Service_post_code}
            payDeadline={bill.Payment_dead_line}
            address={bill.Service_add}
            customerType={bill.Customer_type}
          />
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              direction: "rtl",
              marginTop: 15,
            }}
          >
            <button
              style={{
                width: "35%",
                padding: 10,
                backgroundColor:
                  bill.Total_bill_debt < 1000 ? "gray" : "#05D90C",
                borderRadius: 5,
                border: "none",
                color: "#fff",
                fontFamily: "IRANSansMobile",
              }}
              disabled={bill.Total_bill_debt}
            >
              پرداخت
            </button>
            <button
              style={{
                width: "35%",
                padding: 10,
                backgroundColor: "red",
                borderRadius: 5,
                border: "none",
                color: "#fff",
                fontFamily: "IRANSansMobile",
              }}
              onClick={() => setPayModalVisible(false)}
            >
              انصراف
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BillInfo;
