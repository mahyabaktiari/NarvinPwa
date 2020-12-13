import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import AllTrans from "./all/allTrans";
import RecieveTrans from "./recieve/Recieve";
import PayTrans from "./pay/PayTrans";
import axios from "axios";
import { Routes } from "../../api/api";
import { moneySplitter } from "../../util/validators";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#CD0448",
    color: "#fff",
  },
  tabLabel: {
    fontFamily: "IRANSansMobile",
    fontWeight: 100,
    fontSize: "0.7rem",
  },
  tabsRoot: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    "& .MuiBox-root": {
      padding: "0px",
    },
  },
});

export default function IconLabelTabs(props) {
  const [token, setToken] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log("token");
    axios
      .get(`${Routes.walletBalance}`, {
        headers: { token: token },
      })
      .then((res) => {
        console.log("wallet", res.data.value.response);
        setWalletBalance(moneySplitter(res.data.value.response));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  console.log(walletBalance, token);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      console.log("Back Button Prevented");
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  window.addEventListener("popstate", popStateListener, false);

  return (
    <div>
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          textColor="#fff"
          aria-label="icon label tabs example"
          TabIndicatorProps={{ style: { background: "black" } }}
          style={{ direction: "rtl" }}
        >
          <Tab
            className={classes.tabsRoot}
            label={<span className={classes.tabLabel}>همه تراکنش ها</span>}
          />

          <Tab
            className={classes.tabsRoot}
            label={<span className={classes.tabLabel}>پرداخت شده</span>}
          />
          <Tab
            className={classes.tabsRoot}
            label={<span className={classes.tabLabel}>دریافت شده</span>}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={2} className={classes.tab}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontFamily: "IRANSansMobile",
            alignItems: "center",
            color: "#610c34",
            borderBottom: "1px solid gray",
          }}
        >
          <AddRoundedIcon onClick={() => props.history.push("/wallet")} />
          <p style={{ direction: "rtl" }}>{walletBalance} ریال</p>
          <p>موجودی</p>
        </div>
        <RecieveTrans />
        <NavigationBottom item="PEYMENT" />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tab}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontFamily: "IRANSansMobile",
            alignItems: "center",
            color: "#610c34",
            borderBottom: "1px solid gray",
          }}
        >
          <AddRoundedIcon onClick={() => props.history.push("/wallet")} />
          <p style={{ direction: "rtl" }}>{walletBalance} ریال</p>
          <p>موجودی</p>
        </div>
        <PayTrans />

        <NavigationBottom item="PEYMENT" />
      </TabPanel>
      <TabPanel value={value} index={0} className={classes.tab}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontFamily: "IRANSansMobile",
            alignItems: "center",
            color: "#610c34",
            borderBottom: "1px solid gray",
          }}
        >
          <AddRoundedIcon onClick={() => props.history.push("/wallet")} />
          <p style={{ direction: "rtl" }}>{walletBalance} ریال</p>
          <p>موجودی</p>
        </div>
        <AllTrans />
        <NavigationBottom item="PEYMENT" />
      </TabPanel>
    </div>
  );
}
