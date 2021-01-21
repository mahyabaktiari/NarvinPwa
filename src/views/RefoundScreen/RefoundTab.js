import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import Refound from "./RefoundScreen";
import ReportSettelment from "./ReportSettelment";
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

export default function IconLabelTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            label={<span className={classes.tabLabel}>دریافت وجه</span>}
          />
          <Tab
            className={classes.tabsRoot}
            label={<span className={classes.tabLabel}>گزارشات</span>}
          />
          <ChevronLeftRoundedIcon
            style={{
              position: "absolute",
              left: "0%",
              width: "15%",
              height: 35,
              top: "20%",
            }}
            onClick={() => props.history.push("./profile")}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0} className={classes.tab}>
        <Refound />
        <NavigationBottom item="PROFILE" />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tab}>
        <ReportSettelment />
        <NavigationBottom item="PROFILE" />
      </TabPanel>
    </div>
  );
}
