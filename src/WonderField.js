import React, { Component } from 'react'
import PropTypes from 'prop-types';
import validations from './validations';

export default class WonderField extends Component {

  render() {

    const inputTypes = {
      fullname: 'text',
      date: 'text',
      custom: 'text'
    }

    const hasError = this.props.error && this.props.error.type;

    const value = this.props.type === 'submit' ? this.props.buttonText : this.props.value;
    const type = inputTypes[this.props.type] ? inputTypes[this.props.type] : this.props.type;

    return (
      <div className={this.props.className}>
        <label> {this.props.label} </label>
        <input
          type={type}
          placeholder={this.props.placeholder}
          value={value}
          onChange={this.props.onChange}
          className={hasError ? 'error' : ''}
        />
        {hasError && <span>{this.props.errorMessage}</span>}
      </div>
    );
  }
}

WonderField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'date', 'fullname', 'submit', 'custom']).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  buttonText: (props, propName, componentName) => {
    if (props['type'] !== 'submit') {
      return new Error(
        `Prop '${propName}' in component '${componentName}' is not valid unless prop 'type' is 'submit'. Validation failed.`
      );
    }
  },
  minDate: (props, propName, componentName) => {
    const error = validations['date'].test(props[propName]);
    if (error) {
      return new Error(
        `Prop '${propName}' is not a valid date in component '${componentName} '. Validation failed.`
      );
    }
  },
  maxDate: (props, propName, componentName) => {
    const error = validations['date'].test(props[propName]);
    if (error) {
      return new Error(
        `Prop '${propName}' is not a valid date in component '${componentName} '. Validation failed.`
      );
    }
  },
  minLength: PropTypes.number,
  maxLength: (props, propName, componentName) => {
    if (typeof props[propName] != 'number') {
      return new Error(
        `Prop '${propName}' in component '${componentName}' is not a valid number. Validation failed.`
      );
    } else if (props[propName] < props['minLength']) {
      return new Error(
        `Prop '${propName}' greater than prop 'minLength' in component '${componentName} '. Validation failed.`
      );
    }
  },
}