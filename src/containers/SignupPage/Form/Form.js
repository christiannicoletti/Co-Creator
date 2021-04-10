import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

import classes from "./Form.module.css";

import Input from "../../../components/SignupPage/UI/Input/Input";
import { checkValidity, updateObject } from "../../../shared/utility";
import WithClass from "../../../hoc/withClass";
import Button from "../../../components/shared/UI/Buttons/Buttons";

class userform extends Component {
  state = {
    userForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Full Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email or Phone Number"
        },
        value: "",
        validation: {
          required: true,
          isPhoneAndEmail: true
        },
        valid: false,
        touched: false
      },
      displayName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Username"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 16,
          oneSymbolRequire: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== '/' && this.props.complete === true) {
      this.props.onSetAuthRedirectPath();
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.userForm.name.value,
      this.state.userForm.email.value,
      this.state.userForm.displayName.value,
      this.state.userForm.password.value,
      this.state.isSignup
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
              changed={event =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          ))}
        <div className={classes.Agreement}>
          By clicking Create Account, you agree to our
          <NavLink to="Terms">Terms of Use</NavLink>, and{" "}
          <NavLink to="PrivacyPolicy">Privacy Policy</NavLink>.
        </div>
        <Button
          title="Create Account "
          className={classes.Button}
          disabled={!this.state.formIsValid}
        />
        </form>
        <div className={classes.AlreadyHaveAccount}>
          Already have an account?
        </div>
        <NavLink className={classes.SignIn} to="signin">
          Sign in
        </NavLink>
      </WithClass>
    );

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
    <WithClass>
      {authRedirect}
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
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (name, email, displayName, password) => {
      dispatch(actions.authSignup(name, email, displayName, password));
    },
    onSetAuthRedirectPath: () => {
      dispatch(actions.setAuthRedirectPath("/"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userform);
