import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import classes from './Form.module.css';

import Input from '../../../components/SignupPage/UI/Input/Input';
import { checkValidity, updateObject} from '../../../shared/utility';
import WithClass from '../../../hoc/withClass';
import Button from '../../../components/shared/UI/Buttons/Buttons';


class userform extends Component {
  state = {
    userForm: {
      fullname: {
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
      username: {
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

  checkResetHandler = (value) => {
    if (value === "") {
      this.setState({ 
        valid: false,
        touched: false
      });
    }
  }

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
        <div className={classes.Container}>
          <form className={classes.Form}>
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
          </form>
          <div className={classes.Agreement}>
            By clicking Create Account, you agree to our<NavLink to="Terms">Terms of Use</NavLink>, and <NavLink to="PrivacyPolicy">Privacy Policy</NavLink>.
          </div>
          <Button 
          title="Create Account >" 
          className={classes.Button}
          disabled={!this.state.formIsValid}/>
          <div className={classes.AlreadyHaveAccount}>
            Already have an account?
          </div>
          <NavLink className={classes.SignIn} to="signin">Sign in</NavLink>
        </div>
      </WithClass>
    );

    return (
      <div className={this.props.className}>
        {form}
      </div>
    );
  }
}

export default userform;
