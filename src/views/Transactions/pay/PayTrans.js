import React, { useState, useEffect } from "react";
import { Routes } from "../../../api/api";
import axios from "axios";
import BoxTrans from "../../../components/BoxTrans/BoxTrans";
import CircularProgress from "@material-ui/core/CircularProgress";

const PayTrans = (props) => {
  const [pays, setPays] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(pays);
  useEffect(() => {
    getPayTransactions();
    console.log("eeee");
  }, []);

  const getPayTransactions = () => {
    let token = localStorage.getItem("token");
    console.log("token", token);
    axios
      .get(`${Routes.getPayTrans}`, { headers: { token: token } })
      .then((res) => {
        let transactions = res.data.value.response;
        console.log(res);
        setPays(transactions);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 65,
      }}
    >
      {loading ? (
        <CircularProgress color="secondary" style={{ marginTop: "50%" }} />
      ) : pays ? (
        pays.map((pay, index) => {
          return <BoxTrans key={index} trans={pay} />;
        })
      ) : null}
    </div>
  );
};

export default PayTrans;
