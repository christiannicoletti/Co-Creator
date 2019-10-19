import React from "react";

import Image from "../../../../assets/images/FirstPage/googleplay.png";
import classes from "./GooglePlay.module.css";

const googleplay = (props) => (
  <img src={Image} className={`${props.className} ${classes.Asset}`}/>
);

export default googleplay;
