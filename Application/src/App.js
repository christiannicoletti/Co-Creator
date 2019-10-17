import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Layout} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
