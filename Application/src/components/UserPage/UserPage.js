import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import classes from "./UserPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import Layout from "../shared/Layout/Layout";
import ProfilePicture from '../../assets/images/Toolbar/default_picture.png';

/**
 * First Default landing page
 *
 * Called by App.js in <Route>
 */
class ui extends Component {
  componentDidMount() {
    this.props.fetchUserInfo(`${this.props.location.pathname.match(/[^/]+$/)}`)
  }

  render() {
    let name = null;
    let page = null;
    if (this.props.store_complete) {
      name = localStorage.getItem("publicuserinfoname");
      page = (
        <WithClass>
          <Background />
          <Layout />
          <div className={classes.PageContainer}>
            <img src={ProfilePicture} alt="Default prof pic" className={classes.ProfilePicture} />
            <div className={classes.Name}>{name}</div>
          </div>
        </WithClass>
      )
    }
    return (
      <WithClass>
        {page}
      </WithClass>
    );
  }
}

const mapStateToProps = state => {
  return {
    store_complete: state.auth.store_complete,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: (username) => {
      dispatch(actions.fetchPublicUserInfo(username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ui);