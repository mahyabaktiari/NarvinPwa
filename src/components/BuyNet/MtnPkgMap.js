import React, { useState, useEffect } from "react";
import { useBuyNetState, useBuyNetDispatch } from "../../context/buyNetContext";
import PkgBox from "../../components/BuyNet/PkgBox";

const MtnPkg = (props) => {
  const dispatch = useBuyNetDispatch();
  const { data } = props;
  return (
    <div
      style={{
        padding: 7,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PkgBox
        operator={data.operatorId}
        pid={data.pid}
        pkgName={data.packageName}
        price={data.price}
        paidPrice={data.pricePaid}
        click={() => {
          // console.log(data.PID, data.Price, data.PricePaid);
          dispatch({ type: "GET_PKG_INFO", payload: data });
        }}
      />
    </div>
  );
};

export default MtnPkg;
