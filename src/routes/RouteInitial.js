import React from "react";
import Register from "../views/Register/Register";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import ConfirmCode from "../views/ConfirmCode/ConfirmCode";
import QRBuy from "../views/QRBuy/QRBuy";
import BuyInternet from "../views/BuyInternet/BuyInternet";
import BuyCharge from "../views/BuyPhonecharge/BuyPhoneCharge";
import Profile from "../views/ProfileScreen/Profile";
import Services from "../views/ServiceScreen/Service";
import Peyment from "../views/Transactions/TabTransactions";
import Bills from "../views/Bills/TabBills";
import BuyDevice from "../views/BuyDevice/BuyDevice";
import Merchant from "../views/AllMerchants/AllMerchants";
import BuyTicket from "../views/BuyTicket/TicketTab";
import EditProfile from "../views/EditProfile/EditProfile";
import MyStore from "../views/MyStore/MyStore";
import Wallet from "../views/Wallet/Wallet";
import Refound from "../views/RefoundScreen/RefoundScreen";
import SplashLanding from "../views/SplashLanding/SplashLanding";
import About from "../views/About/about";
import Report from "../views/Report/Report";
const RouteInitial = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SplashLanding} />
        <Route path="/register" component={Register} />
        <Route path="/confirm" component={ConfirmCode} />
        <Route path="/buyNet" component={BuyInternet} />
        <Route path="/buyCharge" component={BuyCharge} />
        <Route path="/bills" component={Bills} />
        <Route path="/buyDevice" component={BuyDevice} />
        <Route path="/merchants" component={Merchant} />
        <Route path="/ticket" component={BuyTicket} />
        <Route path="/myStore" component={MyStore} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/refound" component={Refound} />
        <Route path="/about" component={About} />
        <Route path="/report" component={Report} />
        <Route path="/editPro" component={EditProfile} />
        <Route path="/profile" component={Profile} />
        <Route path="/services" component={Services} />
        <Route path="/peyments" component={Peyment} />
        <Route path="/QR" component={QRBuy} />
      </Switch>
    </Router>
  );
};

export default RouteInitial;
