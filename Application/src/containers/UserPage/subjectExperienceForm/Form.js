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
    subjectExperience: {
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
    if (this.state.subjectExperience.information.value !== 'Choose subjects...') {
      this.props.submitSubjectExperienceForm(
        username,
        this.state.subjectExperience.information.value
      );
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // Updating form for each input letter from user
    const updatedFormElement = updateObject(
      this.state.subjectExperience[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.subjectExperience[inputIdentifier].validation
        ),
        touched: true
      }
    );

    // Updating userForm
    const updatedSubjectExperience = updateObject(this.state.subjectExperience, {
      [inputIdentifier]: updatedFormElement
    });

    // Checking if all of form is valid
    let formIsValid = true;
    for (let inputIdentifier in updatedSubjectExperience) {
      formIsValid = updatedSubjectExperience[inputIdentifier].valid[0] && formIsValid;
    }

    this.checkResetHandler(event.target.value);

    // Setting new state
    this.setState({ subjectExperience: updatedSubjectExperience, formIsValid: formIsValid });
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
    for (let key in this.state.subjectExperience) {
      formElementsArray.push({
        id: key,
        config: this.state.subjectExperience[key]
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
    postSubjectExperienceComplete: state.userProfilePost.postSubjectExperienceComplete
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitSubjectExperienceForm: (username, text) => {
      dispatch(actions.postSubjectExperience(username, text));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userform);
