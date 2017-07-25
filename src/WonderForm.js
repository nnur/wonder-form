import React, { Component } from 'react'
import validations from './validations';
import PropTypes from 'prop-types';

export default class WonderForm extends Component {

  constructor(props) {
    super(props);

    const fields = {};
    React.Children.forEach(this.props.children, (child, i) => {
      fields[child.props.name] = { value: '', error: null }
    });
    this.state = { fields };
  }

  componentWillReceiveProps(nextProps) {
    const newFields = {};
    React.Children.forEach(nextProps.children, (child, i) => {
      if (!this.state.fields[child.props.name]) {
        newFields[child.props.name] = { value: '', error: null }
      }
    }); 

    this.setState({
      fields: Object.assign({}, this.state.fields, newFields)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const nextFields = this.validateFields();

    this.setState({ fields: nextFields }, () => {
      this.props.onSubmit(this.state.fields);

      const errorFields = Object.keys(this.state.fields).reduce((errorFields, key)  => {
        const field = this.state.fields[key];
        field.error && errorFields.push(field);
        return errorFields;
      }, []);

      if (errorFields.length) {
        this.props.onError(errorFields)
      } else {
        this.props.onSuccess(this.state.fields);
      }

    });
  }

  handleFieldChange(event, name) {
    let nextFields = Object.assign({}, this.state.fields);
    nextFields[name].value = event.target.value;
    this.setState({ fields: nextFields });
  }

  validateFields() {
    const nextFields = {};
    React.Children.map(this.props.children, (child) => {
      const { type, name, test } = child.props;

      if (type !== 'submit') {
        const value = this.state.fields[name].value;
        const testMethod = test ? test : validations[type].test;
        const error = testMethod(value, child.props);

        nextFields[name] = Object.assign({}, this.state.fields[name], { error });
        return error;
      }
    });
    return nextFields;
  }

  render () {
    return (
      <form
        noValidate 
        className={this.props.className}
        onSubmit={this.handleSubmit.bind(this)}
        ref={form => { this.form = form; }}
      >
        {
          React.Children.map(this.props.children, (child, i) => {
            if (child.props.type === 'submit') { return child}

            return React.cloneElement(child, {
              value: this.state.fields[child.props.name].value,
              error: this.state.fields[child.props.name].error,
              key: i,
              onChange: (event) => { this.handleFieldChange(event, child.props.name); }
            }) 
          })
        }
      </form>
    )
  } 
}

WonderForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]),
  onSubmit: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
}

WonderForm.defaultProps = {
  onSubmit() {},
  onSuccess() {},
  onError() {}
}