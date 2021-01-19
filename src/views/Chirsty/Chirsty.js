import React, { useEffect, useState } from "react";
import Company from "../../components/CompanysChirsty/CompanysChirsty";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import axios from "axios";
import { Routes } from "../../api/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import styles from "./styles";
const Chirsty = (props) => {
  const [charities, setChariteis] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const classes = styles();
  useEffect(() => {
    let tokenstorage = localStorage.getItem("token");

    getChirsty();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const getChirsty = (tokenstorage) => {
    axios
      .get(`${Routes.GetCharity}`, {
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjA5MzY0ODQ2MDczY2Q2MjI3NjBmNzliN2Q5IiwibmJmIjoxNTkzNDM5NDk2LCJleHAiOjE1OTM0NDA2OTYsImlhdCI6MTU5MzQzOTQ5Nn0.ZVQ4THX8vmFn8MNeqM0Jgih5-PdtzQwNYieiFMzhwiY",
        },
      })
      .then((res) => {
        setChariteis(res.data.value.response);
      })
      .catch(() => {
        setTextSnack("خطا در اتصال به سرور");
        setSnackBar(true);
      });
  };

  return (
    <>
      <Header text="خیریه" click={() => props.history.push("/services")} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingTop: 30,
          direction: "rtl",
        }}
      >
        {charities.length > 0 ? (
          charities.map((item) => {
            return <Company info={item} />;
          })
        ) : (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <CircularProgress color="secondary" style={{ marginTop: "15%" }} />
          </div>
        )}
      </div>
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
      <NavigationBottom item="SERVISES" />
    </>
  );
};

export default Chirsty;
