import React, { useState, useEffect, useRef } from "react";
import { useBusState, useBusDispatch } from "../../context/busContext";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { moneySplitter, ToRial } from "../../util/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import useStyle from "./style";
import { parse, parseDefaults } from "himalaya";
import axios from "axios";
import { Routes } from "../../api/api";
import Header from "../../components/Header/Header";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import SeatReserve from "../../components/seatReserve/SeatReserve";
import Submit from "../../components/SubmitButton/SubmitButton";
import Input from "../Input/input";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChargeWallet from "../../components/ChargeWallet/ChargeWallet";
import Reciept from "../../components/Reciept/ticketBusReciept";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
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
const styleModal = {
  content: {
    width: "100%",
    overflow: "hidden",
    bottom: 0,
    right: 0,
    left: 0,
    top: "auto",
    padding: 0,
    zIndex: 10000,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
};
const BusInfo = (props) => {
  console.log(props.service);
  const [busInfo, setBusInfo] = useState(false);
  let typeBus = props.service.typeBus;
  typeBus = typeBus.includes("تلفن") ? typeBus.split("تلفن")[0] : typeBus;
  typeBus = typeBus.includes("*") ? typeBus.split("*")[0] : typeBus;
  typeBus = typeBus.includes("تماس") ? typeBus.split("تماس")[0] : typeBus;
  typeBus = typeBus.includes("(پذیرائی ویژه)")
    ? typeBus.split("(پذیرائی ویژه)")[0]
    : typeBus;
  typeBus = typeBus.includes("+") ? typeBus.split("+")[0] : typeBus;
  typeBus = typeBus.includes("(") ? typeBus.split("(")[0] : typeBus;
  typeBus = typeBus.includes("(تخت شو)")
    ? typeBus.split("(تخت شو)")[0]
    : typeBus;
  typeBus = typeBus.includes("تخت شو") ? typeBus.split("تخت شو")[0] : typeBus;
  typeBus = "اتوبوس " + typeBus.trim();
  const serviceInfo = props.service;

  console.log("totalPrice", totalPrice);
  const dispatch = useBusDispatch();
  const { counter, seatRequest, seatRequestGender } = useBusState();
  const totalPrice =
    serviceInfo.price === serviceInfo.discountPrice
      ? serviceInfo.price * counter
      : serviceInfo.discountPrice * counter;
  const classes = useStyle();
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buyTicket, setBuyTicket] = useState(false);
  const [recieptTicket, setRecieptTicket] = useState(false);
  const [showGender, setShowGender] = useState(false);
  // const recieptRef = useRef();
  const [uniqId, setUniqId] = useState();
  const [id, setId] = useState();
  const [verifyId, setVerifyId] = useState();
  const [isPhoneNum, setIsPhoneNum] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [ticket, setTicket] = useState("");
  const [payInit, setPayInit] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);
  const [reservTicket, setReservTicket] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [Rsv, setRsv] = useState(false);
  const [checkWallet, setCheckWallet] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [seatsBus, setSeatsBus] = useState([]);
  const [colSeat, setColSeat] = useState("");
  const [backDrop, setBackDrop] = useState(false);
  const recieptRef = useRef();

  const numberCol = Number(colSeat.col);

  const [tableData, setTableData] = useState([]);
  console.log(seatsBus, colSeat);
  console.log("tableData", tableData);
  useEffect(() => {
    setUniqId(localStorage.getItem("DeviceUniqId"));
  }, []);
  useEffect(() => {
    let data = [];
    for (let i = 0; i < Number(colSeat.row); i++) {
      const rowData = [];
      for (let j = 0; j <= numberCol - 1; j++) {
        if (j === 2) {
          rowData.push("");
        }
        rowData.push(seatsBus[i + j + i * (numberCol - 1)]);
      }
      data.push(rowData);
    }
    setTableData(data);
  }, [colSeat]);

  const showReserv = (dispatch) => {
    dispatch({
      type: "New_select",
      counter: 0,
      seatRequest: [],
      seatRequestGender: [],
    });
  };
  const showSeat = () => {
    axios
      .post(
        `${Routes.SeatRequest}`,
        {
          SrvNo: serviceInfo.numServis,
          coToken: serviceInfo.tokenCompany,
        },
        {
          headers: { token: props.token },
        }
      )
      .then((res) => {
        const outPut = JSON.parse(res.data.value.response).output;
        let col = outPut.split("Col")[1];
        col = col.split(">")[1];
        col = col.split("<")[0];
        const json = parse(outPut, {
          ...parseDefaults,
          includePositions: true,
        });
        const seat = json[0].children;
        const justSeat = seat.filter((filter) => {
          return filter.type !== "text";
        });
        const seatBus = {
          capacity: justSeat[0].children[0].content,
          floor: justSeat[1].children[0].content,
          col: col,
          row: justSeat[3].children[0].content,
          space: justSeat[4].children[0].content,
          seats: justSeat[5].children[0].content,
        };

        const SeatSplit = seatBus.seats.split(",");
        const seatInfo = SeatSplit.map((seat) => {
          return seat.split("/");
        });
        setSeatsBus(seatInfo);
        setColSeat({
          row: seatBus.row,
          capacity: seatBus.capacity,
          space: seatBus.space,
          col: seatBus.col,
        });
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
      });
  };

  const showTable = () => {
    console.log("TTT");
    tableData.map((teble, index) => {
      return (
        <>
          <tr key={index}>
            {console.log(index)}
            {teble.map((cel, num) => {
              console.log("td");
              return <td key={num}>{cel[0]}</td>;
            })}{" "}
          </tr>
        </>
      );
    });
  };

  const phoneValidation = () => {
    let valid = new RegExp("^(\\+98|0)?9\\d{9}$");
    setTouched(true);
    if (!valid.test(phoneNumber) && phoneNumber !== "") {
      setIsPhoneNum(false);
    } else {
      setIsPhoneNum(true);
    }
  };

  const reserve = () => {
    console.log("RESERVED");
    setPayInit(true);
    const numGender = gender === "خانم" ? 1 : 2;
    axios
      .post(
        `${Routes.SeatReserve}`,
        {
          DeviceUniqId: uniqId,
          ServiceNumber: serviceInfo.numServis,
          CompanyToken: serviceInfo.tokenCompany,
          Seats: seatRequestGender.toString(),
          Mobile: phoneNumber,
          PassengerName: fullName,
          Gender: numGender.toString(),
          DepartDate: props.time,
          DepartTime: serviceInfo.movingTime,
          SrcCityId: serviceInfo.srccityname,
          DesCityId: serviceInfo.descityid,
          PassengerCount: counter,
          Price: serviceInfo.discountPrice,
          FullPrice: serviceInfo.price,
          CompanyName: serviceInfo.company,
          FinalDesCityId: serviceInfo.finalDescityId,
        },
        {
          headers: { token: props.token },
        }
      )
      .then((res) => {
        console.log("reserve", res);
        if (res.data.responseCode === 200) {
          setReserved(true);
          setRsv(true);
          const verify = res.data.value.verId;
          setVerifyId(verify);
          const id2 = res.data.value.response;
          setId(id2);
          console.log(verify, id2);
          setCheckWallet(true);
          setLoadingPay(false);
        } else {
          alert(res.data.message);
          setLoadingPay(false);
          setRsv(true);
          setCheckWallet(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("خطا در برقراری ارتباط با سرور");
        setLoadingPay(false);
        setPayInit(false);
        setCheckWallet(false);
      });
  };

  const hendelpayment = () => {
    setLoadingPay(false);
    //  setPayInit(true);
    setCheckWallet(true);
  };

  const cancleTicket = () => {
    axios
      .post(
        `${Routes.CanselTicket}`,
        { Id: id, VerifyId: verifyId },
        {
          headers: { token: props.token },
        }
      )
      .then((res) => {
        console.log("CANSEL", res);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const PaymentTicket = () => {
    console.log(reserved);
    axios
      .post(
        `${Routes.SaleVerify}`,
        {
          VerifyId: verifyId,
          Id: id,
          TerminalId: "0",
        },
        {
          headers: { token: props.token },
        }
      )
      .then((res) => {
        console.log("Ok SaleVeify");
        if (res.data.responseCode === 200) {
          console.log(res);
          setTicket(res.data.value);
          setLoadingPay(false);
          setRecieptTicket(true);
          setPayInit(false);
          setCheckWallet(false);
          // setBackdrop(false);
        } else {
          alert(res.data.message);
          setLoadingPay(false);
          setPayInit(false);
          setCheckWallet(false);
          //   setBackdrop(false);
          console.log("res", res);
          if (res.data.responseCode === 402) {
            console.log(res);
            if (!res.data.value.refund) {
              setReserved(true);
              setRsv(true);
            } else {
              setReserved(false);
              setRsv(true);
            }
          }
        }
      })
      .catch((err) => {
        setCheckWallet(false);
        setRecieptTicket(false);
        // setBackdrop(false);
        console.log(err);
        setLoadingPay(false);
        alert("رزرو نا موفق");
        setPayInit(false);
      });
  };

  const backPayment = () => {
    let wallet = "";
    axios
      .get(Routes.walletBalance, { headers: { token: props.token } })
      .then((res) => {
        wallet = res.data.value.response;
        console.log(wallet);

        if (Number(wallet) >= totalPrice) {
          PaymentTicket();
          console.log(totalPrice);
        } else {
          setRsv(true);
          setBackDrop(false);
          console.log("kame");
        }
      })
      .catch((err) => {
        console.log("err get", err);
        setLoadingPay(false);
        setPayInit(false);
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
      <button
        style={{
          width: "95%",
          borderRadius: 5,
          backgroundColor: "#eee",
          display: "flex",
          flexDirection: "column",
          border: "1px solid gray",
          marginTop: 10,
        }}
        onClick={() => {
          setBusInfo(true);
          showSeat();
          showReserv(dispatch);
        }}
      >
        <div
          style={{
            // width: "100%",
            display: "flex",
            direction: "rtl",
            borderBottom: "1px solid #b3b3b3",
            paddingBottom: 5,
            width: "90vw",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "65%",
              //   alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "IRANSansMobile",
              }}
            >
              <AccessTimeIcon style={{ color: "#610c34" }} />
              <span style={{ marginTop: 5 }}>{serviceInfo.movingTime}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "IRANSansMobile",
              }}
            >
              <AirlineSeatReclineNormalIcon style={{ color: "#610c34" }} />
              <span style={{ marginTop: 5 }}>
                {" "}
                {serviceInfo.seatsAvailable} صندلی موجود{" "}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "IRANSansMobile",
              }}
            >
              <DirectionsBusIcon style={{ color: "#610c34" }} />
              <span style={{ marginTop: 5, textAlign: "right", width: "100%" }}>
                {typeBus}
              </span>
            </div>
          </div>
          <div
            style={{
              width: "35%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              fontFamily: "IRANSansMobile",
            }}
          >
            {serviceInfo.discountPrice === serviceInfo.price ? (
              <div>
                <span style={{ color: "green", fontSize: 16 }}>
                  {ToRial(serviceInfo.price)} ریال
                </span>
              </div>
            ) : (
              <div>
                <div>
                  <span style={{ color: "green", fontSize: 16 }}>
                    {ToRial(serviceInfo.discountPrice)} ریال
                  </span>
                </div>
                <div style={{ marginTop: 10 }}>
                  <span
                    style={{
                      color: "red",
                      textDecorationLine: "line-through",
                      fontSize: 13,
                    }}
                  >
                    {ToRial(serviceInfo.price)} ریال
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "IRANSansMobile",
            padding: "5px 0",
            width: "100%",
            direction: "rtl",
          }}
        >
          <span style={{ direction: "rtl", width: "50%", textAlign: "right" }}>
            مبدا : {serviceInfo.origin}{" "}
          </span>
          <span style={{ direction: "rtl", width: "50%", textAlign: "left" }}>
            مقصد : {serviceInfo.destination}{" "}
          </span>
          {/* <FontAwesomeIcon icon={faFemale} size="lg" /> */}
        </div>
      </button>
      <Modal
        isOpen={busInfo}
        onRequestClose={() => {
          setBusInfo(false);
        }}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <div style={{ paddingTop: 70 }}>
          <Header text="انتخاب صندلی" click={() => setBusInfo(false)} />
          <div
            style={{
              padding: 15,
              margin: 5,
              width: "95%",
              marginLeft: "2.5%",
              borderRadius: 5,
              border: "0.5px solid gray",
              direction: "rtl",
              fontFamily: "IRANSansMobile",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <StopRoundedIcon
                  style={{ width: 50, height: 50, color: "gray" }}
                />{" "}
                <span>قابل انتخاب</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faFemale}
                  style={{ fontSize: 40 }}
                  color="red"
                />
                <span>خریداری شده (خانم)</span>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "0.5px solid gray",
                paddingBottom: 15,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <StopRoundedIcon
                  style={{ width: 50, height: 50, color: "green" }}
                />{" "}
                <span>انتخاب شما</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faMale}
                  color="red"
                  style={{ fontSize: 40 }}
                />
                <span>خریداری شده (آقا)</span>
              </div>
            </div>
            <div
              style={{
                marginTop: 15,
                backgroundColor: "#ededed",
                borderRadius: 10,
                padding: 10,
                boxSizing: "border-box",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <img
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignSelf: "flex-end",
                    marginHorizontal: 20,
                    marginLeft: 20,
                  }}
                  resizeMode="contain"
                  src={require("../../assets/icons/carRol.webp")}
                />
              </div>
              <table style={{ width: "100%" }}>
                <tbody>
                  {tableData
                    ? tableData.map((teble, index) => {
                        return (
                          <>
                            <tr key={index}>
                              {console.log(index)}
                              {teble.map((cellData, num) => {
                                console.log("td");
                                if (cellData === "") {
                                  console.log(cellData, "null");
                                  return (
                                    <td
                                      key={num}
                                      style={{ textAlign: "center", width: 60 }}
                                    >
                                      <SeatReserve text="" color="#fff" />
                                    </td>
                                  );
                                } else {
                                  return (
                                    <td
                                      key={num}
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      {" "}
                                      <SeatReserve
                                        text={cellData[1]}
                                        color=""
                                        seatInfo={cellData[2]}
                                        counter={counter}
                                        // onPress={() => {
                                        //   setSeletedSeat([
                                        //     ...selectedSeat,
                                        //     cellData[1],
                                        //   ]);
                                        // }}
                                      />{" "}
                                    </td>
                                  );
                                }
                              })}{" "}
                            </tr>
                          </>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Submit
              text="تایید و ادامه"
              click={() => {
                setBuyTicket(true);
              }}
              disable={!counter}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={buyTicket}
        onRequestClose={() => {
          setBuyTicket(false);
        }}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <div style={{ paddingTop: 70 }}>
          <Header text="اطلاعات سرپرست" click={() => setBuyTicket(false)} />
          <div
            style={{
              width: "95%",
              borderRadius: 5,
              backgroundColor: "#eee",
              display: "flex",
              flexDirection: "column",
              border: "1px solid gray",
              marginTop: 10,
              direction: "rtl",
              marginLeft: "2.5%",
              fontSize: 13,
              padding: 10,
              boxSizing: "border-box",
            }}
            onClick={() => {
              setBusInfo(true);
              showSeat();
              showReserv(dispatch);
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                direction: "rtl",
                borderBottom: "1px solid #b3b3b3",
                paddingBottom: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "65%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  <AccessTimeIcon style={{ color: "#610c34" }} />
                  <span style={{ marginTop: 5 }}>{serviceInfo.movingTime}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  <AirlineSeatReclineNormalIcon style={{ color: "#610c34" }} />
                  <span style={{ marginTop: 5 }}>
                    {" "}
                    {serviceInfo.seatsAvailable} صندلی موجود{" "}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "IRANSansMobile",
                  }}
                >
                  <DirectionsBusIcon style={{ color: "#610c34" }} />
                  <span
                    style={{ marginTop: 5, textAlign: "right", width: "100%" }}
                  >
                    {typeBus}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "35%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  fontFamily: "IRANSansMobile",
                }}
              >
                {serviceInfo.discountPrice === serviceInfo.price ? (
                  <div>
                    <span style={{ color: "green", fontSize: 16 }}>
                      {ToRial(serviceInfo.price)} ریال
                    </span>
                  </div>
                ) : (
                  <div>
                    <div>
                      <span style={{ color: "green", fontSize: 16 }}>
                        {ToRial(serviceInfo.discountPrice)} ریال
                      </span>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <span
                        style={{
                          color: "red",
                          textDecorationLine: "line-through",
                          fontSize: 13,
                        }}
                      >
                        {ToRial(serviceInfo.price)} ریال
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                direction: "rtl",
                borderBottom: "1px solid #b3b3b3",
                paddingBottom: 5,
                fontFamily: "IRANSansMobile",
                paddingTop: 5,
              }}
            >
              <span>تعداد مسافران: {counter}</span>
              <span>
                شماره صندلی ها: {seatRequest.toString().replace(/,/g, "-")}{" "}
              </span>
              <span>مجموع قیمت: {ToRial(totalPrice.toString())}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "IRANSansMobile",
                padding: "10px 0 0",
                width: "100%",
                direction: "rtl",
              }}
            >
              <span
                style={{ direction: "rtl", width: "50%", textAlign: "right" }}
              >
                مبدا : {serviceInfo.origin}{" "}
              </span>
              <span
                style={{ direction: "rtl", width: "50%", textAlign: "left" }}
              >
                مقصد : {serviceInfo.destination}{" "}
              </span>
              {/* <FontAwesomeIcon icon={faFemale} size="lg" /> */}
            </div>
          </div>

          <div
            style={{
              width: "95%",
              borderRadius: 5,
              backgroundColor: "#f5f5f5",
              border: "1px solid gray",
              marginTop: 10,
              direction: "rtl",
              marginLeft: "2.5%",
              fontSize: 13,
              boxSizing: "border-box",
              marginTop: 15,
            }}
          >
            <div
              style={{
                backgroundColor: "#ccc",
                textAlign: "center",
                fontFamily: "IRANSansMobile",
                fontSize: 14,
                padding: 10,
                boxSizing: "border-box",
              }}
            >
              <span>اطلاعات سرپرست</span>
            </div>
            <div style={{ width: "70%", marginRight: "15%", marginBottom: 15 }}>
              <Input
                label="نام و نام خانوادگی"
                value={fullName}
                change={(e) => setFullName(e.target.value)}
                type="search"
              />
              <Input
                label="شماره تلفن همراه"
                value={phoneNumber}
                change={(e) => setPhoneNumber(e.target.value)}
                blur={phoneValidation}
                type="tel"
              />
              <Input
                label="جنسیت"
                readOnly={true}
                value={gender}
                click={() => setShowGender(true)}
              />
            </div>
          </div>
          {!isPhoneNum && touched ? (
            <p
              style={{
                textAlign: "center",
                color: "red",
                fontSize: 14,
                fontFamily: "IRANSansMobile",
              }}
            >
              شماره موبایل وارد شده صحیح نمی باشد
            </p>
          ) : null}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Submit
              text="تایید و ادامه"
              click={() => {
                setReservTicket(true);
              }}
              disable={!fullName || !gender || !phoneNumber || !isPhoneNum}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showGender}
        onRequestClose={() => {
          setShowGender(false);
        }}
        style={styleModal}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: 20,
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <KeyboardArrowDownRoundedIcon
            style={{
              width: "15%",
              height: 35,
              textAlign: "center",
              marginBottom: 5,
            }}
            onClick={() => {
              setShowGender(false);
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "0.5px solid gray",
              borderRadius: 5,
            }}
          >
            <button
              style={{
                fontFamily: "IRANSansMobile",
                padding: 10,
                width: "98%",
                backgroundColor: "#fff",
                border: "none",
                borderBottom: "1px solid gray",
                margin: 2,
              }}
              onClick={() => {
                setGender("خانم");
                setShowGender(false);
              }}
            >
              خانم
            </button>
            <button
              style={{
                fontFamily: "IRANSansMobile",
                padding: 10,
                width: "98%",
                backgroundColor: "#fff",
                border: "none",
                margin: 2,
              }}
              onClick={() => {
                setGender("آقا");
                setShowGender(false);
              }}
            >
              آقا
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={reservTicket}
        onRequestClose={() => {
          reserved ? setReservTicket(true) : setReservTicket(false);
        }}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <Header
          text="خرید بلیت"
          click={() => {
            reserved ? setReservTicket(true) : setReservTicket(false);
          }}
        />
        <div
          style={{
            paddingTop: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "95%",
              borderRadius: 5,
              border: "1px solid gray",
              backgroundColor: "#ededed",
              display: "flex",
              flexDirection: "column",
              direction: "rtl",
            }}
          >
            <div
              style={{
                padding: 10,
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "IRANSansMobile",
                fontSize: 11,
                borderBottom: "1px solid gray",
              }}
            >
              <p style={{ margin: 0 }}>
                <span style={{ color: "gray" }}>نام مسافر: </span>
                {fullName}
              </p>
              <p style={{ margin: 0 }}>
                <span style={{ color: "gray" }}>تاریخ صدور بلیت :</span>
                {props.dateMoment}
              </p>
            </div>

            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "IRANSansMobile",
                fontSize: 11,
                borderBottom: "1px solid gray",
              }}
            >
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    borderBottom: "0.5px solid gray",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 5,
                      width: "50%",
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={{ color: "gray" }}>شهر مبدا: </span>{" "}
                    <span> {serviceInfo.origin}</span>{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 5,
                      width: "50%",
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={{ color: "gray" }}>نام تعاونی: </span>{" "}
                    <span> {serviceInfo.company}</span>{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 5,
                      width: "50%",
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={{ color: "gray" }}>شهر مقصد: </span>{" "}
                    <span>{serviceInfo.destination}</span>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%", fontSize: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 5,
                      width: "40%",
                      boxSizing: "border-box",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ color: "gray" }}>تاریخ و ساعت حرکت</span>
                    <span>
                      {serviceInfo.movingTime}, {props.time}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 5,
                      width: "30%",
                      boxSizing: "border-box",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ color: "gray" }}>تعداد صندلی</span>
                    <span>{counter}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 5,
                      width: "30%",
                      boxSizing: "border-box",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ color: "gray" }}>شماره صندلی</span>
                    <span>{seatRequest.toString().replace(/,/g, "-")}</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "30%",
                  borderRight: "0.5px solid gray",
                  padding: 5,
                  boxSizing: "border-box",
                  backgroundColor: "#E8E8E8",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "gray" }}>شماره بلیت</p>
                <p style={{ color: "gray" }}>شماره پیگیری</p>
                <p style={{ color: "gray" }}>شماره سفارش</p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                padding: 5,
                boxSizing: "border-box",
                fontFamily: "IRANSansMobile",
                fontSize: 11,
                borderBottom: "0.5px solid gray",
              }}
            >
              <p style={{ margin: 0 }}>
                <span style={{ color: "gray" }}>مبلغ کل صورت حساب: </span>
                {ToRial(totalPrice.toString())} ریال
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: 10,
                boxSizing: "border-box",
                fontFamily: "IRANSansMobile",
                fontSize: 10,
              }}
            >
              <span style={{ fontSize: 13, margin: "0 0 3px" }}>
                قوانین استرداد
              </span>
              <span>1 . از زمان صدور تا یک ساعت قبل از حرکت : 10% جریمه</span>
              <span>
                2 . امکان استرداد بلیت از یک ساعت قبل از حرکت تا بعد از حرکت :
                جریمه 50 % حضوری
              </span>
              {serviceInfo.finalCity !== serviceInfo.destination ? (
                <>
                  <span style={{ fontSize: 13, margin: "3px 0" }}>
                    {" "}
                    نکته :{" "}
                  </span>
                  <span>
                    مقصد شما {serviceInfo.destination} بوده، ولی مقصد نهایی
                    اتوبوس {serviceInfo.finalCity} می باشد .
                  </span>
                </>
              ) : null}
              <span style={{ fontSize: 13, margin: "3px 0" }}>توجه: </span>
              <span>
                حداقل 30 دقیقه پیش از حرکت به غرفه شرکت مسافربری مستقر در پایانه
                مبدا مراجعه کنید و شماره بلیت خریداری شده از سامانه (شماره ارسال
                شده به تلفن همراه شما ) را به متصدی مربوطه ارائه کنید و بلیت
                کاغذی خود را دریافت کنید
              </span>
            </div>
          </div>

          {Rsv ? (
            reserved ? (
              <span
                style={{
                  margin: "15px 0",
                  fontFamily: "IRANSansMobile",
                  fontSize: 12,
                  marginBottom: 15,
                  color: "red",
                  direction: "rtl",
                  textAlign: "center",
                }}
              >
                بلیت درخواستی تا ده دقیقه دیگر برای شما رزرو شده است، لطفا نسبت
                به پرداخت آن اقدام نمایید.
              </span>
            ) : (
              <span
                style={{
                  margin: "15px 0",
                  fontFamily: "IRANSansMobile",
                  fontSize: 12,
                  marginBottom: 15,
                  color: "red",
                  direction: "rtl",
                  textAlign: "center",
                }}
              >
                رزرو انجام نشد ، مجددا تلاش کنید.
              </span>
            )
          ) : null}
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: Rsv ? "space-between" : "center",
              direction: "rtl",
            }}
          >
            <div
              style={{
                width: Rsv ? "50%" : "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {loadingPay ? (
                <CircularProgress
                  color="secondary"
                  style={{ marginTop: "13%" }}
                />
              ) : (
                <Submit
                  text={Rsv ? "پرداخت" : "رزرو و پرداخت"}
                  click={() => {
                    setLoadingPay(true);
                    !reserved ? reserve() : hendelpayment();
                  }}
                />
              )}
            </div>
            <div
              style={{
                width: Rsv ? "50%" : "0%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {Rsv ? (
                <Submit
                  text="خرید مجدد"
                  click={
                    reserved
                      ? () => {
                          cancleTicket();
                          props.empty();
                          setRecieptTicket(false);
                          setBuyTicket(false);
                          setBusInfo(false);
                          props.closeTeravel();
                        }
                      : () => reserve()
                  }
                />
              ) : null}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        style={customStyles}
        isOpen={recieptTicket}
        onRequestClose={() => {
          props.empty();
          setRecieptTicket(false);
          setBuyTicket(false);
          setBusInfo(false);
          props.closeTeravel();
        }}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div ref={recieptRef} style={{ height: "100%", width: "100%" }}>
            <Reciept
              origin={serviceInfo.origin}
              destination={serviceInfo.destination}
              finalCity={serviceInfo.finalCity}
              PassengerCount={counter}
              PassengerName={fullName}
              seats={seatRequest.toString()}
              infoTicket={ticket}
              ticket={serviceInfo}
              close={() => {
                props.empty();
                setRecieptTicket(false);
                setBuyTicket(false);
                setBusInfo(false);
                props.closeTeravel();
              }}
              showTicket={showTicket}
              pressed={() => setShowTicket(!showTicket)}
            />
          </div>

          <div
            style={{
              // position: "absolute",
              // top: "90vh",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",

              backgroundColor: "#610c34",
              padding: 10,
              boxSizing: "border-box",
            }}
          >
            <CloseBtn
              close={() => {
                props.empty();
                setRecieptTicket(false);
                setBuyTicket(false);
                setBusInfo(false);
                props.closeTeravel();
              }}
            />
            <ShareBtn
              share={() => shareReciept()}
              download={() => downlodReciept()}
            />
          </div>
        </div>
      </Modal>
      {checkWallet ? (
        <ChargeWallet
          token={props.token}
          amount={totalPrice}
          payment={PaymentTicket}
          backPayment={backPayment}
          backDrop={backDrop}
          openBackDrop={() => setBackDrop(true)}
          closeBackDrop={() => setBackDrop(false)}
          close={() => {
            setCheckWallet(false);
            setLoadingPay(false);
          }}
        />
      ) : null}
    </>
  );
};
export default BusInfo;
