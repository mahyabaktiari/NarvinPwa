import React from "react";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import styles from "./styles";
import Submit from "../SubmitButton/SubmitButton";

const osOldModal = (props) => {
  console.log(props);
  const classes = styles();
  const download = () => {
    window.open(props.url);
  };
  return (
    <div className={classes.container}>
      {" "}
      <WarningRoundedIcon
        style={{
          color: "red",
          width: "18%",
          height: "18%",
          marginTop: 10,
          marginBottom: 20,
        }}
      />{" "}
      <p className={classes.text}>نسخه شما قدیمی است!</p>
      <p className={classes.text}>لطفا نسخه جدید را دریافت کنید.</p>
      <div className={classes.boxbtns}>
        <div className={classes.dwnlBtn} onClick={download}>
          <p style={{ margin: 0 }}>دانلود</p>
        </div>
        <div
          className={classes.dwnlBtn}
          style={{ backgroundColor: "gray" }}
          onClick={props.continue}
        >
          <p style={{ margin: 0 }}>ادامه</p>
        </div>
      </div>
    </div>
  );
};

export default osOldModal;
