import React, { Component } from 'react';

import classes from './Layout.module.css';
import WithClass from '../../hoc/withClass';
import SideImage from '../SideImage/SideImage';
import Background from '../Background/Background';

class Layout extends Component {
    state = {}
    render() { 
        return (
            <WithClass>
                <div>
                    <div className={classes.Background}>
                        <Background />
                    </div>
                    <div className={classes.SideImage}>
                        <SideImage />
                    </div>
                    <div className={classes.Text}>
                        <div>Start-up Toolbar</div>
                        <div>Start-up ui</div>
                        <div>Start-up Footbar</div>
                    </div>
                    <main>{this.props.children}</main>
                </div>
            </WithClass>
        );
    }
}
 
export default Layout;