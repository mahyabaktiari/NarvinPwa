import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./style";
const Input = (props) => {
  const classes = styles();
  return (
    <>
      <TextField
        className={classes.root}
        id="custom-css-standard-input"
        label={props.label}
        variant="outlined"
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.change}
        onFocus={props.focus}
        onClick={props.click}
        onBlur={props.blur}
        disabled={props.disabled}
        inputProps={{
          maxLength: props.maxLength,
          readOnly: props.readOnly,
          inputMode: props.type ? props.type : "numeric",
        }}
        autoComplete="off"
        // type={props.type ? props.type : "text"}
      />
    </>
  );
};

export default Input;
