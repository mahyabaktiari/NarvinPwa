import React, { useState, useEffect } from "react";
import { Routes } from "../../../api/api";
import axios from "axios";
import BoxTrans from "../../../components/BoxTrans/BoxTrans";
import CircularProgress from "@material-ui/core/CircularProgress";

const Recieve = () => {
  const [recTrans, setResTrans] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllTransactions();
  }, []);
  const getAllTransactions = async () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${Routes.getRecieveTrans}`, { headers: { token: token } })
      .then((res) => {
        let transactions = res.data.value.response;
        setResTrans(transactions);
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
        justifyContent: "center",
        paddingBottom: 65,
      }}
    >
      {loading ? (
        <CircularProgress color="secondary" style={{ marginTop: "50%" }} />
      ) : recTrans ? (
        recTrans.map((trans) => {
          return <BoxTrans trans={trans} />;
        })
      ) : null}
    </div>
  );
};

export default Recieve;
