import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import initilRoute from "../../routes/RouteInitial";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
  },
  soon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    opacity: 0.5,
  },
  heading: {
    fontFamily: "IRANSansMobile",
    fontSize: 14,
    color: "#565252",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -95,
    marginBottom: 5,
  },
  img: {
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#fff",
    border: "none",
  },
});
const ServiseBox = (props) => {
  const classes = styles();
  return (
    <div style={{ width: "30%" }}>
      <div
        onClick={props.pressed}
        disabled={props.soon}
        className={classes.button}
      >
        <div className={props.soon ? classes.soon : classes.container}>
          <img className={classes.img} src={props.source} />
          <p className={classes.heading}>{props.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiseBox;
