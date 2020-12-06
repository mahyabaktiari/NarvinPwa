import React, { useState, useEffect } from "react";
import style from "./styles";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import axios from "axios";
import { Routes } from "../../../api/api";
import Ticket from "../../../components/Ticket/Ticket";

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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
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
  );
};

export default BuyTicket;
