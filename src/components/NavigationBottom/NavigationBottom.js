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
        <Link to="/"></Link>;
        break;
      case "SERVISES":
        <Link to="/services"></Link>;
        break;
      case "PEYMENT":
        <Link to="/peyments" />;
        break;
      case "PROFILE":
        <Link to="/profile" />;
        break;
      default:
        null;
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
          <Link to="/profile" style={{textDecoration:'none'}}>
            <div
              className={classes.navigationBottom}
              style={{ color: props.item  === "PROFILE" ? "#CD0448" : null }}
              onClick={() => setSelect("PROFILE")}
            >
              <PersonOutlineOutlinedIcon />
              <p className={classes.navigationTxt}>پروفایل</p>
            </div>
          </Link>
          <Link to="/peyments" style={{textDecoration:'none'}}>
            <div
              className={classes.navigationBottom}
              style={{ color: props.item  === "PEYMENT" ? "#CD0448" : null }}
              onClick={() => setSelect("PEYMENT")}
            >
              <PaymentIcon />
              <p className={classes.navigationTxt}>تراکنش ها</p>
            </div>
          </Link>
          <Link to="/services" style={{textDecoration:'none'}}>

          <div
            className={classes.navigationBottom}
            style={{ color: props.item === "SERVISES" ? "#CD0448" : null }}
            onClick={() => setSelect("SERVISES")}
          >
            <AssignmentOutlinedIcon />
            <p className={classes.navigationTxt}>خدمات</p>
          </div>
          </Link>
          <Link to="/" style={{textDecoration:'none'}}>
            <div
              className={classes.navigationBottom}
              style={{ color: props.item === "QRBuy" ? "#CD0448" : null }}
              onClick={() => setSelect("QRBUY")}
              disable={props.item}
            >
              <CropFreeOutlinedIcon />
              <p className={classes.navigationTxt}>بارکد</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LabelBottomNavigation);
