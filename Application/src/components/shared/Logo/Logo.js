import React from "react";

import Image from "../../../assets/images/FirstPage/Co-Creator.ico";
import classes from "./Logo.module.css";

const logo = (props) => (
    <img src={Image} className={`${classes.Asset} ${props.className}`}/>
);

export default logo;
