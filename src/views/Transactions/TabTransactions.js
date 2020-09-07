import React from "react";
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
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import NavigationBottom from '../../components/NavigationBottom/NavigationBottom'

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
    maxWidth: 500,
    backgroundColor: "#CD0448",
    color: "#fff",
  },
  tabLabel: {
    fontFamily: "IRANSansMobile",
    fontWeight: 100,
  },
  tabsRoot: {
    height: 80,
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
        >
          <Tab
            className={classes.tabsRoot}
            label={<span className={classes.tabLabel}>دریافت شده</span>}
          />
          <Tab
            className={classes.tabsRoot}
            label={<span className={classes.tabLabel}>پرداخت شده</span>}
          />
          <Tab
            className={classes.tabsRoot}
            label={<span className={classes.tabLabel}>همه تراکنش ها</span>}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0} className={classes.tab}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontFamily: "IRANSansMobile",
            alignItems :'center',
            color : '#610c34',
            borderBottom : '1px solid gray'
          }}
        >
          <AddRoundedIcon color='#610c34' />
          <p style={{direction:'rtl'}}>0 ریال</p>
          <p>موجودی</p>
        </div>
        <NavigationBottom  item='PEYMENT'/>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tab}>
      <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontFamily: "IRANSansMobile",
            alignItems :'center',
            color : '#610c34',
            borderBottom : '1px solid gray'
          }}
        >
          <AddRoundedIcon color='#610c34' />
          <p style={{direction:'rtl'}}>0 ریال</p>
          <p>موجودی</p>
        </div>
        <NavigationBottom item='PEYMENT' />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tab}>
      <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontFamily: "IRANSansMobile",
            alignItems :'center',
            color : '#610c34',
            borderBottom : '1px solid gray'
          }}
        >
          <AddRoundedIcon color='#610c34' />
          <p style={{direction:'rtl'}}>0 ریال</p>
          <p>موجودی</p>
        </div>
        <NavigationBottom item='PEYMENT'/>
      </TabPanel>
    </div>
  );
}
