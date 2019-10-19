import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import StartPage from "./components/FirstPage/FirstPage";
import WithClass from "./hoc/withClass";

class App extends Component {
  render() {
    return (
      <div>
        <WithClass>
          <Switch>
            <Route path="/" exact component={StartPage} />
            <Redirect to="/" /> {/* Redirect anything other than routes specified to "/" */}
          </Switch>
        </WithClass>
      </div>
    );
  }
}

export default App;
