import React, { useState, useEffect } from "react";
import { Routes } from "../../../api/api";
import axios from "axios";
import BoxTrans from "../../../components/BoxTrans/BoxTrans";
import CircularProgress from "@material-ui/core/CircularProgress";
const AllTrans = (props) => {
  const [allTrans, setAllTrans] = useState("");
  const [loading, setloading] = useState(true);

  console.log(allTrans);
  useEffect(() => {
    getAllTransactions();
  }, []);
  const getAllTransactions = async () => {
    let token = localStorage.getItem("token");
    console.log("token", token);
    axios
      .get(`${Routes.getAllTrans}`, { headers: { token: token } })
      .then((res) => {
        let transactions = res.data.value.response;
        console.log(res);
        setAllTrans(transactions);
        setloading(false);
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
      ) : allTrans ? (
        allTrans.map((trans) => {
          return <BoxTrans trans={trans} />;
        })
      ) : null}
    </div>
  );
};

export default AllTrans;
