import React, { Component } from 'react';

import classes from './Form.module.css';

import Logo from '../../shared/Logo/Logo';
import Input from '../UI/Input/Input';
import { checkValidity, updateObject} from '../../../shared/utility';

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
          minLength: 5
        },
        valid: false,
        touched: false
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
      formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ userForm: updatedUserForm, formIsValid: formIsValid });
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
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
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
      </div>
    );
  }
}

export default userform;
