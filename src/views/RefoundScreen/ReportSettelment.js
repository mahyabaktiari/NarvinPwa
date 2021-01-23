import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes } from "../../api/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import BoxTrans from "../../components/BoxTrans/BoxTrans";
import {
  ToRial,
  getWalletBalanceAsync,
  splitInfo,
  moneySplitter,
  addMerchant,
} from "../../util/validators";
const ReportSettelment = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getReport();
  }, []);

  const getReport = (token) => {
    axios
      .post(
        `${Routes.GetSettelment}`,
        {},
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjA5MTI3NzQxNTc1MDUwMTQzNjA1MTE1MTQwMjE1MTQ4NjA0MTA2NjczNzUzMiIsIm5iZiI6MTYxMTE3MDE1MiwiZXhwIjoxNjExMTcxMzUyLCJpYXQiOjE2MTExNzAxNTJ9.19OatsaekJuQlXjX_ASuKrvFTFwt0TbX9F2JPRTYOJg",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res);
        // setReports(res.data.value.response);
        setReports([
          {
            amount: 1000,
            isSuccessed: false,
            creationJalaliDateTime: "12/2/1399 11:45",
          },
          {
            amount: 10000,
            isSuccessed: true,
            creationJalaliDateTime: "12/2/1399 11:45",
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(reports);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 65,
        width: "100%",
      }}
    >
      {loading ? (
        <CircularProgress color="secondary" style={{ marginTop: "50%" }} />
      ) : reports ? (
        reports.map((report) => {
          return (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                direction: "rtl",
                padding: 10,
                boxSizing: "border-box",
                borderBottom: "1px solid gray",
                fontFamily: "IRANSansMobile",
                fontSize: "0.9rem",
              }}
            >
              <span
                style={{
                  color: report.isSuccessed ? "green" : "red",
                  fontFamily: "IRANSansMobile",
                  width: "25%",
                }}
              >
                {report.isSuccessed ? "تسویه موفق" : "تسویه ناموفق"}
              </span>
              <span style={{ width: "50%", textAlign: "center" }}>
                {report.creationJalaliDateTime}
              </span>
              <span
                style={{
                  width: "25%",
                  textAlign: "left",
                }}
              >
                {" "}
                {ToRial(report.amount.toString())}
              </span>
            </div>
          );
        })
      ) : (
        <span
          style={{
            fontFamily: "IRANSansMobile",
            fontSize: "1rem",
            color: "#CD0448",
            marginTop: 100,
          }}
        >
          تا به حال تسویه ای انجام نشده است{" "}
        </span>
      )}
    </div>
  );
};

export default ReportSettelment;
