import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import classes from "./Form.module.css";

import Input from "../../../components/UserPage/UI/Input/Input";
import { checkValidity, updateObject } from "../../../shared/utility";
import WithClass from "../../../hoc/withClass";
import Button from "../../../components/shared/UI/Buttons/Buttons";

class userform extends Component {
  state = {
    workBiography: {
      information: {
        elementType: "textarea",
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
    let username = localStorage.getItem("publicuserinfousername");
    event.preventDefault();
    this.props.submitBiographyForm(
      username,
      this.state.workBiography.information.value
    );
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // Updating form for each input letter from user
    const updatedFormElement = updateObject(
      this.state.workBiography[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.workBiography[inputIdentifier].validation
        ),
        touched: true
      }
    );

    // Updating userForm
    const updatedWorkBiography = updateObject(this.state.workBiography, {
      [inputIdentifier]: updatedFormElement
    });

    // Checking if all of form is valid
    let formIsValid = true;
    for (let inputIdentifier in updatedWorkBiography) {
      formIsValid = updatedWorkBiography[inputIdentifier].valid[0] && formIsValid;
    }

    this.checkResetHandler(event.target.value);

    // Setting new state
    this.setState({ workBiography: updatedWorkBiography, formIsValid: formIsValid });
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
    for (let key in this.state.workBiography) {
      formElementsArray.push({
        id: key,
        config: this.state.workBiography[key]
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
              className={classes.Input}
            />
          ))}
          <div className={classes.ButtonsContainer}>
            <Button
              title="Submit "
              className={classes.SubmitButton}
              disabled={!this.state.formIsValid}
            />
            <Button
              title="Cancel "
              className={classes.CancelButton}
              clicked={this.props.switchForm}
            />
          </div>
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
    postBiographyComplete: state.userProfilePost.postBiographyComplete
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitBiographyForm: (username, text) => {
      dispatch(actions.postBiography(username, text));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userform);
