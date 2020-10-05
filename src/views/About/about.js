import React, { useEffect, useState } from "react";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import Header from "../../components/Header/Header";

const About = (props) => {
  return (
    <>
      <Header text="درباره ما" click={() => props.history.push("/profile")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 70,
        }}
      >
        <img
          src={require("../../assets/icons/4.png")}
          style={{ width: "20%", marginTop: 20 }}
        />
        <img
          src={require("../../assets/icons/RastaLogo.png")}
          style={{ width: "50%", marginTop: 50 }}
        />
        <img
          src={require("../../assets/icons/BP_Logo.png")}
          style={{ width: "55%", marginTop: 30 }}
        />
        <span
          style={{
            marginTop: 20,
            fontFamily: "IRANSansMobile",
            fontSize: "1rem",
          }}
        >
          نسخه 1.17
        </span>
      </div>
      <NavigationBottom item="PROFILE" />
    </>
  );
};

export default About;
