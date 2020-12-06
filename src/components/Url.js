import React, { useEffect, useState } from "react";
import NewWindow from "react-new-window";

const Url = (props) => {
  return <NewWindow url={props.url} />;
};

export default Url;
