import React from "react";
import style from "./styles";

const BuyTicket = () => {
  const classes = style();
  return (
    <React.Fragment>
      <div className={classes.container}> هیچ بلیتی وجود ندارد.</div>
    </React.Fragment>
  );
};

export default BuyTicket;
