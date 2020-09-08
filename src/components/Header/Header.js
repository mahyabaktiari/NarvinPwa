import React from "react";
import useStyle from "./styles";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";

const Header = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      {props.click ? (
        <ChevronLeftRoundedIcon
          style={{ position: "absolute", left: "0%", width: "15%", height: 35 }}
          onClick={props.click}
        />
      ) : null}

      <p>{props.text}</p>
    </div>
  );
};

export default Header;
