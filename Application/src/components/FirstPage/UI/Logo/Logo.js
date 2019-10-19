import React from "react";

import Image from "../../../../assets/images/FirstPage/Co-Creator.png";
import classes from "./Logo.module.css";

const logo = () => (
  <div className={classes.Asset}>
    <img src={Image} />
  </div>
);

export default logo;
