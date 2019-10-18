import React from 'react';

import Image from '../../assets/images/StartupPage/StartupSidePicture.png';
import classes from './SideImage.module.css';

const sideimage = () => (
    <div className={classes.Content}>
        <img src={Image} />
    </div>
);
 
export default sideimage;