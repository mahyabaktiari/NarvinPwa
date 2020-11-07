import React, { useEffect, useState } from "react";
import styles from "./styles";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Submit from "../../../components/SubmitButton/SubmitButton";
import CropFreeIcon from "@material-ui/icons/CropFree";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "../../../components/Input/input";
import SimCardRoundedIcon from "@material-ui/icons/SimCardRounded";
import axios from "axios";
import { Routes } from "../../../api/api";
import Header from "../../../components/Header/Header";
import BillCard from "../../../components/BillCard/BillCard";
import Snackbar from "@material-ui/core/Snackbar";
import { moneySplitter, fil_zro } from "../../../util/validators";
import ChargeWallet from "../../../components/ChargeWallet/ChargeWallet";
import BillInfo from "../../../components/BillInfo/BillInfo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Flag } from "@material-ui/icons";

const BillDebt = () => {
  const classes = styles();
  const [showEl, setShowEl] = useState(false);
  const [showMci, setShowMci] = useState(false);
  const [mobile, setMobile] = useState("");
  const [checked, setChecked] = useState("MID_BILL");
  const [token, setToken] = useState("");
  const [MciBillPayModal, setMciBillPayModal] = useState(false);
  const [MciBill, setMciBill] = useState([]);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [billId, setBillId] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [payId, setPayId] = useState("");
  const [chackWallet, setCheckWallet] = useState(false);
  const [billInfo, setBillInfo] = useState([]);
  const [nationalCode, setNationalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [addDept, setAddDept] = useState(false);
  const [billTitle, setBillTitle] = useState("");
  const [billIdEL, setBillIdEL] = useState("");

  console.log("checked", checked);
  console.log("token", token);
  const customStyles = {
    content: {
      width: "100%",
      height: "92vh",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      padding: 0,
      border: "none",
    },
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const MciBillInquiry = () => {
    axios
      .post(
        `${Routes.MCIInquiry}`,
        {
          Mobile: mobile,
          SubServiceCode: checked === "MID_BILL" ? "1" : "0",
        },
        { headers: { token: token } }
      )
      .then((res) => {
        let status = res.data.responseCode;
        if (status === 404) {
          setShowMci(false);
          setMobile("");
          setTextSnack(res.data.message);
          setSnackBar(true);
        } else if (status === 424) {
          setMobile("");
          setShowMci(false);
          setTextSnack(res.data.message);
          setSnackBar(true);
        } else {
          console.log(res);
          setMciBillPayModal(true);
          let mcibill = res.data.value.response;
          console.log(mcibill);
          setMciBill(mcibill);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowMci(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const MCIpaymentHandle = () => {
    let BillId = fil_zro(MciBill.BillId);
    let PayId = fil_zro(MciBill.PaymentId);
    let BillAmount = MciBill.Amount;
    console.log(BillId, PayId, BillAmount);
    axios
      .post(
        `${Routes.PayInquiy}`,
        { BillId: BillId, PaymentId: PayId },
        { headers: { token: token } }
      )
      .then((res) => {
        if (res.data.message === "قبض مورد نظر قبلا پرداخت شده است") {
          alert(res.data.message + "!");
        } else {
          setBillId(BillId);
          setPayId(PayId);
          setBillAmount(BillAmount);
          console.log("pardakht");
          setCheckWallet(true);
        }
      })
      .catch((err) => {
        console.log("error", err);
        // this.setState({isPaymentInitMCI: false});
        // this.setState({loading: false});
      });
  };

  const peymentMCI = () => {
    axios
      .post(
        `${Routes.BillPayment}`,
        {
          BillId: billId,
          PaymentId: payId,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log(res);
        // this.setState({TransactionTime: res.data.value.tranDateTime});
        // this.setState({TransactionId: res.data.value.response});
        // this.setState({isPaymentSuccess: true});
        // this.setState({isPaymentInitMCI: false});
        // this.setState({loading: false});
        // try {
        //   SoundPlayer.playSoundFile('ok_notif', 'wav');
        // } catch (e) {
        //   console.log(`cannot play the sound file`, e);
        // }
        setCheckWallet(false);
      })
      .catch((err) => {
        console.log(err);
        // this.setState({loading: false});
        // this.setState({checkWallet: false});
        setCheckWallet(false);
        // this.setState({isPaymentInitMCI: false});
      });
  };

  const getDebts = () => {
    setLoading(true);
    // const {token, loading} = this.state;
    // this.setState({isInqueryInit: true});
    // this.setState({loading: true});
    setShowEl(true);
    console.log("token is set", token);
    axios
      .post(Routes.BillInquery, {}, { headers: { token: token } })
      .then(async (res) => {
        console.log("res", res);
        let status = res.data.responseCode;
        // this.setState({ loading: false });
        setLoading(false);
        if (status === 200) {
          let data = res.data.value.response.Data;
          // this.setState({loading: false});
          // this.setState({NationalCode: res.data.value.response.Nationalcode});
          setNationalCode(res.data.value.response.Nationalcode);
          // await this.setState({billInfo: data});
          setBillInfo(data);
          console.log(data);
          setLoading(false);
          // console.log(this.state.billInfo);
        }
        if (status === 405) {
          // this.setState({loading: false});
          // this.setState({billInfo: []});
          setBillInfo([]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("ERRR", err.response);
        // this.setState({loading: false});
        // this.setState({billInfo: []});
        setTextSnack("خطا در استعلام قبض!");
        setSnackBar(true);
        setLoading(false);
        setShowEl(false);

        // Toast.show('خطا در استعلام قبض!', {
        //   position: Toast.position.center,
        //   containerStyle: {backgroundColor: 'red'},
        //   textStyle: {fontFamily: 'IRANSansMobile'},
        // });
        // this.setState({isInqueryInit: false});
      });
  };

  const addBill = () => {
    axios
      .post(
        `${Routes.AddBill}`,
        {
          BILL_IDENTIFIER: Number(billIdEL),
          BillTitle: billTitle,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log(res);
        // this.setState({RegularModalVisible: false});
        // this.setState({loading: false});
        // this.getDebts();
        // if (res.data.message === 'خطا در اعتبار سنجی مقادیر') {
        //   this.setState({loading: false});
        //   this.setState({isValid: true});
        //   this.setState({ErrorSet: true});
        //   this.setState({RegularModalVisible: true});
        // }
      })
      .catch((err) => {
        console.log(err.response);
        // this.setState({loading: false});
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.item} onClick={() => setShowMci(true)}>
        <p style={{ margin: 3, fontSize: 14 }}>همراه اول</p>
        <img
          src={require("../../../assets/icons/MC.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.item} onClick={() => getDebts()}>
        <p style={{ margin: 3, fontSize: 14 }}>برق</p>
        <img
          src={require("../../../assets/icons/EL.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.itemDisable}>
        <p style={{ margin: 3, fontSize: 14 }}>تلفن</p>
        <img
          src={require("../../../assets/icons/TC.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.itemDisable}>
        <p style={{ margin: 3, fontSize: 14 }}>آب</p>
        <img
          src={require("../../../assets/icons/WA.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.itemDisable}>
        <p style={{ margin: 3, fontSize: 14 }}>گاز</p>
        <img
          src={require("../../../assets/icons/GA.png")}
          className={classes.img}
        />
      </div>

      <div className={classes.itemDisable}>
        <p style={{ margin: 3, fontSize: 14 }}>ایرانسل</p>
        <img
          src={require("../../../assets/icons/MTN.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.itemDisable}>
        <p style={{ margin: 3, fontSize: 14 }}>مالیات</p>
        <img
          src={require("../../../assets/icons/TA.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.itemDisable}>
        <p style={{ margin: 3, fontSize: 14 }}>شهرداری</p>
        <img
          src={require("../../../assets/icons/MU.png")}
          className={classes.img}
        />
      </div>
      <div className={classes.itemDisable}>
        <p style={{ margin: 3, fontSize: 14 }}>راهنمایی رانندگی</p>
        <img
          src={require("../../../assets/icons/FZ.png")}
          className={classes.img}
        />
      </div>
      <Modal
        isOpen={showEl}
        onRequestClose={() => setShowEl(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ paddingTop: 50 }}>
          <Header text="پرداخت قبض برق" click={() => setShowEl(false)} />
          <div className={classes.addGH} onClick={() => setAddDept(true)}>
            <AddIcon />
            <p style={{ margin: 3 }}>افزودن قبض</p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "10vh",
            }}
          >
            {loading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  color="secondary"
                  style={{ marginTop: "20%" }}
                />
              </div>
            ) : (
              billInfo.map((bill) => {
                return (
                  <div style={{ width: "80%", marginTop: 20 }}>
                    <BillInfo
                      key={bill.Bill_identifier}
                      bill={bill} //data of each bill
                      token={token}
                      NationalCode={nationalCode}
                      //   loading={loading}
                      getDebts={getDebts}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showMci}
        onRequestClose={() => setShowMci(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={classes.containerWater}>
          <Header text="پرداخت قبض همراه اول" click={() => setShowMci(false)} />
          <img
            src={require("../../../assets/icons/MCI.png")}
            className={classes.imgWater}
          />
          <div
            style={{
              width: "70%",
              textAlign: "right",
              direction: "rtl",
              position: "relative",
            }}
          >
            <Input
              label="شماره موبایل همراه اول"
              value={mobile}
              change={(e) => setMobile(e.target.value)}
              type="tel"
              maxLength={11}
            />
            <SimCardRoundedIcon
              style={{
                position: "absolute",
                top: "42%",
                color: "gray",
                left: "3%",
              }}
            />
          </div>

          <FormControl
            component="fieldset"
            style={{
              width: "70%",
              boxSizing: "border-box",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              border: "1px solid gray",
              borderRadius: 10,
              backgroundColor: "#eee",
              marginTop: 10,
              fontFamily: "IRANSansMobile",
            }}
          >
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="میان دوره"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                fontFamily: "IRANSansMobile",
              }}
            >
              <FormControlLabel
                value="میان دوره"
                control={<Radio color="secondary" />}
                label="میان دوره"
                labelPlacement="start"
                onClick={() => setChecked("MID_BILL")}
              />
              <FormControlLabel
                value="پایان دوره"
                control={<Radio color="secondary" />}
                label="پایان دوره"
                labelPlacement="start"
                onClick={() => setChecked("TOTAL_BILL")}
              />
            </RadioGroup>
          </FormControl>
          <Submit
            text="استعلام"
            disable={mobile.length < 11}
            click={() => MciBillInquiry()}
          />
        </div>
      </Modal>
      <Modal
        isOpen={MciBillPayModal}
        onRequestClose={() => setMciBillPayModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <Header
            text="پرداخت قبض همراه اول"
            click={() => setMciBillPayModal(false)}
          />
          <div style={{ padding: 30, paddingTop: 70 }}>
            <BillCard
              key={Math.random()}
              BillTitle={mobile}
              BillId={MciBill.BillId}
              BillAmount={MciBill.Amount}
              showMciLogo={true}
            />
            <div
              style={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                boxShadow: "0px 2px 14px -4px gray",
                boxSizing: "border-box",
                padding: "20px 10px",
                display: "flex",
                justifyContent: "center",
                paddingTop: 0,
              }}
            >
              <Submit text="تایید و پرداخت" click={() => MCIpaymentHandle()} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={addDept}
        onRequestClose={() => setAddDept(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Header text="اضافه کردن قبض" click={() => setAddDept(false)} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 70,
            textAlign: "right",
          }}
        >
          <img
            style={{ width: 70, marginTop: 20 }}
            src={require("../../../assets/icons/EL.png")}
          />
          <div style={{ width: "70%", marginTop: 20 }}>
            <Input
              label="عنوان دلخواه قبض"
              value={billTitle}
              change={(e) => setBillTitle(e.target.value)}
            />
          </div>
          <div style={{ width: "70%" }}>
            <Input
              label="شناسه قبض"
              value={billIdEL}
              change={(e) => setBillIdEL(e.target.value)}
              maxLength={13}
              type="tel"
            />
          </div>
          <Submit text="ثبت" click={() => addBill()} />
        </div>
      </Modal>
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
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
    </div>
  );
};

export default BillDebt;
