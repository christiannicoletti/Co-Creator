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
    projectPositions: {
      information: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "accounting", displayValue: "Accounting" },
            { value: "mathematics", displayValue: "Mathematics" },
            { value: "acting", displayValue: "Acting" },
            { value: "africana studies", displayValue: "Africana Studies" },
            { value: "american studies", displayValue: "American Studies" },
            { value: "anthropology", displayValue: "Anthropology" },
            { value: "art", displayValue: "Art" },
            { value: "art history", displayValue: "Art History" },
            { value: "art therapy", displayValue: "Art Therapy" },
            { value: "biochemistry", displayValue: "Biochemistry" },
            { value: "bioinformatics", displayValue: "Bioinformatics" },
            { value: "biology", displayValue: "Biology" },
            { value: "business administration", displayValue: "Business Administration" },
            { value: "business analytics", displayValue: "Business Analytics" },
            { value: "chemistry", displayValue: "Chemistry" },
            { value: "clinical lab science", displayValue: "Clinical Lab Science" },
            { value: "communication arts", displayValue: "Communication Arts" },
            { value: "computer science", displayValue: "Computer Science" },
            { value: "contemplative studies", displayValue: "Contemplative Studies" },
            { value: "contemporary arts", displayValue: "Contemporary Arts" },
            { value: "crime and justice studies", displayValue: "Crime and Justice Studies" },
            { value: "data science", displayValue: "Data Science" },
            { value: "design / technical Theater", displayValue: "Design / Technical Theater" },
            { value: "digital filmmaking", displayValue: "Digital Filmmaking" },
            { value: "directing / stage management", displayValue: "Directing / Stage Management" },
          ]
        },
        value: "Choose subjects...",
        validation: {},
        valid: false
      }
    },
    formIsValid: false,
    loading: false
  };

  submitHandler = event => {
    let username = localStorage.getItem("publicuserinfousername");
    event.preventDefault();
    if (this.state.projectPositions.information.value !== 'Choose subjects...') {
      this.props.submitProjectPositionsForm(
        username,
        this.state.projectPositions.information.value
      );
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // Updating form for each input letter from user
    const updatedFormElement = updateObject(
      this.state.projectPositions[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.projectPositions[inputIdentifier].validation
        ),
        touched: true
      }
    );

    // Updating userForm
    const updatedProjectPositions = updateObject(this.state.projectPositions, {
      [inputIdentifier]: updatedFormElement
    });

    // Checking if all of form is valid
    let formIsValid = true;
    for (let inputIdentifier in updatedProjectPositions) {
      formIsValid = updatedProjectPositions[inputIdentifier].valid[0] && formIsValid;
    }

    this.checkResetHandler(event.target.value);

    // Setting new state
    this.setState({ projectPositions: updatedProjectPositions, formIsValid: formIsValid });
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
    for (let key in this.state.projectPositions) {
      formElementsArray.push({
        id: key,
        config: this.state.projectPositions[key]
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
              title="Add subject "
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
    postProjectPositionsComplete: state.userProfilePost.ProjectPositionsComplete
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitProjectPositionsForm: (username, text) => {
      dispatch(actions.postProjectPositions(username, text));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userform);
