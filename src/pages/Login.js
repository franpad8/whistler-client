import { Button, FormControl, FormGroup, InputLabel, Input } from '@material-ui/core';
import React, { createRef} from 'react';
import validator from 'validator'
import { useHistory } from "react-router-dom";

import { handleAuthentication } from '../auth-service' 


const Login = ({onLoginSuccessful}) => {

    let history = useHistory()

    const onButtonClick = async () => {
        const email = emailInputElement.current.children[0].value
        const password = passwordInputElement.current.children[0].value

        const isValidEmail = validator.isEmail(email)
        const isValidPassword = !validator.isEmpty(password)

        if (isValidEmail && isValidPassword) {
            // call api to authenticate
            const { success, message, token } = await handleAuthentication(email, password)
            if (!success) {
                alert(message)
                return
            }
            localStorage.setItem('auth', token)
            onLoginSuccessful()
            return history.push('/')

        } else {
            if (!isValidEmail) {
                alert('Please, enter a valid email address')
            } else if (!isValidPassword) {
                alert('Please, enter the password')
            }
        }

    }

    let emailInputElement = createRef()
    let passwordInputElement = createRef()

    return (
        <div style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <FormGroup style={{ marginBottom: '1.5rem' }}>
                <FormControl>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input id="email" aria-describedby="helper-email" ref={emailInputElement} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" aria-describedby="helper-password" ref={passwordInputElement} />
                </FormControl>
            </FormGroup> 
            <Button variant="outlined" color="primary" onClick={onButtonClick} >
                    Sign in
            </Button>
        </div>
    )
}

export default Login;