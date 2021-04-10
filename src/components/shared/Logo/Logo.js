import React from "react";

import Image from "../../../assets/images/FirstPage/Co-Creator.png";
import classes from "./Logo.module.css";

const logo = (props) => (
    <img src={Image} alt='co-creator logo' className={`${classes.Asset} ${props.className}`}/>
);

export default logo;
