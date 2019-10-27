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
      },
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Title"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      message: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Your message..."
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

    this.setState({ userForm: updatedUserForm, formIsValid: formIsValid });
  };

  signinClickedValidationHandler = (form) => {
    if (!form) {
      this.setState({ clicked: true });
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
            isMessage={formElement.config.elementConfig.placeholder === 'Your message...'}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
      </form>
    );

    return (
      <div className={this.props.className}>
        <div className={classes.ContactUs}>Contact Us</div>
        <div className={classes.Input}>
          {form}
        </div>
        <div className={classes.ButtonContainer}>
            <Button 
            title="Submit Email >" 
            className={classes.Button} 
            clicked={() => this.signinClickedValidationHandler(this.state.formIsValid)} />

          </div>
      </div>
    );
  }
}

export default userform;