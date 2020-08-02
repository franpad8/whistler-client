import React from 'react'
import {  Route, Redirect } from 'react-router-dom'

//import { isLoggedIn } from '../auth-service'


const ProtectedRoute = ({component: Component, ...rest}) => {

    return  <Route {...rest} render={props => {
        if (!localStorage.getItem('auth')) {
              return <Redirect to='/login' />
        }
        return <Component {...props} {...rest} />

    }} />

}

export default ProtectedRoute
