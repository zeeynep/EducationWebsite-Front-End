import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './SignUp.scss'
import AuthServices from '../services/AuthServices.js'
import {useNavigate} from 'react-router-dom';
const authServices = new AuthServices()

export default class SignUp extends Component {
  constructor(){
      super()
      this.state={
          Email: '',
          Password: '',
          ConfirmPassword: '',
          EmailFlag: false,
          PasswordFlag: false,
          ConfirmPasswordFlag: false
      }
  }

  handleValues = (e) => {
    const { name, value } = e.target
    this.setState(
      { [name]: value },
      console.log('Name : ', name, 'Value : ', value),
    )
  }
  CheckValidity() { //Parolayı kaydetmek icin istek gonderir.
    console.log('Check Validity Calling')
    //Reset Flag
    this.setState({
      EmailFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
    })

    if (this.state.Email === '') {
      this.setState({ EmailFlag: true })
    }
    if (this.state.Password === '') {
      this.setState({ PasswordFlag: true })
    }
    if (this.state.ConfirmPassword === '') {
      this.setState({ ConfirmPasswordFlag: true })
    }
  }

  handleSubmit = (e) => {
    this.CheckValidity()
    if (
      this.state.Email !== '' &&
      this.state.Password !== '' &&
      this.state.ConfirmPassword !== ''
    ) {
      const data = {
        email: this.state.Email,
        password: this.state.Password,
        confirmpassword: this.state.ConfirmPassword,
      }
      
      authServices
        .SignUp(data)
        .then((data) => {
          console.log('data : ', data)
        })
        .catch((error) => {
          
          console.log('error : ', error)
          this.setState({ open: true, Message: 'Something Went Wrong' })
        })
    } else {
      console.log('Not Acceptable')
      this.setState({ open: true, Message: 'Please Fill Required Field' })
    }
  }
  
 
  handleSignIn = (e) => {
    const history = useNavigate();
    history('SignIn');
  }

  render() {
    console.log('State : ', this.state)
    return (
      <div className='SignUp-Container'>
        <div className='SignUp-SubContainer'>
            <div className='Header'>Sign Up</div>
            <div className='Body'>
                <form className='form'>
                    <TextField 
                    error={this.state.EmailFlag}
                    className='TextField'
                    name="Email" 
                    label="Email Address" 
                    variant="outlined" 
                    size='small'
                    value={this.state.Email}
                    onChange={this.handleValues}
                    />
                    <TextField 
                    error={this.state.PasswordFlag}
                    className='TextField' 
                    name="Password"
                    label="Password" 
                    variant="outlined" 
                    size='small'
                    type="password"
                    value={this.state.Password}
                    onChange={this.handleValues}
                    />
                    <TextField 
                    error={this.state.ConfirmPasswordFlag}
                    className='TextField' 
                    name="ConfirmPassword"
                    label="Confirm Password" 
                    variant="outlined" 
                    size='small'
                    type="password"
                    value={this.state.ConfirmPassword}
                    onChange={this.handleValues}
                    />
                </form>
                
            </div>
            <div className='Buttons'>
                <Button className='Btn' color="primary" onClick={this.handleSignIn}>Sign In</Button>
                <Button className='Btn' variant="contained" color="primary" onClick={this.handleSubmit}>
                  Sign Up</Button>
            </div>
        </div>
      </div>
    )
  }
}

