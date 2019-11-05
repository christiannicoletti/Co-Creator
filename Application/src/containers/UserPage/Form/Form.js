import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import classes from "./Form.module.css";

import Input from "../../../components/SignupPage/UI/Input/Input";
import { checkValidity, updateObject } from "../../../shared/utility";
import WithClass from "../../../hoc/withClass";
import Button from "../../../components/shared/UI/Buttons/Buttons";

class userform extends Component {
  state = {
    workBiography: {
      information: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your work biography..."
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.userForm.information.value
    );
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // Updating form for each input letter from user
    const updatedFormElement = updateObject(
      this.state.userForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.userForm[inputIdentifier].validation
        ),
        touched: true
      }
    );

    // Updating userForm
    const updatedUserForm = updateObject(this.state.userForm, {
      [inputIdentifier]: updatedFormElement
    });

    // Checking if all of form is valid
    let formIsValid = true;
    for (let inputIdentifier in updatedUserForm) {
      formIsValid = updatedUserForm[inputIdentifier].valid[0] && formIsValid;
    }

    this.checkResetHandler(event.target.value);

    // Setting new state
    this.setState({ userForm: updatedUserForm, formIsValid: formIsValid });
  };

  checkResetHandler = value => {
    if (value === "") {
      this.setState({
        valid: false,
        touched: false
      });
    }
  };

  render() {
    // Making sure every element mapped has a key
    const formElementsArray = [];
    for (let key in this.state.userForm) {
      formElementsArray.push({
        id: key,
        config: this.state.userForm[key]
      });
    }

    let form = (
      <WithClass>
        <form onSubmit={this.submitHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid[0]}
              invalidMessage={formElement.config.valid[1]}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
          <Button
            title="Create Account "
            className={classes.Button}
            disabled={!this.state.formIsValid}
          />
        </form>
      </WithClass>
    );

    return (
      <WithClass>
        {form}
      </WithClass>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    complete: state.auth.complete,
    error: state.auth.error,
  };
};

export default connect(
  mapStateToProps
)(userform);
