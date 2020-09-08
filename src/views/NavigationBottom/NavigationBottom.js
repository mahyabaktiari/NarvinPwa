import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CropFreeOutlinedIcon from "@material-ui/icons/CropFreeOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PaymentIcon from "@material-ui/icons/Payment";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../ProfileScreen/Profile";
import Servise from "../ServiceScreen/Service";
import AllTransAction from "../Transactions/TabTransactions";
import { Route, withRouter } from "react-router-dom";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";

import useStyles from "./styles";

const LabelBottomNavigation = (props) => {
  const classes = useStyles();
  const [select, setSelect] = useState("QRBUY");
  console.log(props.match.params);
  const selected = () => {
    switch (select) {
      case "QRBUY":
        return <div>QRBUY</div>;
      case "SERVISES":
        return <Servise />;
      case "PEYMENT":
        return <AllTransAction />;
      case "PROFILE":
        return <Profile />;
        break;
      default:
        <div>QRBUY</div>;
    }
  };
  return (
    <div>
      {selected()}
      <div className={classes.navigation}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div
            className={classes.navigationBottom}
            style={{ color: select === "PROFILE" ? "#CD0448" : null }}
            onClick={() => setSelect("PROFILE")}
          >
            <PersonOutlineOutlinedIcon />
            <p className={classes.navigationTxt}>پروفایل</p>
          </div>
          <div
            className={classes.navigationBottom}
            style={{ color: select === "PEYMENT" ? "#CD0448" : null }}
            onClick={() => setSelect("PEYMENT")}
          >
            <PaymentIcon />
            <p className={classes.navigationTxt}>تراکنش ها</p>
          </div>
          <div
            className={classes.navigationBottom}
            style={{ color: select === "SERVISES" ? "#CD0448" : null }}
            onClick={() => setSelect("SERVISES")}
          >
            <AssignmentOutlinedIcon />
            <p className={classes.navigationTxt}>خدمات</p>
          </div>
          <div
            className={classes.navigationBottom}
            style={{ color: select === "QRBUY" ? "#CD0448" : null }}
            onClick={() => setSelect("QRBUY")}
          >
            <CropFreeOutlinedIcon />
            <p className={classes.navigationTxt}>بارکد</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LabelBottomNavigation);
