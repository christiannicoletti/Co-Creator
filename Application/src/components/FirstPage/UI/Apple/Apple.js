import React from "react";

import Image from "../../../../assets/images/FirstPage/apple.png";
import classes from "./Apple.module.css";

const apple = (props) => (
  <img src={Image} className={`${props.className} ${classes.Asset}`}/>
);

export default apple;
