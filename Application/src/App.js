import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import StartPage from "./components/FirstPage/FirstPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
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
          <Route path="/signup" exact component={SignUpPage} />
          <Redirect to="/" /> {/* Redirect anything other than routes specified to "/" */}
        </Switch>
      </WithClass>
    );
  }
}

export default App;
