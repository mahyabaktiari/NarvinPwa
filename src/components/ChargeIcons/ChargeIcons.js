import React, { useState } from "react";
import Style from "./styles";
const ChargeIcon = (props) => {
  const classes = Style();
  return (
    <>
      <div className={classes.item}>
        <div className={classes.btn}>
          <img
            src={require("../../assets/icons/Favorites.png")}
            className={classes.img}
            onClick={() => props.OpenFavs()}
          />
        </div>
        <div className={classes.btn}>
          <img
            src={require("../../assets/icons/SimCard.png")}
            className={classes.img}
            onClick={() => props.getSim()}
          />
        </div>
        <div className={classes.btn}>
          <img
            src={require("../../assets/icons/Contacts.png")}
            className={classes.img}
            onClick={() => props.openContacts()}
          />
        </div>
      </div>
    </>
  );
};

export default ChargeIcon;
