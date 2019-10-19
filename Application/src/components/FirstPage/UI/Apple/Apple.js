import React from "react";

import Image from "../../../../assets/images/FirstPage/apple.png";
import classes from "./Apple.module.css";

const logo = () => (
  <div className={classes.Asset}>
    <img src={Image} />
  </div>
);

export default logo;
