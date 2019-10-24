import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import StartPage from "./components/FirstPage/FirstPage";
import SignupPage from "./components/SignupPage/SignupPage";
import SigninPage from "./components/SigninPage/SigninPage";
import HowToStartPage from "./components/HowToStartPage/HowToStartPage";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import StartupsPage from "./components/StartupsPage/StartupsPage";
import WithClass from "./hoc/withClass";

/**
 * Contains switch routing to components
 * 
 * Called by index.js in ReactDOM.render()
 */
class App extends Component {
  render() {
    return (
      <WithClass>
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/signin" exact component={SigninPage} />
          <Route path="/howtostart" exact component={HowToStartPage} />
          <Route path="/projects" exact component={ProjectsPage} />
          <Route path="/startups" exact component={StartupsPage} />
          <Redirect to="/" /> {/* Redirect anything other than routes specified to "/" */}
        </Switch>
      </WithClass>
    );
  }
}

export default App;
