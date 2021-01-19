import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Submit from "../../components/SubmitButton/SubmitButton";
import Input from "../../components/Input/input";
import {
  useChargeContext,
  useChargeDispatch,
} from "../../context/buyChargeContext";
import { useBuyNetState, useBuyNetDispatch } from "../../context/buyNetContext";
import axios from "axios";
import { Routes } from "../../api/api";
import ChargeIcons from "../../components/ChargeIcons/ChargeIcons";
import ChargeSims from "../../components/ChargeSims/ChargeSims";
import Modal from "react-modal";
import StarBorderTwoToneIcon from "@material-ui/icons/StarBorderTwoTone";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import NetGroupBox from "../../components/NetGroupBox/NetGroupBox";
import MtnPkgMap from "../../components/BuyNet/MtnPkgMap";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import NetCard from "../../components/NetCard/NetCard";
import { moneySplitter, ToRial, fixNumbers } from "../../util/validators";
import ChargeWallet from "../../components/ChargeWallet/ChargeWallet";
import Reciept from "../../components/Reciept/netReciept";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import domtoimage from "dom-to-image";
import ShareBtn from "../../components/ShareBtn/ShareBtn";
import CloseBtn from "../../components/CloseBtn/CloseBtn";
import ListItem from "../../components/ListItem/ListItem";

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
const modalStyle = {
  content: {
    width: "100%",
    height: "38vh",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
    top: "none",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
};
const BuyNet = (props) => {
  const {
    payModal,
    faveModal,
    contactSelect,
    isMci,
    isMtn,
    isTla,
    isRTL,
    operator,
    number,
  } = useChargeContext();

  let selectedNum = number.replace(/ +/g, "");
  selectedNum = selectedNum.replace("+98", "0");
  const [simNum, setSimNum] = useState("");
  const [token, setToken] = useState("");
  const [uniqId, setUniqId] = useState("");
  const [faveNums, setFaveNums] = useState("");
  const [checked, setChecked] = useState(false);
  const [products, setProducts] = useState([]);
  const [typeSim, setTypeSim] = React.useState(false);
  const [netPkg, setNetPkg] = React.useState([]);
  const [simType, setSimType] = React.useState("");
  const [chackWallet, setCheckWallet] = useState(false);
  const [faveName, setFaveName] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);
  const [tranId, setTranId] = useState("");
  const [tranDate, setTranDate] = useState("");
  const [pkgName, setPkgName] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [backDrop, setBackDrop] = useState(false);
  const [back, setBack] = useState(false);
  const [contactDeletSuccess, setContactDeletSuccess] = useState(false);

  const recieptRef = useRef();

  const {
    packageInfo,
    finializedPay,
    confirmPayModal,
    hourly,
    daily,
    weekly,
    monthly,
    yearly,
    netGroupId,
  } = useBuyNetState();

  const dispatchBuyNet = useBuyNetDispatch();
  const dispatch = useChargeDispatch();
  const classes = styles();
  useEffect(() => {
    reset();
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    setSimNum(localStorage.getItem("phoneNumber"));
    setUniqId(localStorage.getItem("DeviceUniqId"));
    getFavs(tokenStorage);
  }, []);
  useEffect(() => {
    setOperator();
  }, [number]);
  useEffect(() => {
    getNetType(token);
  }, [operator]);
  useEffect(() => {
    getPkg(token);
  }, [netGroupId]);

  function getFavs(token) {
    axios
      .get(`${Routes.getFave}`, { headers: { token: token } })
      .then((res) => {
        let status = res.data.responseCode;
        if (status === 200) {
          setFaveNums(res.data.value.response);
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  const getSimNum = () => {
    dispatch({ type: "NUM_CHANGED", payload: simNum });
  };
  const setOperator = () => {
    if (selectedNum.substr(0, 3) === "093" || number.substr(0, 3) === "090") {
      dispatch({ type: "IS_MTN" });
    }
    if (selectedNum.substr(0, 3) === "091" || number.substr(0, 3) === "099") {
      dispatch({ type: "IS_MCI" });
    }
    if (selectedNum.substr(0, 3) === "092") {
      dispatch({ type: "IS_RIGHTEL" });
    }
    if (selectedNum === "") {
      dispatch({ type: "RESET_SIMS" });
    }
  };

  function getNetType(token) {
    let id = isMci ? "1" : isMtn ? "2" : isRTL ? "3" : "4";
    axios
      .get(`${Routes.GetNetType}/${id}`, { headers: { token: token } })
      .then((res) => {
        let status = res.data.responseCode;
        if (status === 200) {
          let sims = res.data.value.response;
          setProducts(sims);
        } else {
          // setLoading(false);
        }
      })
      .catch((err) => {
        setTextSnack(err.data.message);
        setSnackBar(true);
      });
  }
  function getPkg(token, sim) {
    // setLoadingBtn(true);

    let operatorId = isMci ? "1" : isMtn ? "2" : isRTL ? "3" : "4";
    //setLoading(true);
    setBackDrop(true);

    axios
      .get(`${Routes.GetPackages}/${operatorId}/${simType}/${netGroupId}`, {
        headers: { token: token },
      })
      .then((res) => {
        setTypeSim(false);
        let status = res.data.responseCode;
        if (status === 200) {
          dispatch({ type: "OPEN_PAY_MODAL" });
          // setLoading(false);
          setBackDrop(false);

          setNetPkg(res.data.value.response);
        } else {
          setTextSnack(res.data.message);
          setSnackBar(false);
          setBackDrop(false);
        }
      })
      .catch((err) => {
        setBackDrop(false);

        setTypeSim(false);
        // setLoading(false);
        // setTextSnack(res.data.message);
        // setSnackBar(true);
      });
  }

  function paymentHandle() {
    setCheckWallet(true);
    // setLoading(true);
    // setPayInit(true);
  }

  const peymentNet = () => {
    axios
      .post(
        `${Routes.buyCharge}`,
        {
          DeviceUniqId: uniqId,
          CiId: packageInfo.id,
          ProductId: 2,
          Operator: isMci
            ? "همراه اول"
            : isMtn
            ? "ایرانسل"
            : isRTL
            ? "رایتل"
            : isTla && "تالیا",
          Amount: packageInfo.pricePaid,
          Mobile: selectedNum,
          ChargeType: "TopUp",
          Remember: checked ? true : false,
          Title:
            Number(selectedNum) === Number(simNum)
              ? "خودم"
              : faveName == null || faveName === ""
              ? "بدون نام"
              : faveName,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        let status = res.data.responseCode;
        if (status === 200) {
          // setLoading(false);
          // setPayInit(false);
          setPaySuccess(true);
          setBackDrop(false);
          // setBackdrop(false);
          setCheckWallet(false);
          setTranId(res.data.value.response);
          setTranDate(res.data.value.tranDateTime);
          setPkgName(res.data.value.packageName);
          dispatch({ type: "CLOSE_PAY_MODAL" });
        }

        if (status === 424) {
          //payinit NOT False if no wallet balance else false
          // setLoading(false);
          setTextSnack(res.data.message);
          setSnackBar(true);
          setCheckWallet(false);
          setBackDrop(false);
          reset();
          // setBackdrop(false);
        }
        if (status === 405) {
          // setLoading(false);
          setTextSnack(res.data.message);
          setSnackBar(true);
          setCheckWallet(false);
          reset();
          setBackDrop(false);
          // setBackdrop(false);
        }
        if (status === 500) {
          setTextSnack(res.data.message);
          setSnackBar(true);
          setCheckWallet(false);
          // setBackdrop(false);
          reset();
          setBackDrop(false);
        }
      })
      .catch((err) => {
        setTextSnack(err.response.data.message);
        // setLoading(false);
        // setPayInit(false);
        setPaySuccess(false);
        setCheckWallet(false);
        setBackDrop(false);
        reset();
        // setBackdrop(false);
      });
  };

  function reset() {
    setSimType("");
    setChecked(false);
    dispatch({ type: "RESET_SIMS" });
    dispatch({ type: "BUY_PKG_REFUSE" });
    dispatch({ type: "CLOSE_PAY_MODAL" });
    dispatchBuyNet({ type: "BUY_PKG_REFUSE" });
    getFavs(token);
  }

  const backPayment = () => {
    axios
      .get(`${Routes.walletBalance}`, { headers: { token: token } })
      .then((res) => {
        let status = res.data.responseCode;
        if (status === 200) {
          let walAmount = res.data.value.response;
          if (Number(walAmount) >= packageInfo.pricePaid) {
            peymentNet();
          } else {
            //     setLoading(false);
            setBackDrop(false);
            setTextSnack("موجودی کافی نیست");
            setSnackBar(true);
            setPaySuccess(false);
            setCheckWallet(false);
            reset();
            //  setBackdrop(false);
          }
        } else {
          //   setLoading(false);
          //    setPayInit(false);
          setPaySuccess(false);
          setCheckWallet(false);
          setBackDrop(false);
          reset();
          //setBackdrop(false);
          setTextSnack(res.data.message);
          setSnackBar(true);
        }
      })
      .catch((err) => {
        //   setLoading(false);
        //   setPayInit(false);
        setPaySuccess(false);
        reset();
        setBackDrop(false);
        // setBackdrop(false);
        setCheckWallet(false);
        setTextSnack("خطای سیستمی!");
        setSnackBar(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  useEffect(() => {
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, []);
  window.onpopstate = () => {
    setBack(true);
  };
  useEffect(() => {
    back ? popStateListener() : console.log("false");
  }, [back]);
  var backButtonPrevented = false;
  function popStateListener(event) {
    console.log("BACK");
    if (backButtonPrevented === false) {
      window.history.pushState(
        { name: "browserBack" },
        "on browser back click",
        window.location.href
      );
      backButtonPrevented = true;
      setBack(false);
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

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

  function deleteContact(contact) {
    axios
      .put(
        `${Routes.deleteFave}`,
        { Mobile: contact, Isdelete: true },
        { headers: { token: token } }
      )
      .then((res) => {
        setContactDeletSuccess(true);
        getFavs(token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    getFavs(token);
  }, [contactDeletSuccess]);
  return (
    <React.Fragment>
      <Header
        text="بسته اینترنت"
        click={() => {
          props.history.push("/services");
          reset();
        }}
      />
      <div className={classes.container}>
        <div style={{ width: "70%", textAlign: "right" }}>
          <Input
            label="شماره موبایل"
            value={selectedNum}
            change={(e) =>
              dispatch({
                type: "NUM_CHANGED",
                payload: fixNumbers(e.target.value),
              })
            }
            type="tel"
          />
        </div>
        {selectedNum.length === 11 ? (
          <div
            style={{
              direction: "rtl",
              marginTop: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              width: "70%",
            }}
          >
            <input type="checkbox" onClick={() => setChecked(!checked)} />
            <span
              style={{
                fontFamily: "IRANSansMobile",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {" "}
              افزودن این شماره به لیست منتخب
            </span>
          </div>
        ) : null}
        <ChargeIcons
          openContacts={() => console.log("getContect")}
          OpenFavs={() => dispatch({ type: "OPEN_FAVE_MODAL" })}
          getSim={getSimNum}
        />
        <ChargeSims
          disabled={selectedNum.length !== 11}
          mciChoose={() => dispatch({ type: "IS_MCI" })}
          mtnChoose={() => dispatch({ type: "IS_MTN" })}
          rightelChoose={() => dispatch({ type: "IS_RIGHTEL" })}
        />
        <button
          className={
            selectedNum.length !== 11 ? classes.disable : classes.btnSubmit
          }
          onMouseDown={() => {
            isMci
              ? products.map((sim) => {
                  setSimType(sim.id);
                  getPkg(token, sim.id);
                })
              : setTypeSim(true);
          }}
          onMouseUp={() => {
            isMci ? getPkg(token) : console.log("not");
          }}
          disabled={selectedNum.length !== 11}
        >
          <span style={styles.title}>ادامه</span>
        </button>
      </div>
      <Modal
        style={customStyles}
        isOpen={faveModal}
        onRequestClose={() => dispatch({ type: "CLOSE_FAVE_MODAL" })}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <Header
          text="شماره های منتخب"
          click={() => dispatch({ type: "CLOSE_FAVE_MODAL" })}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 70,
          }}
        >
          {faveNums.length !== 0 ? (
            faveNums.map((favenum) => {
              return (
                <ListItem
                  name={favenum.title}
                  number={favenum.mobile}
                  chooseContact={() =>
                    dispatch({ type: "NUM_CHANGED", payload: favenum.mobile })
                  }
                  deleteContact={() => deleteContact(favenum.mobile)}
                />
              );
            })
          ) : (
            <div
              style={{
                alignSelf: "center",
                marginTop: "25%",
                fontFamily: "IRANSansMobile",
                color: "#CD0448",
                opacity: "0.7",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>.شماره تلفن منتخبی ثبت نشده است</span>
              <StarBorderTwoToneIcon fontSize="large" />
            </div>
          )}
        </div>
      </Modal>
      <Modal
        style={modalStyle}
        isOpen={typeSim}
        onRequestClose={() => setTypeSim(false)}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div
          style={{
            padding: "5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <KeyboardArrowDownRoundedIcon fontSize="large" />
          <div
            style={{
              border: "1px solid gray",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              borderRadius: 3,
            }}
          >
            {products.map((Sim, index) => {
              return (
                <div
                  style={{
                    // borderBottomWidth: index === products.length - 1 ? 0 : 1,
                    // borderBottomColor: "gray",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    borderBottom:
                      index === products.length - 1 ? "none" : "1px solid gray",
                    padding: "1%",
                  }}
                >
                  <button
                    onMouseDown={() => setSimType(Sim.id)}
                    onMouseUp={() => getPkg(token)}
                    className={classes.btn}
                  >
                    <span
                      style={{
                        textAlign: "left",
                        fontFamily: "IRANSansMobile",
                      }}
                    >
                      {Sim.title}
                    </span>
                  </button>
                </div>
              );
              // return <Text style={{textAlign:'left'}}>{Sim.title}</Text>
            })}
          </div>
        </div>
      </Modal>
      <Modal
        style={customStyles}
        isOpen={payModal}
        onRequestClose={() => dispatch({ type: "CLOSE_PAY_MODAL" })}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <Header
          text="بسته اینترنت"
          click={() => dispatch({ type: "CLOSE_PAY_MODAL" })}
        />
        <div
          style={{
            padding: 10,

            paddingTop: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              boxSizing: "border-box",
              direction: "rtl",
              padding: 7,
            }}
          >
            <NetGroupBox
              groupName="ساعتی"
              sel={hourly}
              click={() => dispatchBuyNet({ type: "HOURLY_SELECT" })}
            />
            <NetGroupBox
              groupName="روزانه"
              sel={daily}
              click={() => dispatchBuyNet({ type: "DAILY_SELECT" })}
            />
            <NetGroupBox
              groupName="هفتگی"
              sel={weekly}
              click={() => dispatchBuyNet({ type: "WEEKLY_SELECT" })}
            />
            <NetGroupBox
              groupName="ماهیانه"
              sel={monthly}
              click={() => dispatchBuyNet({ type: "MONTHLY_SELECT" })}
            />
            <NetGroupBox
              groupName="سالیانه"
              sel={yearly}
              click={() => dispatchBuyNet({ type: "YEARLY_SELECT" })}
            />
          </div>
          {netPkg.length !== 0 ? (
            netPkg.map((data) => {
              return (
                <div
                  key={Math.random()}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MtnPkgMap data={data} operator={operator} />
                </div>
              );
            })
          ) : (
            <div
              style={{
                marginTop: "20%",
                color: "#CD0448",
                opacity: 0.7,
                fontFamily: "IRANSansMobile",
                direction: "rtl",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <NotFound text={'بسته ای یافت نشد!'} /> */}
              <InfoOutlinedIcon fontSize="large" />
              <span> بسته ای یافت نشد!</span>
            </div>
          )}
          {/* <MtnPkgMap />
          <div></div> */}
        </div>
        <Backdrop className={classes.backdrop} open={backDrop}>
          <CircularProgress color="secondary" />
        </Backdrop>
      </Modal>
      <Modal
        style={customStyles}
        isOpen={confirmPayModal}
        onRequestClose={() => dispatchBuyNet({ type: "BUY_PKG_REFUSE" })}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <Header
          text="بسته اینترنت"
          click={() => dispatchBuyNet({ type: "BUY_PKG_REFUSE" })}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 70,
            width: "100%",
          }}
        >
          <NetCard
            type={packageInfo.packageName}
            initialAmount={packageInfo.price}
            amount={moneySplitter(packageInfo.pricePaid)}
            num={selectedNum}
            // loading={loading}
            // payInit={() => dispatchBuyNet({type: 'BUY_PKG_INIT'})}
            payInit={paymentHandle}
            operator={operator}
          />
        </div>
      </Modal>
      <Modal
        isOpen={paySuccess}
        onRequestClose={() => {
          setPaySuccess(false);
          dispatch({ type: "NUM_EMPTY" });
          reset();
        }}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div ref={recieptRef} style={{ height: "100%", width: "100%" }}>
            <Reciept
              num={selectedNum}
              amount={packageInfo.pricePaid}
              chargeType={pkgName}
              tranId={tranId}
              tranDate={tranDate}
              operator={operator}
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
            <CloseBtn
              close={() => {
                setPaySuccess(false);
                dispatch({ type: "NUM_EMPTY" });
                reset();
              }}
            />
            <ShareBtn
              share={() => shareReciept()}
              download={() => downlodReciept()}
            />
          </div>
        </div>
      </Modal>
      {chackWallet ? (
        <ChargeWallet
          token={token}
          amount={packageInfo.pricePaid}
          payment={peymentNet}
          backPayment={backPayment}
          backDrop={backDrop}
          openBackDrop={() => setBackDrop(true)}
          closeBackDrop={() => setBackDrop(false)}
          close={() => {
            setCheckWallet(false);
          }}
        />
      ) : null}
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
      <NavigationBottom item="SERVISES" />
    </React.Fragment>
  );
};

export default BuyNet;
