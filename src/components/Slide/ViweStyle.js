import React from "react";
import { SlideSection, H1 } from "./SilderStyle";

const Slide = ({ info }) => {
  console.log(info);
  return <SlideSection url={info}></SlideSection>;
};

export default Slide;
