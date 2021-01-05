import React, { useEffect, useState } from "react";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import axios from "axios";
import { Routes } from "../../../api/api";
import { moneySplitter, fillZeroMerchId } from "../../../util/validators";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

const RecieptTrans = ({ trans, close }) => {
  console.log("trans", trans);
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(detail);
  useEffect(() => {
    let token = localStorage.getItem("token");
    getTranDetail(token);
  }, []);
  const getTranDetail = (token) => {
    axios
      .get(`${Routes.getDetailTrans}/${trans.id}`, {
        headers: { token: token },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (trans.tranTypeId === 2) {
          return;
        } else {
          return setDetail(res.data.value.response[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "4%",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <img
        src={require("../../../assets/icons/circLogo.png")}
        style={{ width: "20%", borderRadius: "50%", zIndex: 100 }}
      />
      <div
        style={{
          backgroundColor: "#610c34",
          marginTop: "-8%",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "10%",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            marginTop: 10,
            fontSize: "1rem",
            fontFamily: "IRANSansMobile",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {!loading
            ? detail.merchantTypeId === 1
              ? `انتقال وجه`
              : `${trans.description}`
            : null}
        </span>
        <div
          style={
            !loading
              ? detail.isSucceed ||
                trans.tranTypeId == 1 ||
                trans.tranTypeId == 2 ||
                trans.tranTypeId == 8 ||
                trans.tranTypeId == 9 ||
                trans.tranTypeId == 10
                ? style.successText
                : style.errorText
              : style.loadingText
          }
        >
          {!loading ? (
            detail.isSucceed ||
            trans.tranTypeId == 1 ||
            trans.tranTypeId == 2 ||
            trans.tranTypeId == 8 ||
            trans.tranTypeId == 9 ||
            trans.tranTypeId == 10 ? (
              <CheckRoundedIcon style={{ color: "#fff", fontWeight: "bold" }} />
            ) : (
              <CloseRoundedIcon style={{ color: "#fff", fontWeight: "bold" }} />
            )
          ) : (
            <span
              style={{
                color: "#111",
                fontSize: "0.8rem",
                fontFamily: "IRANSansMobile",
                marginTop: 5,
              }}
            >
              در حال بررسی
            </span>
          )}
          <span
            style={{
              color: "#fff",
              fontSize: "0.8rem",
              fontFamily: "IRANSansMobile",
              marginTop: 5,
            }}
          >
            {!loading
              ? detail.isSucceed ||
                trans.tranTypeId == 1 ||
                trans.tranTypeId == 2 ||
                trans.tranTypeId == 8 ||
                trans.tranTypeId == 9 ||
                trans.tranTypeId == 10
                ? "تراکنش موفق"
                : "تراکنش ناموفق"
              : null}
          </span>
        </div>
        {!loading ? (
          detail.tranTypeId === 7 ? (
            <>
              <div style={style.row}>
                <span>
                  {detail.deposit > 0 ? "نام خریدار:" : "نام پذیرنده:"}
                </span>
                <span>
                  {detail.deposit > 0 ? detail.buyerName : detail.sellerName}
                </span>
              </div>
              <div style={style.row}>
                <span>
                  {detail.deposit > 0 ? "شماره همراه خریدار:" : "کد پذیرنده :"}
                </span>
                <span>
                  {detail.deposit > 0 ? detail.mobile : detail.merchantId}
                </span>
              </div>
              <div style={style.row}>
                <span>برند: </span>
                <span>{detail.productName}</span>
              </div>
              <div style={style.row}>
                <span> مدل: </span>
                <span>{detail.productModel}</span>
              </div>
              <div style={style.row}>
                <span> تعداد: </span>
                <span>{detail.count}</span>
              </div>
            </>
          ) : detail.tranTypeId === 5 ? (
            <>
              <div style={style.row}>
                <span> شماره موبایل: </span>
                <span>{detail.mobile}</span>
              </div>
              <div style={style.row}>
                <span> نوع: </span>
                <span>{detail.packageName}</span>
              </div>
              <div style={style.row}>
                <span> اپراتور: </span>
                <span>{detail.operator}</span>
              </div>
            </>
          ) : detail.tranTypeId == 4 ? (
            <>
              <div style={style.row}>
                <span> نوع قبض: </span>
                <span>{detail.companyName}</span>
              </div>
              <div style={style.row}>
                <span> شناسه قبض: </span>
                <span>{detail.billId}</span>
              </div>
              <div style={style.row}>
                <span> شناسه پرداخت: </span>
                <span>{detail.paymentId}</span>
              </div>
            </>
          ) : detail.tranTypeId === 6 ? (
            <>
              <div style={style.row}>
                <span>
                  {detail.deposit > 0
                    ? detail.merchantTypeId == 1
                      ? "نام انتقال دهنده:"
                      : detail.merchantTypeId == 2
                      ? "نام خریدار:"
                      : "نام مسافر:"
                    : detail.merchantTypeId == 1
                    ? "نام دریافت کننده:"
                    : detail.merchantTypeId == 2
                    ? "نام فروشگاه:"
                    : "نام راننده:"}
                </span>
                <span>
                  {detail.deposit > 0 ? detail.buyerName : detail.sellerName}
                </span>
              </div>
              <div style={style.row}>
                <span> کد پذیرنده: </span>
                <span>{detail.merchantId}</span>
              </div>
            </>
          ) : detail.tranTypeId == 11 ? (
            <>
              <div style={style.row}>
                <span>شماره بلیت: </span>
                <span>{detail.ticketNumber}</span>
              </div>
              <div style={style.row}>
                <span>مبدا: </span>
                <span>{detail.srcCityName}</span>
              </div>
              <div style={style.row}>
                <span>مقصد: </span>
                <span>{detail.desCityName}</span>
              </div>
              <div style={style.row}>
                <span>شماره صندلی ها: </span>
                <span></span>
              </div>
              <div style={style.row}>
                <span>زمان حرکت: </span>
                <span>
                  {" "}
                  {detail.departDate} , {detail.departTime}
                </span>
              </div>
            </>
          ) : null
        ) : (
          <CircularProgress color="secondary" style={{ marginTop: "30%" }} />
        )}
        {!loading ? (
          <>
            <div style={style.row}>
              <span>مبلغ: </span>
              <span>
                {moneySplitter(
                  trans.deposit !== 0 ? trans.deposit : trans.withdrawal
                )}{" "}
                ریال
              </span>
            </div>
            <div style={style.row}>
              <span>کد رهگیری: </span>
              <span>
                {" "}
                {detail.tranTypeId == 2 || detail.tranTypeId == null
                  ? fillZeroMerchId(trans.refId.toString())
                  : detail.refId}
              </span>
            </div>
            <div style={style.row}>
              <span>تاریخ تراکنش: </span>
              <span>{trans.creationJalaliDateTime}</span>
            </div>
            {detail.comments ? (
              <div style={style.row}>
                <span>شرح انتقال: </span>
                <span>{detail.comments}</span>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

const style = {
  row: {
    padding: "2%",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "85%",
    marginTop: 6,
    display: "flex",
    justifyContent: "space-between",
    boxSizing: "border-box",
    direction: "rtl",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    fontSize: "0.9rem",
  },
  successText: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "85%",
    marginTop: "2%",
    marginBottom: 10,
    boxSizing: "border-box",
  },
  errorText: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "85%",
    marginTop: "2%",
    marginBottom: 10,
    boxSizing: "border-box",
  },
  loadingText: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#FFD700",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "85%",
    marginTop: "2%",
    marginBottom: 10,
    boxSizing: "border-box",
    justifyContent: "center",
  },
};
export default RecieptTrans;
