import React, { Component } from "react";
import { connect } from 'react-redux';

import WithClass from "../../../hoc/withClass";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SubToolbar from "../Navigation/SubToolbar/SubToolbar";

/**
 * Contains the background, top, and bottom nav
 * 
 * Called by FirstPage.js
 */
class Layout extends Component {
  render() {
    return (
      <WithClass>
        <Toolbar isAuth={this.props.isAuthenticated} />
        <SubToolbar />
      </WithClass>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Layout);
