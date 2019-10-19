import React from "react";

import Image from "../../../../assets/images/FirstPage/StartupSidePicture.png";

const sideimage = (props) => (
  <div>
    <img src={Image} className={props.className}/>
  </div>
);

export default sideimage;
