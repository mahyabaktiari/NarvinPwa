import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CropFreeOutlinedIcon from "@material-ui/icons/CropFreeOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PaymentIcon from "@material-ui/icons/Payment";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../../views/ProfileScreen/Profile";
import Servise from "../../views/ServiceScreen/Service";
import AllTransAction from "../../views/Transactions/TabTransactions";
import { Link, withRouter } from "react-router-dom";
import useStyles from "./styles";
function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [select, setSelect] = useState();
  const selected = () => {
    switch (select) {
      case "QRBUY":
        return <Link to="/QR"></Link>;
      case "SERVISES":
        return <Link to="/services"></Link>;
      case "PEYMENT":
        return <Link to="/peyments" />;
      case "PROFILE":
        return <Link to="/profile" />;
      default:
        return <Link to="/QR"></Link>;
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
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <span
              className={classes.navigationBottom}
              style={{ color: props.item === "PROFILE" ? "#CD0448" : null }}
              onClick={() => setSelect("PROFILE")}
            >
              <PersonOutlineOutlinedIcon />
              <span className={classes.navigationTxt}>پروفایل</span>
            </span>
          </Link>
          <Link to="/peyments" style={{ textDecoration: "none" }}>
            <span
              className={classes.navigationBottom}
              style={{ color: props.item === "PEYMENT" ? "#CD0448" : null }}
              onClick={() => setSelect("PEYMENT")}
            >
              <PaymentIcon />
              <span className={classes.navigationTxt}>تراکنش ها</span>
            </span>
          </Link>
          <Link to="/services" style={{ textDecoration: "none" }}>
            <span
              className={classes.navigationBottom}
              style={{ color: props.item === "SERVISES" ? "#CD0448" : null }}
              onClick={() => setSelect("SERVISES")}
            >
              <AssignmentOutlinedIcon />
              <span className={classes.navigationTxt}>خدمات</span>
            </span>
          </Link>
          <Link to="/QR" style={{ textDecoration: "none" }}>
            <span
              className={classes.navigationBottom}
              style={{ color: props.item === "QRBuy" ? "#CD0448" : null }}
              onClick={() => setSelect("QRBUY")}
              disable={props.item}
            >
              <CropFreeOutlinedIcon />
              <span className={classes.navigationTxt}>بارکد</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LabelBottomNavigation);
