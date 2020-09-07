import React from "react";
import styles from "./styles";
import Submit from "../../../components/SubmitButton/SubmitButton";
const BuyTicket = () => {
  const classes = styles();
  return (
    <React.Fragment>
      <div className={classes.container}>
        <p>لطفا برای خرید بلیت، اطلاعات زیر را وارد نمایید.</p>
        <input className={classes.input} placeholder="مبدا" />
        <input className={classes.input} placeholder="مقصد" />
        <input className={classes.input} placeholder="تاریخ حرکت" />
        <input className={classes.input} placeholder="زمان حرکت" />
        <Submit text="جستجو" disable={true} />
      </div>
    </React.Fragment>
  );
};

export default BuyTicket;
