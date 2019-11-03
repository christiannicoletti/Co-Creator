import React, { Component } from 'react';
import { connect } from "react-redux";

import classes from "./Buttons.module.css";
import Spinner from '../Spinner/Spinner';

/**
 * Default cyan blue button
 *
 * Dynamic title, pass any string to title to label the button
 */
class Button extends Component {
  render() { 
    let spinner = null;
    let arrow = null
    if (this.props.loading) {
      spinner = <Spinner />
    } else {
      arrow = '>'
    }

    return (
      <button
        className={`${classes.Default} ${this.props.className}`}
        onClick={this.props.clicked}
        disabled={this.props.disabled}
        >
        {this.props.title}{arrow}{spinner}
      </button>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps)(Button);