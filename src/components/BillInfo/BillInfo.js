import React, { useEffect, useState, useRef } from "react";
import BillCard from "../BillCard/BillCard";
import Submit from "../SubmitButton/SubmitButton";
import PopUpModal from "../PopUpModal/PopUpModal";
import ChargeWallet from "../ChargeWallet/ChargeWallet";
import Modal from "react-modal";
import Styles from "./styles";
import BillDetailPayment from "../BillDetailPayment/BillDetailPayment";
import { moneySplitter, fil_zro } from "../../util/validators";
import Reciept from "../../components/Reciept/deptReciept";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import axios from "axios";
import { Routes } from "../../api/api";
import domtoimage from "dom-to-image";
import ShareBtn from "../../components/ShareBtn/ShareBtn";
import CloseBtn from "../../components/CloseBtn/CloseBtn";
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
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [TransactionId, setTransactionId] = useState("");
  const [TransactionTime, setTeransactionTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [backDrop, setBackDrop] = useState(false);
  const recieptRef = useRef();
  const classes = Styles();
  const [loadingDel, setLoadingDel] = useState(false);

  const paymentHandle = () => {
    // this.setState({isPaymentInit: true});
    // this.setState({loading: true});
    setLoading(true);
    setCheckWallet(true);
  };

  const paymentDebt = () => {
    const { bill, token } = this.props;
    let status = "";
    let BillId = fil_zro(bill.Bill_identifier);
    let PayId = fil_zro(bill.Payment_identifier);
    let billAmount = Number(bill.Total_bill_debt);
    setBillAmount(bill.Total_bill_debt);
    axios
      .post(
        `${Routes.BillPayment}`,
        {
          BillId: BillId,
          PaymentId: PayId,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        status = res.data.responseCode;
        if (status === 208) {
          alert("قبض مورد نظر قبلا پرداخت شده!");
          setPopModal(false);
          setLoading(false);
          setCheckWallet(false);
          setBackDrop(false);
        }
        if (status === 200) {
          //this.setState({isPaymentInit: false});
          this.setState({ payClick: false });
          setPopModal(false);
          setLoading(false);
          setIsPaymentSuccess(true);
          setTeransactionTime(res.data.value.tranDateTime);
          setTransactionId(res.data.value.response);
          setCheckWallet(false);
          setBackDrop(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setCheckWallet(false);
        setBackDrop(false);
      });
  };

  const DeleteBill = () => {
    setLoadingDel(true);
    axios
      .post(
        `${Routes.RemoveBill}`,
        {
          National_code: NationalCode,
          Bill_identifier: bill.Bill_identifier,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        setLoadingDel(false);
        setDeletClick(false);
        getDebts();
      })
      .catch((err) => {
        setLoadingDel(false);
        setDeletClick(false);
        alert("حذف قبض با مشکل مواجه گردیده است!");
      });
  };

  const backPayment = () => {
    axios
      .get(`${Routes.walletBalance}`, { headers: { token: token } })
      .then((res) => {
        let wallet = res.data.value.response.toString();
        if (Number(wallet) >= bill.Total_bill_debt) {
          paymentDebt();
        } else {
          setBackDrop(false);
        }
      })
      .catch((err) => {
        setCheckWallet(false);
        setBackDrop(false);
      });
  };

  const downlodReciept = () => {
    domtoimage
      .toJpeg(recieptRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "recieptTransaction.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  const shareReciept = () => {
    domtoimage
      .toJpeg(recieptRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        function b64toBlob(dataURI) {
          var byteString = atob(dataURI.split(",")[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab], { type: "image/jpeg" });
        }

        let blob = b64toBlob(dataUrl);
        const file = new File([blob], "fileName.jpg", {
          type: blob.type,
        });
        if (navigator.share !== undefined) {
          navigator
            .share({
              text: "رسید تراکنش",
              files: [file],
            })
            .then(() => {
              console.log("Thanks for sharing!");
            })
            .catch(console.error);
        } else {
          // fallback
        }
      });
  };
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
        methodOne={paymentHandle}
        methodTwo={() => setPopModal(false)}
        iconType="QUESTION"
        loading={loading}
      />
      <PopUpModal
        show={deletClick}
        closeModal={() => setDeletClick(false)}
        text="آیا از حذف قبض مطمئن هستید ؟"
        titleOne="بله"
        titleTwo="خیر"
        methodOne={DeleteBill}
        methodTwo={() => setDeletClick(false)}
        iconType="QUESTION"
        loading={loadingDel}
      />
      {chackWallet ? (
        <ChargeWallet
          payment={paymentDebt}
          token={token}
          amount={billAmount}
          backPayment={backPayment}
          backDrop={backDrop}
          openBackDrop={() => setBackDrop(true)}
          closeBackDrop={() => setBackDrop(false)}
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
      <Modal
        isOpen={isPaymentSuccess}
        onRequestClose={() => setIsPaymentSuccess(false)}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div ref={recieptRef} style={{ height: "100%", width: "100%" }}>
            <Reciept
              billTitle={bill.BillTitle}
              billType={"برق"}
              billAmount={moneySplitter(bill.Total_bill_debt)}
              billId={bill.Bill_identifier}
              payId={bill.Payment_identifier}
              TranId={TransactionId}
              billDate={TransactionTime}
            />
          </div>
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
            <CloseBtn close={() => setIsPaymentSuccess(false)} />
            <ShareBtn
              share={() => shareReciept()}
              download={() => downlodReciept()}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BillInfo;
