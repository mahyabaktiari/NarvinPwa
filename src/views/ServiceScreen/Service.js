import React from "react";
import Header from "../../components/Header/Header";
import ServiceBox from "../../components/ServiseBox/ServiseBox";
import { Route, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";

const Servise = (props) => {
  console.log(props);
  return (
    <div>
      <Header text="خدمات" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
          paddingTop: 70,
        }}
      >
        <ServiceBox
          pressed={() => props.history.push("./bills")}
          source={require("../../assets/icons/bill-mobile.png")}
          title="پرداخت قبض"
        />
        <ServiceBox
          pressed={() => props.history.push("./buyCharge")}
          title="خرید شارژ"
          source={require("../../assets/icons/sim.png")}
        />

        <ServiceBox
          source={require("../../assets/icons/Net.png")}
          title="بسته اینترنت"
          pressed={() => props.history.push("./buyNet")}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <ServiceBox
          title="محصولات"
          source={require("../../assets/icons/Shop.png")}
          pressed={() => props.history.push("./buyDevice")}
        />

        <ServiceBox
          title="پذیرندگان ناروین"
          source={require("../../assets/icons/Merchant.png")}
          pressed={() => props.history.push("./merchants")}
        />
        <ServiceBox
          title="بلیت اتوبوس"
          source={require("../../assets/icons/Bus2.png")}
          pressed={() => props.history.push("./ticket")}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <ServiceBox
          pressed={() => console.log()}
          title="بیمه "
          source={require("../../assets/icons/Insurance2.png")}
          soon={"بزودی"}
        />
        <ServiceBox
          style={{ marginLeft: "5 !important" }}
          title="بلیت قطار"
          source={require("../../assets/icons/Train2.png")}
          soon={"بزودی"}
        />
        <ServiceBox
          pressed={() => console.log()}
          title="بلیت هواپیما"
          source={require("../../assets/icons/AirPlane2.png")}
          soon={"بزودی"}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <ServiceBox
          title="رزرو هتل"
          source={require("../../assets/icons/hotel.png")}
          soon={"بزودی"}
        />
        <ServiceBox
          title="عوارض آزادراه"
          source={require("../../assets/icons/PayToll.png")}
          soon={"بزودی"}
        />
        <ServiceBox
          title="عوارض آزادراه"
          source={require("../../assets/icons/PayToll.png")}
          soon={"بزودی"}
        />
      </div>

      <NavigationBottom item="SERVISES" />
    </div>
  );
};

export default withRouter(Servise);
