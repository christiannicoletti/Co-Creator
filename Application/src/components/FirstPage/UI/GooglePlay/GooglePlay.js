import React from "react";

import Image from "../../../../assets/images/FirstPage/googleplay.ico";
import classes from "./GooglePlay.module.css";

/**
 * "Get it on Google Play" Logo
 * 
 * Takes local css module and overwrites it with what is passed into googleplay
 */
const googleplay = (props) => (
  <img src={Image} className={`${props.className} ${classes.Asset}`}/>
);

export default googleplay;
