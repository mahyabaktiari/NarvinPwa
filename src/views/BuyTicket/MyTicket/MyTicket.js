import React, { useState, useEffect, useRef } from "react";
import style from "./styles";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import axios from "axios";
import { Routes } from "../../../api/api";
import Ticket from "../../../components/Ticket/Ticket";
import {
  ToRial,
  moneySplitter,
  getWalletBalanceAsync,
} from "../../../util/validators";
import PopUpModal from "../../../components/PopUpModal/PopUpModal";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ReplayRoundedIcon from "@material-ui/icons/ReplayRounded";
import Snackbar from "@material-ui/core/Snackbar";

const BuyTicket = () => {
  const classes = style();
  const [token, setToken] = useState();

  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  console.log("tickets", tickets);

  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    getTickets(tokenStorage);
  }, []);

  const getTickets = (token) => {
    axios
      .get(`${Routes.Ticket}`, {
        headers: { token: token },
      })
      .then((res) => {
        setTickets(res.data.value.response);
        // setTickets([
        //   {
        //     id: 1,
        //     passengerName: "محیا بختیاری",
        //     creationJalaliDateTime: "12/12/2012",
        //     seats: "2,3,4",
        //     srcCityName: "تهران",
        //     desCityName: "اهواز",
        //     verifyId: "1232",
        //     companyName: "همسفر",
        //     finalDesCityName: "اهواز",
        //     fullPrice: "25000000",
        //     departTime: "10:10",
        //     departDate: "12/5",
        //     passengerCount: "3",
        //     ticketNumber: "12",
        //     saleNumber: "2345",
        //   },
        // ]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Ticket = ({ ticket, token }) => {
    console.log("ticket", ticket);
    const [backClick, setBackClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [textSnack, setTextSnack] = useState("enter your text !");
    const [success, setSuccess] = useState(false);

    let seats = ticket.seats.includes(",")
      ? ticket.seats.split(",")
      : ticket.seats;
    const recieptRef = useRef();

    const saleRefund = () => {
      console.log(token);
      axios
        .post(
          `${Routes.SaleRefund}`,
          {
            VerifyId: ticket.verifyId,
            Id: ticket.id,
          },
          {
            headers: { token: token },
          }
        )
        .then((res) => {
          console.log(res);
          setBackClick(false);
          setTextSnack("برگشت از بلیط با موفقیت انجام شد.");
          setSuccess(true);
          setSnackBar(true);
        })
        .catch((err) => {
          console.log(err);
          setBackClick(false);
          setTextSnack("برگشت ناموفق !");
          setSuccess(false);
          setSnackBar(true);
        });
    };

    seats =
      typeof seats === "object"
        ? seats.map((seat) => {
            return seat.split("/")[0];
          })
        : seats.split("/")[0];

    console.log(seats, seats.length, typeof seats);

    // useEffect(() => {
    //   console.log(loading);
    //   loading ? shareReciept() : null;
    // }, [loading]);
    //
    const shareReciept = async () => {
      await recieptRef.current.capture().then(async (uri) => {
        console.log("do something with ", uri);

        // Share.open({
        //   url: uri,
        // });
      });
      setLoading(false);
    };
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackBar(false);
    };
    return (
      <>
        <div style={styles.ticket}>
          <div>
            <div style={{ backgroundColor: "#ededed", borderRadius: 10 }}>
              <div style={styles.headTicket}>
                <div style={styles.dateBuy}>
                  <span style={styles.textTitr}>نام مسافر :</span>
                  <span style={styles.textTicket}>{ticket.passengerName}</span>
                </div>
                <div style={styles.dateBuy}>
                  <span style={styles.textTitr}> تاریخ صدور بلیت : </span>
                  <span
                    style={{
                      fontFamily: "BYekan",
                      fontSize: 11,
                    }}
                  >
                    {" "}
                    {ticket.creationJalaliDateTime}
                  </span>
                </div>
              </div>
              <div style={styles.bodyTicket}>
                <div style={styles.container}>
                  <div style={styles.infoTicket}>
                    <div style={{ justifyContent: "space-between" }}>
                      <div>
                        <span style={styles.textTitr}>شهر مبدا : </span>
                        <span style={styles.textTicket}>
                          {" "}
                          {ticket.srcCityName}
                        </span>
                      </div>
                      <div style={{ marginTop: 15 }}>
                        <span style={styles.textTitr}> شهر مقصد :</span>
                        <span style={styles.textTicket}>
                          {" "}
                          {ticket.desCityName}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        paddingRight: 10,
                        width: "50%",
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={styles.textTitr}>نام تعاونی:</span>
                      <span style={styles.textTicket}>
                        {ticket.companyName}
                      </span>
                    </div>
                  </div>
                  <div style={styles.timeTicket}>
                    <div
                      style={{
                        width: "40%",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span style={styles.textTitr}>
                        تاریخ و ساعت حرکت اتوبوس
                      </span>
                      <span style={styles.textTicket}>
                        {" "}
                        {ticket.departTime} , {ticket.departDate}
                      </span>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span style={styles.textTitr}>تعداد صندلی</span>
                      <span style={styles.textTicket}>
                        {ticket.passengerCount}
                      </span>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span style={styles.textTitr}>شماره صندلی</span>
                      <span style={styles.textTicket}>{seats.toString()}</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#E8E8E8",
                    width: "25%",
                    padding: 5,
                    marginTop: 0.5,
                    borderLeftWidth: 0.5,
                    borderLeftColor: "gray",
                    borderBottomRightRadius: 10,
                  }}
                >
                  <div>
                    <p style={styles.textTitr}>شماره بلیت</p>
                    <p
                      style={{
                        fontSize: 11,
                        fontFamily: "BYekan",
                        textAlign: "right",
                        margin: 0,
                      }}
                    >
                      {ticket.ticketNumber}
                    </p>
                  </div>
                  <div>
                    <p style={styles.textTitr}>شماره سفارش</p>
                    <p
                      style={{
                        fontSize: 11,
                        fontFamily: "BYekan",
                        textAlign: "right",
                        margin: 0,
                      }}
                    >
                      {ticket.saleNumber}
                    </p>
                  </div>
                  <div>
                    <p style={styles.textTitr}>شماره پیگیری</p>
                    <p
                      style={{
                        fontSize: 11,
                        fontFamily: "BYekan",
                        textAlign: "right",
                        margin: 0,
                      }}
                    >
                      {ticket.id}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  flexDirection: "row",
                  borderTop: "0.5px solid gray",
                  padding: 5,
                  alignItems: "center",
                }}
              >
                <span style={styles.textTitr}>مبلغ کل صورت حساب : </span>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: "BYekan",
                    textAlign: "right",
                    margin: 0,
                  }}
                >
                  {" "}
                  {ToRial(ticket.fullPrice.toString())}{" "}
                </span>
                <span style={styles.textTicket}>ریال</span>
              </div>
              <div style={styles.backbox}>
                <div>
                  <span
                    style={{ fontFamily: "IRANSansMobile_Light", fontSize: 12 }}
                  >
                    {" "}
                    قوانین استرداد{" "}
                  </span>
                  <span style={styles.textback}>
                    {" "}
                    1 . از زمان صدور تا یک ساعت قبل از حرکت : 10% جریمه
                  </span>
                  <span style={styles.textback}>
                    {" "}
                    2 . امکان استرداد بلیت از یک ساعت قبل از حرکت تا بعد از حرکت
                    : جریمه 50 % حضوری{" "}
                  </span>
                  {ticket.finalDesCityName !== ticket.desCityName ? (
                    <div>
                      <span style={styles.textTicket}> نکته : </span>
                      <span style={styles.textback}>
                        مقصد شما {ticket.desCityName} بوده، ولی مقصد نهایی
                        اتوبوس {ticket.finalDesCityName} می باشد .
                      </span>
                    </div>
                  ) : null}
                  <div style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <span style={styles.textTicket}>توجه :</span>
                    <span style={styles.textback}>
                      حداقل 30 دقیقه پیش از حرکت به غرفه شرکت مسافربری مستقر در
                      پایانه مبدا مراجعه کنید و شماره بلیت خریداری شده از سامانه
                      (شماره ارسال شده به تلفن همراه شما ) را به متصدی مربوطه
                      ارائه کنید و بلیت کاغذی خود را دریافت کنید
                    </span>
                  </div>
                </div>
                {/* <View style={styles.priceBox}>
                  <Text style={styles.textTicket}>قیمت : </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={([styles.textTicket], {fontFamily: 'BYekan'})}>
                      {ToRial(ticket.price.toString())}
                    </Text>
                    <Text> ریال </Text>
                  </View>
                </View> */}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <button
              onClick={() => {
                setLoading(true);
              }}
              disabled={loading}
              style={{
                display: "flex",
                color: "#FFF",
                backgroundColor: "#05D90C",
                padding: 5,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                width: 120,
                opacity: loading ? 0.3 : 1,
                border: "none",
              }}
            >
              <span style={styles.buttonStyle}>اشتراک گذاری</span>
              <ShareOutlinedIcon />
            </button>
            <button
              // onPress={saleRefund}
              onClick={() => {
                setBackClick(true);
              }}
              style={{
                backgroundColor: "red",
                padding: 5,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                width: 120,
                display: "flex",
                border: "none",
                display: "flex",
                color: "#FFF",
              }}
            >
              <span style={styles.buttonStyle}>برگشت بلیت</span>
              <ReplayRoundedIcon />
            </button>
          </div>

          <PopUpModal
            show={backClick}
            closeModal={() => setBackClick(false)}
            text={`قوانین استرداد :
               1. تا یک ساعت بعد از خرید و (مشروط به اینکه دو ساعت قبل از حرکت باشد) بدون خسارت
              2. تا یک ساعت مانده به حرکت با کسر 10%"
             3. تا یک ساعت مانده به حرکت با کسر 50%
              آیا از برگشت بلیت خود اطمینان دارید ؟`}
            titleOne="بله"
            titleTwo="خیر"
            methodOne={saleRefund}
            methodTwo={() => setBackClick(false)}
            iconType="QUESTION"
          />
          <Snackbar
            open={snackBar}
            autoHideDuration={5000}
            message={textSnack}
            onClose={handleClose}
            className={success ? classes.rootSuccsess : classes.root}
          />
          {/* <PaymentPopUp 
           show={backClick}
           //Loading={loading}
           method={saleRefund}
           onRequestClose={() => setBackClick(false)}
           content={"قوانین استرداد : " + "\n" + "\n" +
                    " 1. تا یک ساعت بعد از خرید و (مشروط به اینکه دو ساعت قبل از حرکت باشد) بدون خسارت" + "\n" +
                    " 2. تا یک ساعت مانده به حرکت با کسر 10%"+ "\n" +
                    " 3. تا یک ساعت مانده به حرکت با کسر 50%" + "\n" + "\n" + "آیا از برگشت بلیت خود اطمینان دارید ؟"} 

           btnTitle1="بله"
           btnTitle2="خیر"
           Icontype={'QUESTION'}
           cancel={() => setBackClick(false)}
           /> */}
        </div>
      </>
    );
  };
  return (
    <>
      <div style={{ height: "91vh", overflowY: "scroll" }}>
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => {
            console.log("ERROR", ticket);
            return <Ticket ticket={ticket} token={token} key={index} />;
          })
        ) : (
          <div className={classes.container}> هیچ بلیتی وجود ندارد.</div>
        )}
      </div>
    </>
  );
};

export default BuyTicket;

const styles = {
  headTicket: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "0.5px solid #121212",
    padding: 10,
  },
  dateBuy: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ticket: {
    direction: "rtl",
    margin: 10,
    border: "1px solid gray",
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 0,
    backgroundColor: "#f0f0f0",
    paddingBottom: 10,
  },
  textTicket: {
    fontSize: 10,
    fontFamily: "IRANSansMobile_Light",
  },
  textTitr: {
    fontSize: 11,
    color: "gray",
    fontFamily: "IRANSansMobile_Light",
    margin: 0,
  },
  textback: {
    fontSize: 11,
    padding: 4,
    fontFamily: "IRANSansMobile_Light",
  },
  container: {
    display: "flex",

    flexDirection: "column",
    width: "75%",
    justifyContent: "space-between",
  },
  infoTicket: {
    display: "flex",

    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 5,
  },
  bodyTicket: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  timeTicket: {
    display: "flex",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backbox: {
    display: "flex",
    borderTop: "0.5px solid gray",
    padding: 5,
    flexDirection: "row",
  },
  priceBox: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "IRANSansMobile_Light",
  },
};
