import React from "react";
import styles from "./styles";

const SubmitBtn = (props) => {
  const classes = styles();
  return (
    <React.Fragment>
      <button
        className={props.disable ? classes.disable : classes.btn}
        onClick={props.click}
        disabled={props.disable}
        variant="contained"
      >
        <p style={{ fontWeight: 100, margin: 0, fontSize: 16 }}>{props.text}</p>
      </button>
    </React.Fragment>
  );
};

export default SubmitBtn;
