import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asynchComponent from './hoc/asynchComponent/asyncComponent';

import StartPage from "./components/FirstPage/FirstPage";
import SignupPage from "./components/SignupPage/SignupPage";
import HowToStartPage from "./components/HowToStartPage/HowToStartPage";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import StartupsPage from "./components/StartupsPage/StartupsPage";
import AboutPage from "./components/AboutPage/AboutPage";
import ContactPage from "./components/ContactPage/ContactPage";
import HelpPage from "./components/HelpPage/HelpPage";
import UserPage from "./components/UserPage/UserPage";
import WithClass from "./hoc/withClass";
import Logout from './containers/shared/Logout/Logout';
import * as actions from "./store/actions/index";

const asyncSigninPage = asynchComponent(() => {
  return import('./components/SigninPage/SigninPage')
});

/**
 * Contains switch routing to components
 * 
 * Called by index.js in ReactDOM.render()
 */
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <WithClass>
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/signin" exact component={asyncSigninPage} />
          <Route path="/howtostart" exact component={HowToStartPage} />
          <Route path="/explore" exact component={ExplorePage} />
          <Route path="/projects" exact component={ProjectsPage} />
          <Route path="/startups" exact component={StartupsPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/contact" exact component={ContactPage} />
          <Route path="/help" exact component={HelpPage} />
          <Route path="/user/" component={UserPage} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" /> {/* Redirect anything other than routes specified to "/" */}
        </Switch>
      </WithClass>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => {
      dispatch(actions.authCheckState());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
