import React from "react";

import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;
  let invalidMessage = [];
  const invalidMessages = ["Invalid password length"];
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  if (props.isMessage) {
    inputClasses.push(classes.InputElement2);
  }

  if (props.invalidForm) {
    if (props.invalidMessage) {
      for (let indexMessage in props.invalidMessage) {
        if (props.invalidMessage[indexMessage] === false) {
          invalidMessage.push(
            <div key={indexMessage}>{invalidMessages[indexMessage]}</div>
          );
        }
      }
    }
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      {inputElement}
      <div className={classes.InvalidMessage}>{invalidMessage}</div>
    </div>
  );
};

export default input;
