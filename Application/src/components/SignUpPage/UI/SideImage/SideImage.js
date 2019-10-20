import React from "react";

import Image from "../../../../assets/images/SignupPage/SignupSidePicture.png";

// Side Image for the First Page
const sideimage = (props) => (
  <div>
    <img src={Image} className={props.className}/> {/* No local css module needed */}
  </div>
);

export default sideimage;