import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import StartPage from "./components/StartPage/StartPage";
import WithClass from "./hoc/withClass";

class App extends Component {
  render() {
    return (
      <div>
        <WithClass>
          <Switch>
            <Route path="/" exact component={StartPage} />
            <Redirect to="/" />
          </Switch>
        </WithClass>
      </div>
    );
  }
}

export default App;
