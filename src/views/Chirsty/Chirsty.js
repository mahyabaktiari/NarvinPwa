import React, { useEffect, useState } from "react";
import Company from "../../components/CompanysChirsty/CompanysChirsty";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";

const Chirsty = (props) => {
  const items = [
    { img: "../../assets/icons/kheyrie.png", title: "بنیاد خیریه محک" },
    { img: "../../assets/icons/kheyrie.png", title: "بنیاد خیریه انصار" },
    { img: "../../assets/icons/kheyrie.png", title: "امام رضا" },
    { img: "../../assets/icons/kheyrie.png", title: "مستضعفان" },
    { img: "../../assets/icons/kheyrie.png", title: "امام رضا" },
    { img: "../../assets/icons/kheyrie.png", title: "مستضعفان" },
    { img: "../../assets/icons/kheyrie.png", title: "امام رضا" },
    { img: "../../assets/icons/kheyrie.png", title: "مستضعفان" },
  ];
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
        {items.map((item) => {
          return <Company info={item} />;
        })}
      </div>
      <NavigationBottom item="SERVISES" />
    </>
  );
};

export default Chirsty;
