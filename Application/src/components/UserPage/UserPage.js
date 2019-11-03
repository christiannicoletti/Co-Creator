import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import classes from "./UserPage.module.css";

import WithClass from "../../hoc/withClass";
import Background from "../shared/Background/Background";
import Layout from "../shared/Layout/Layout";
import Spinner from '../shared/UI/Spinner/Spinner';
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
    let publicName = null;
    let privateName = null;
    let page = null;
    let spinner = null;
    let verifiedUser = null;

    if (this.props.store_complete) {
      publicName = localStorage.getItem("publicuserinfoname");
      privateName = localStorage.getItem("name");
      if (publicName === privateName) {
        verifiedUser = 'Become a verified user';
      }
      page = (
        <WithClass>
          <div className={classes.ProfileContainer}>
            <div className={classes.CenterColumn}>
              <img src={ProfilePicture} alt="Default prof pic" className={classes.ProfilePicture} />
              <div className={classes.Name}>{publicName}</div>
              <div className={classes.VerifiedUser}>{verifiedUser}</div>
              <div className={classes.WorkBiography}>Add a work biography</div>
            </div>
          </div>
        </WithClass>
      )
    } else {
      spinner = <Spinner />
    }

    return (
      <WithClass>
        <Background />
        <Layout />
        {page}{spinner}
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