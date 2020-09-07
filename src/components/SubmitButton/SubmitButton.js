import React from "react";
import styles from "./styles";

const SubmitBtn = (props) => {
  const classes = styles();
  return (
    <React.Fragment>
      <div
        className={props.disable ? classes.disable : classes.btn}
        onClick={props.click}
      >
        <p style={{ fontWeight: 100, margin: 0, fontSize: 16 }}>{props.text}</p>
      </div>
    </React.Fragment>
  );
};

export default SubmitBtn;
