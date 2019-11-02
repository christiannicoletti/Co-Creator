import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import classes from "./Form.module.css";

import Logo from "../../../components/shared/Logo/Logo";
import Input from "../../../components/SigninPage/UI/Input/Input";
import { checkValidity, updateObject } from "../../../shared/utility";
import Button from "../../../components/shared/UI/Buttons/Buttons";

class userform extends Component {
  state = {
    userForm: {
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        clicked: false
      }
    },
    formIsValid: false,
    loading: false
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.userForm.email.value,
      this.state.userForm.password.value,
      this.state.isSignup
    );
  };

  inputChangedHandler = (event, inputIdentifier) => {
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

    const updatedUserForm = updateObject(this.state.userForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedUserForm) {
      formIsValid = updatedUserForm[inputIdentifier].valid[0] && formIsValid;
    }

    this.checkResetHandler(event.target.value);

    this.setState({ userForm: updatedUserForm, formIsValid: formIsValid });
  };

  signinClickedValidationHandler = form => {
    if (!form) {
      this.setState({ clicked: true });
    }
  };

  checkResetHandler = value => {
    if (value === "") {
      this.setState({
        valid: false,
        touched: false,
        clicked: false
      });
    }
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.userForm) {
      formElementsArray.push({
        id: key,
        config: this.state.userForm[key]
      });
    }

    let form = (
      <div className={classes.Input}>
        <form onSubmit={this.submitHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid[0]}
              invalidMessage={formElement.config.valid[1]}
              invalidForm={!this.state.formIsValid && this.state.clicked}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
          <Button
            title="Sign in >"
            className={classes.Button}
            clicked={() =>
              this.signinClickedValidationHandler(this.state.formIsValid)
            }
          />
        </form>
      </div>
    );

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={this.props.className}>
        <Logo className={classes.Logo} />
        {authRedirect}
        {form}
        <div className={classes.TextContainer}>
          <NavLink className={classes.ForgotPassword} to="forgotpassword">
            Forgot Password?
          </NavLink>
          <NavLink className={classes.CreateAnAccount} to="signup">
            Create an account
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => {
      dispatch(actions.authSignin(email, password));
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
