import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import classes from './Form.module.css';

import Logo from '../../shared/Logo/Logo';
import Input from '../UI/Input/Input';
import { checkValidity, updateObject} from '../../../shared/utility';
import Button from "../../shared/UI/Buttons/Buttons";

class userform extends Component {
  state = {
    userForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email or Phone Number"
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

  signinClickedValidationHandler = (form) => {
    if (!form) {
      this.setState({ clicked: true });
    }
  }

  checkResetHandler = (value) => {
    if (value === "") {
      this.setState({ 
        valid: false,
        touched: false,
        clicked: false 
      });
    }
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.userForm) {
      formElementsArray.push({
        id: key,
        config: this.state.userForm[key]
      });
    }

    let form = (
      <form>
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
      </form>
    );

    return (
      <div className={this.props.className}>
        <Logo className={classes.Logo} />
        <div className={classes.Input}>
          {form}
        </div>
        <div className={classes.ButtonContainer}>
            <Button 
            title="Sign in >" 
            className={classes.Button}
            clicked={() => this.signinClickedValidationHandler(this.state.formIsValid)} />
          </div>
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

export default userform;