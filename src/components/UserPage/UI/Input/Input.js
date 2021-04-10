import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let invalidMessage = [];
    const invalidMessages = [
        "Password must be more than 6 characters long",
        "Password must be less than 16 characters long",
        "Password must contain a symbol"
    ]
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    if (props.invalidMessage) {
        for (let indexMessage in props.invalidMessage) {
            if (props.invalidMessage[indexMessage] === false) {
                invalidMessage.push(<li key={indexMessage}>{invalidMessages[indexMessage]}</li>)
            }
        }
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed} />
            break;
        case ('select'):
            inputElement = <select 
                            className={inputClasses.join(' ')} 
                            value={props.value}
                            onChange={props.changed} >
                            {props.elementConfig.options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.displayValue}
                                </option>
                            ))}
                            </select>
            break;
        default:
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed} />
    }

    return (
        <div className={`${classes.Input} ${props.className}`}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <div className={classes.InvalidMessage}>
                {invalidMessage}
            </div>
        </div>
    );
};
 
export default input;