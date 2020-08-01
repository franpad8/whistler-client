import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Login from './components/Login'
import Index from './components/Index'
import './App.css';
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
//import { handleLogout } from './auth-service'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth'))
  let history = useHistory()


  const onLogout = () => {
    localStorage.removeItem('auth')
    setIsAuthenticated(false)
  }

  const onLoginSuccessful = () => {
    setIsAuthenticated(true)
  }

  return (
    <div className="App">
        <Router>
        <Navbar isAuthenticated={isAuthenticated}  onClickLogout={onLogout} />
        <Container maxWidth="sm">
          <Switch>
            <Route path="/login" >
              <Login onLoginSuccessful={onLoginSuccessful}/>
            </Route>
            <Route path="/logout" >
              <Redirect to="/login" />
            </Route>
            <ProtectedRoute path="/" component={Index} />
          </Switch>
          </Container>
        </Router>

    </div>
  );
}

export default App;
