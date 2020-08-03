import React, { useState } from 'react';
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Index from './pages/Index'
import Search from './pages/Search';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth'))
  const [searchText, setSearchText] = useState('')

  const onLogout = () => {
    localStorage.removeItem('auth')
    setIsAuthenticated(false)
  }

  const onLoginSuccessful = () => {
    setIsAuthenticated(true)
  }

  const onSearch = text => {
    setSearchText(text)
  }

  return (
    <div className="App">
        <Router>
        <Navbar isAuthenticated={isAuthenticated}  onClickLogout={onLogout} onSearch={onSearch} />
        <Container maxWidth="sm" style={{ paddingTop: '2rem' }}>
          <Switch>
            <Route path="/login" >
              <Login onLoginSuccessful={onLoginSuccessful}/>
            </Route>
            <Route path="/logout" >
              <Redirect to="/login" />
            </Route>
            <ProtectedRoute path="/search" component={Search} searchText={searchText}/>
            <ProtectedRoute path="/" component={Index} />
          </Switch>
          </Container>
        </Router>

    </div>
  );
}

export default App;
