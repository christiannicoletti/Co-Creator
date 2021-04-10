import React from 'react';

import Image from "../../../../assets/images/SignupPage/SignupSidePicture.ico";

// Side Image for the First Page
const sideimage = (props) => (
  <div>
    <img src={Image} alt='SignupPage sideimage' className={props.className}/> {/* No local css module needed */}
  </div>
);

export default sideimage;