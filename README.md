<p align="center">
  <img src="https://raw.githubusercontent.com/nnur/wonder-form/master/demo/src/assets/clown.png">
  <h1>Wonderform</h1>
</p>

<a href="https://travis-ci.org/tannerlinsley/react-form" target="\_parent">
  <img alt="" src="https://travis-ci.org/tannerlinsley/react-form.svg?branch=master" />
</a>
<a href="https://npmjs.com/package/react-form" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/react-form.svg" />
</a>
<a href="https://github.com/tannerlinsley/react-form" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/tannerlinsley/react-form.svg?style=social&label=Star" />
</a>


WonderForm is a really lightweight form building and validation component for React.

## Features

- No built in styles to overwrite
- Comes with validation for common inputs like date, email, etc
- Easily add custom validations or overwrite default validation

## [Demo](https://react-form.js.org/?selectedKind=2.%20Demos&selectedStory=Kitchen%20Sink&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)


## Table of Contents
- [Installation](#installation)
- [Example](#example)
- [Components](#api)

<!-- - [Recipes](#recipes) -->

## Installation
```bash
$ npm install wonder-form
```

## Example

```javascript
import React, {Component} from 'react'
import {render} from 'react-dom'
import { WonderForm, WonderField } from '../../src'

class Demo extends Component {
  onSubmit(formContents) {
    console.log(formContents)
  }

  render() {
    return (
      <div>
        <WonderForm onSubmit={this.onSubmit.bind(this)}>
          <WonderField name='fullname' type='fullname' required errorMessage={"Error"} />
          <WonderField name='email' type='email' required errorMessage={"Error"} />
          <WonderField name='date' type='date' minDate='4/25/2017' errorMessage={"Error"} />
          <WonderField name='password' type='password' minLength={6} errorMessage={"Error"}/>
          <WonderField name='submit' type='submit' text='Create Account' />
        </WonderForm>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))

```


# Components

## WonderField

You can import two components, a WonderForm and WonderField. WonderFields are nested inside WonderForms.
```
import { WonderForm, WonderField } from 'wonder-form'
```

WonderField props:
prop | type   | description 
-----|--------|---------------
*name | string | Must be a unique identifier for a field
*type | string | Must be one of the following: 'text', 'email', 'password', 'date', 'fullname', 'submit', 'custom'
placeholder | string | A normal placeholder
className | string | A class for the WonderField
errorMessage | string | An errorMessage to be displayed
label | string | A label that goes above the input
required | bool | Makes the field required
minDate | string | Must be of the format MM/DD/YYYY.
maxDate | string | Must be of the format MM/DD/YYYY.
maxLength | number | Minimum length of the field.
minLength | number | Maximum length of the field
buttonText | string | For the submit type WonderField

The following table shows which validation props will work for a certain type of input. All other props will be ignored or throw an error.
type | props   
-----|-----------------|
fullname | required, minLength, maxLength
text | required, minLength, maxLength
password | required, minLength, maxLength
date | required, minDate, maxDate
email | required
submit | buttonText

### Creating a custom WonderField

A custom test must return undefined or an object like { type: 'errorName'}
```javascript
  customTest(input, props) {
    let error;
    if (input !== 'custard') {
      error = {type: 'custard'};
    }
    return error;
  }
```
```jsx
  <WonderField name='custom' type='custom' errorMessage='Error' test={this.customTest.bind(this)}/>
```

### Styling a WonderField
A WonderField is composed of a label, input, and span.
Pass in a class for the prop 'className' in a WonderField.

```javascript
  <WonderField className="custom-class"></WonderField>
``` 

```css
.custom-class {}
.custom-class label {}
.custom-class input {}
.custom-class span {}
```

## WonderForm

WonderForm props:
prop | type   | description 
-----|--------|---------------
children | Array of Objects or an Object | Should be a list of WonderFields
onSubmit | Called whenever the WonderField with type='submit' is clicked. The field values and errors if there are any are passed in
onSuccess | Called when there are no errors in any field in the WonderForm
onError | Called if there are any errors. The field values with errors are passed in.


#### Scripts

- `$ npm run test` Runs the test suite
