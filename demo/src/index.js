import React, {Component} from 'react'
import {render} from 'react-dom'
import './assets/styles'
import { WonderForm, WonderField } from '../../src'

class Demo extends Component {

  constructor() {
    super();
  }

  _onSuccessSubmit(formContents) {
    console.log(formContents)
  }

  customTest(input, props) {
    let error;
    if (input !== 'custard') {
      error = {type: 'custard'};
    }
    return error;
  }

  render() {
    let date = new Date();
    let maxDate = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
    return (
      <div className='ws-form-wrapper'>
        <div className='ws-form-content'>
          <div className='ws-form-title'> Create an Account </div>
          <hr className='ws-form-divider'/>

          <WonderForm onSuccess={this._onSuccessSubmit.bind(this)}>
            {/* <WonderField name='custom' type='custom' label='CUSTARD' placeholder='custard' className='ws-form-field' required errorMessage={"Custaaard"} test={this.customTest.bind(this)}/> */}
            <WonderField name='fullname' type='fullname' label='NAME' placeholder='First Last' className='ws-form-field' required errorMessage={"Enter a full name"} />
            <WonderField name='email' type='email' label='EMAIL' placeholder='Email' className='ws-form-field' required errorMessage={"Enter a valid email"} />
            <WonderField name='date' type='date' label='BIRTHDAY' placeholder='MM/DD/YYYY' className='ws-form-field' required maxDate={maxDate} errorMessage={"Enter a valid birthdate"} />
            <WonderField name='password' type='password' label='PASSWORD' placeholder='Password' className='ws-form-field' minLength={6} errorMessage={"Password must be at least 6 characters"}/>
            <WonderField name='submit' type='submit' buttonText='Create Account' className='ws-form-button' />
          </WonderForm>

        </div>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
