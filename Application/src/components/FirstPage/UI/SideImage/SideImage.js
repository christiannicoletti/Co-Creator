import React from "react";

import Image from "../../../../assets/images/FirstPage/StartupSidePicture.ico";

// Side Image for the First Page
const sideimage = (props) => (
  <div>
    <img src={Image} alt='FirstPage sideimage' className={props.className}/> {/* No local css module needed */}
  </div>
);

export default sideimage;
