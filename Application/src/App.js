import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import StartPage from "./components/FirstPage/FirstPage";
import WithClass from "./hoc/withClass";

class App extends Component {
  render() {
    return (
      <WithClass>
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Redirect to="/" /> {/* Redirect anything other than routes specified to "/" */}
        </Switch>
      </WithClass>
    );
  }
}

export default App;
