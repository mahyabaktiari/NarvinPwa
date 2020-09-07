import React from "react";
import styles from "./styles";
import { requirePropFactory } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CropFreeRoundedIcon from "@material-ui/icons/CropFreeRounded";

const Store = () => {
  const classes = styles();
  return (
    <React.Fragment>
      <div className={classes.store}>
        <img
          src={require("../../assets/icons/circLogo.png")}
          style={{
            width: 70,
            height: 70,
          }}
        />
        <div className={classes.info}>
          <p className={classes.txt}>نام: تست ناروین</p>
          <p className={classes.txt}>کد پذیرنده: 123311</p>
          <p className={classes.txt}>آدرس: تهران - میرزای شیرازی</p>
          <p className={classes.txt}>تلفن: 023455943</p>
          <p className={classes.txt}>شماره شبا : 112345653422242</p>
          <p className={classes.txt}>وضعیت : تعیین نشده</p>
        </div>
      </div>
      <div className={classes.iconBox}>
        <DeleteIcon />
        <CropFreeRoundedIcon />
        <EditIcon />
      </div>
    </React.Fragment>
  );
};

export default Store;
