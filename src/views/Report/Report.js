import React, { useState, useEffect } from "react";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import Header from "../../components/Header/Header";
import axios from "axios";
import { Routes } from "../../api/api";
const Report = (props) => {
  const [numberReagent, setNumberReagent] = useState("");
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    GetReagent(tokenStorage);
  }, []);
  const GetReagent = (token) => {
    axios
      .get(`${Routes.GetReagent}`, { headers: { token: token } })
      .then((response) => {
        let Reagent = response.data.value.response
          ? response.data.value.response
          : 0;

        setNumberReagent(Reagent);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, []);
  var backButtonPrevented = false;
  function popStateListener(event) {
    if (backButtonPrevented === false) {
      window.history.pushState(null, "gfgfg", window.location.href);
      console.log("Back Button Prevented");
      backButtonPrevented = true;
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  window.addEventListener("popstate", popStateListener);
  return (
    <>
      <Header text="گزارشات" click={() => props.history.push("/profile")} />
      <div
        style={{
          paddingTop: 70,
          display: "flex",
          justifyContent: "center",
          minHeight: "90vh",
          backgroundColor: "#eee",
        }}
      >
        <div
          style={{
            width: "85%",
            marginTop: 10,
            borderRadius: 5,
            display: "flex",
            alignItems: " center",
            border: "1px solid gray",
            padding: 15,
            boxSizing: "border-box",
            justifyContent: "center",
            height: "8vh",
            backgroundColor: "#fff",
            fontFamily: "IRANSansMobile",
            fontSize: "0.9rem",
          }}
        >
          <span>تعداد مشتریان معرفی شده توسط شما : {numberReagent} کاربر</span>
        </div>
      </div>
      <NavigationBottom item="PROFILE" />
    </>
  );
};

export default Report;
