import React, { useEffect } from "react";
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
import BuyTicket from "./BuyTicket/BuyTicket";
import MyTicket from "./MyTicket/MyTicket";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

export default function IconLabelTabs() {
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
      window.history.pushState(null, "gfgfg", window.location.href);
      console.log("Back Button Prevented");
      backButtonPrevented = true;
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  window.addEventListener("popstate", popStateListener);

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
            label={<span className={classes.tabLabel}>خرید بلیت</span>}
          />
          <Tab
            className={classes.tabsRoot}
            label={<span className={classes.tabLabel}>بلیت های من</span>}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0} className={classes.tab}>
        <BuyTicket />
        <NavigationBottom item="SERVISES" />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tab}>
        <MyTicket />
        <NavigationBottom item="SERVISES" />
      </TabPanel>
    </div>
  );
}
